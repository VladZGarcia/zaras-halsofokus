/**
 * Astro API Endpoint for contact form submissions
 * This integrates properly with Cloudflare Pages
 */

import type { APIRoute } from 'astro';

/* uncoment for dev test */
/* export const prerender = false; */

export const POST: APIRoute = async ({ request }) => {
  try {
    // Get form data
    const formData = await request.formData();
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string || 'Ej angivet';
    const subject = formData.get('subject') as string || 'Nytt meddelande';
    const message = formData.get('message') as string;

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
    const clientIP = request.headers.get('CF-Connecting-IP') || 'Unknown';

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

    // Get environment variables from Cloudflare
    const RESEND_API_KEY = import.meta.env.RESEND_API_KEY;
    const DESTINATION_EMAIL = import.meta.env.DESTINATION_EMAIL;

    // Send email using Resend API
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Kontaktformulär <kontakt@zarashalsofokus.com>',
        to: [DESTINATION_EMAIL],
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
      // Return more detailed error for debugging
      return new Response(JSON.stringify({ 
        success: false, 
        error: `Kunde inte skicka meddelandet: ${resendData.message || 'Okänt fel'}` 
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
};
