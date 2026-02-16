/**
 * Cloudflare Pages Function to handle contact form submissions
 * This runs on Cloudflare's edge network and uses Resend.com for email delivery
 */

export async function onRequestPost(context) {
  try {
    // Get form data
    const formData = await context.request.formData();
    const name = formData.get('name');
    const email = formData.get('email');
    const phone = formData.get('phone') || 'Ej angivet';
    const subject = formData.get('subject') || 'Nytt meddelande';
    const message = formData.get('message');

    // Basic validation
    if (!name || !email || !message) {
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'Namn, e-post och meddelande är obligatoriska' 
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'Ogiltig e-postadress' 
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Get client IP for logging
    const clientIP = context.request.headers.get('CF-Connecting-IP');

    // Construct email content (HTML version)
    const htmlBody = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2f2011;">Nytt meddelande från kontaktformuläret</h2>
        
        <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p style="margin: 10px 0;"><strong>Från:</strong> ${name}</p>
          <p style="margin: 10px 0;"><strong>E-post:</strong> <a href="mailto:${email}">${email}</a></p>
          <p style="margin: 10px 0;"><strong>Telefon:</strong> ${phone}</p>
          <p style="margin: 10px 0;"><strong>Ämne:</strong> ${subject}</p>
        </div>
        
        <div style="background: white; padding: 20px; border-left: 4px solid #2f2011; margin: 20px 0;">
          <h3 style="margin-top: 0;">Meddelande:</h3>
          <p style="white-space: pre-wrap;">${message}</p>
        </div>
        
        <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
        
        <p style="color: #666; font-size: 12px;">
          <strong>Skickat från:</strong> ${clientIP}<br>
          <strong>Tidpunkt:</strong> ${new Date().toLocaleString('sv-SE', { timeZone: 'Europe/Stockholm' })}
        </p>
      </div>
    `;

    // Plain text version
    const textBody = `
Nytt meddelande från kontaktformuläret på Zaras Hälsofokus

Från: ${name}
E-post: ${email}
Telefon: ${phone}
Ämne: ${subject}

Meddelande:
${message}

---
Skickat från: ${clientIP}
Tidpunkt: ${new Date().toLocaleString('sv-SE', { timeZone: 'Europe/Stockholm' })}
    `.trim();

    // Send email using Resend API
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${context.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Kontaktformulär <kontakt@zarashalsofokus.com>',
        to: [context.env.DESTINATION_EMAIL],
        subject: `[Kontaktformulär] ${subject}`,
        html: htmlBody,
        text: textBody,
        reply_to: email,
        tags: [
          { name: 'category', value: 'contact-form' }
        ]
      })
    });

    const resendData = await resendResponse.json();

    if (!resendResponse.ok) {
      console.error('Resend API error:', resendData);
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'Kunde inte skicka meddelandet. Försök igen senare.' 
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Success response
    console.log('Email sent successfully:', resendData.id);
    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Tack för ditt meddelande! Vi återkommer så snart som möjligt.' 
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Form submission error:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      error: 'Ett oväntat fel uppstod. Försök igen senare.' 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// Handle OPTIONS for CORS preflight
export async function onRequestOptions(context) {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    }
  });
}
