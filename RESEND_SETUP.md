# Contact Form Setup - Resend.com (Simple & Secure)

## 🚀 5-Minute Setup

### Step 1: Sign Up for Resend (2 min)

1. Go to **[resend.com](https://resend.com)** → Click **Sign Up**
2. Create account with your email
3. Verify your email

### Step 2: Add Your Domain (2 min)

1. In Resend dashboard → **Domains** → **Add Domain**
2. Enter: `zarashalsofokus.com`
3. Add the DNS records Resend shows you:
   - One **TXT record** for verification
   - DKIM records (optional, for better deliverability)
4. Click **Verify**

> ✅ These DNS records won't affect your existing Gmail setup

### Step 3: Get API Key (30 sec)

1. In Resend → **API Keys** → **Create API Key**
2. Name it: `Contact Form`
3. **Copy the key** (starts with `re_...`)

### Step 4: Add Environment Variables (1 min)

1. Go to **[Cloudflare Dashboard](https://dash.cloudflare.com/)**
2. **Workers & Pages** → `zaras-halsofokus` → **Settings** → **Environment variables**
3. Click **Add variable** (do this twice):

**Variable 1:**

```
Name: RESEND_API_KEY
Value: re_your_key_here
```

**Variable 2:**

```
Name: DESTINATION_EMAIL
Value: your-email@gmail.com
```

4. Click **Save**

### Step 5: Deploy (1 min)

Run in terminal:

```powershell
npm run build
npx wrangler deploy
```

### Step 6: Test ✅

1. Go to `zarashalsofokus.com/contact`
2. Fill out form → Click "Skicka meddelande"
3. Check your Gmail!

Optional check: verify env vars via `https://www.zarashalsofokus.com/api/env-check`.

---

## 📧 What You Get

✅ Beautiful HTML emails with formatting  
✅ Automatic reply-to from sender  
✅ 100 emails/day FREE (3,000/month)  
✅ No impact on your `info@` Gmail  
✅ Email tracking in Resend dashboard

---

## 🐛 Troubleshooting

**Email not sending?**

- Verify domain in Resend dashboard
- Check both environment variables are set
- Redeploy after adding variables
- Confirm env vars are set: `https://www.zarashalsofokus.com/api/env-check`

**Email not received?**

- Check spam folder
- View delivery in Resend → **Logs**
- Verify DESTINATION_EMAIL is correct

**Form shows error?**

- Open browser console (F12) for details
- Check Resend API key is correct

---

## 🎨 Remove "Under Construction" Banner

Once working, edit `src/pages/contact.astro` and delete:

```html
<!-- Remove this section -->
<div class="absolute inset-0 pointer-events-none z-10...">
  🚧 UNDER CONSTRUCTION...
</div>
```

---

## 📊 View Sent Emails

Resend Dashboard → **Logs** → See all sent emails

---

## 💡 Local Testing

Create `.dev.vars` in project root:

```
RESEND_API_KEY=re_your_key
DESTINATION_EMAIL=your@email.com
```

Then: `npm run dev`

---

**Done!** Your form is now secure and won't mess with your Gmail. 🎉
