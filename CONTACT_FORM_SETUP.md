# Cloudflare Contact Form Setup Guide

## Overview

Your contact form is now configured to use Cloudflare Pages Functions with Email Routing. This is a secure, serverless solution that runs on Cloudflare's edge network.

## 📋 Setup Steps

### 1. **Enable Cloudflare Email Routing**

1. Log in to your [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Select your domain `zarashalsofokus.com`
3. Go to **Email** → **Email Routing**
4. Click **Get started** and follow the wizard
5. Add a destination email (your Gmail): `your-email@gmail.com`
6. Create a custom address like `kontakt@zarashalsofokus.com`
7. Set it to forward to your Gmail

### 2. **Get Your Cloudflare Credentials**

You'll need these for environment variables:

**Account ID:**

1. From your Cloudflare dashboard
2. It's in the URL: `dash.cloudflare.com/<ACCOUNT_ID>/...`
3. Or find it in: **Overview** → Right sidebar

**API Token:**

1. Go to **My Profile** → **API Tokens**
2. Click **Create Token**
3. Use template: **Edit Cloudflare Workers**
4. Or create custom with permissions:
   - Account → Email Routing → Edit
   - Zone → Workers Routes → Edit
5. Copy the token (you'll only see it once!)

### 3. **Set Environment Variables**

#### Option A: Cloudflare Dashboard (Recommended)

1. Go to **Workers & Pages**
2. Select your `zaras-halsofokus` project
3. Go to **Settings** → **Environment variables**
4. Add these variables:

```
CLOUDFLARE_ACCOUNT_ID = your_account_id_here
CLOUDFLARE_API_TOKEN = your_api_token_here
DESTINATION_EMAIL = your-email@gmail.com
```

#### Option B: Local Development (.dev.vars)

Create a file `.dev.vars` in your project root (NOT committed to git):

```
CLOUDFLARE_ACCOUNT_ID=your_account_id_here
CLOUDFLARE_API_TOKEN=your_api_token_here
DESTINATION_EMAIL=your-email@gmail.com
```

### 4. **Update .gitignore**

Make sure `.dev.vars` is in your `.gitignore`:

```
.dev.vars
```

### 5. **Test Locally**

```powershell
npm run dev
```

Visit http://localhost:4321/contact and test the form.

### 6. **Deploy**

```powershell
npm run build
npx wrangler deploy
```

## 🔒 Security Features

✅ **Server-side validation** - All validation happens on Cloudflare's edge  
✅ **No exposed credentials** - API keys stored as environment variables  
✅ **Rate limiting** - Cloudflare's built-in DDoS protection  
✅ **HTTPS only** - All communication encrypted  
✅ **CORS protection** - Only your domain can submit  
✅ **Input sanitization** - Email validation and XSS prevention

## 📧 Alternative: Simpler Email Solution

If Cloudflare Email API is complex, here's a **simpler alternative** using Resend.com:

### Using Resend (5 min setup):

1. Sign up at [resend.com](https://resend.com) (free: 100 emails/day)
2. Verify your domain
3. Get API key
4. Update `functions/api/send-email.js`:

```javascript
// Replace the email sending section with:
const response = await fetch("https://api.resend.com/emails", {
  method: "POST",
  headers: {
    Authorization: `Bearer ${context.env.RESEND_API_KEY}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    from: "Kontaktformulär <kontakt@zarashalsofokus.com>",
    to: [context.env.DESTINATION_EMAIL],
    subject: `[Kontaktformulär] ${subject}`,
    text: emailBody,
    reply_to: email,
  }),
});
```

5. Add environment variable: `RESEND_API_KEY`

## 🧪 Testing

### Test the form works:

1. Fill in all required fields
2. Click "Skicka meddelande"
3. Should see green success message
4. Check your Gmail for the email

### Test validation:

- Try submitting without name → should show error
- Try invalid email → should show error
- Try empty message → should show error

## 🐛 Troubleshooting

**Form doesn't submit:**

- Check browser console (F12) for errors
- Verify environment variables are set
- Check Cloudflare Workers logs

**Email not received:**

- Check spam folder
- Verify Email Routing is active
- Check Cloudflare Email logs

**"Under Construction" banner:**
Remove the watermark from `contact.astro` once form is working:

```html
<!-- Remove this section -->
<div class="absolute inset-0 pointer-events-none z-10...">...</div>
```

## 📱 What Users See

1. User fills form → smooth loading animation
2. Success → Green message + form clears
3. Error → Red message + form stays filled (can retry)
4. Email → Arrives in your Gmail with all details

## 🚀 Next Steps (Optional)

- [ ] Add Google reCAPTCHA for extra spam protection
- [ ] Set up email templates with HTML formatting
- [ ] Add auto-reply to confirm submission
- [ ] Connect to CRM (HubSpot, Mailchimp, etc.)
- [ ] Add file upload for attachments

## 📚 Resources

- [Cloudflare Email Routing Docs](https://developers.cloudflare.com/email-routing/)
- [Pages Functions Docs](https://developers.cloudflare.com/pages/functions/)
- [Resend.com Docs](https://resend.com/docs) (alternative)

---

**Need help?** The form structure is ready - you just need to configure the email routing in Cloudflare Dashboard and add environment variables!
