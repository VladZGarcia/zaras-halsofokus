# Zaras Hälsofokus

A modern website for Zaras Hälsofokus, a health and wellness clinic in Stockholm specializing in Insculpt, Insculpt Chair, and LPG treatments.

## 🌟 Features

- Modern Astro setup with Cloudflare adapter
- Responsive UI with reusable sections/components
- Contact form API endpoint integrated with Resend
- SEO improvements with canonical URLs and Open Graph metadata

## 🚀 Project Structure

```text
/
├── public/
│   ├── favicon_io/
│   ├── favicon_za/
│   ├── favicon_ZH/
│   ├── pictures/
│   └── videos/
├── src/
│   ├── assets/
│   ├── components/
│   │   └── HamburgerMenu.astro
│   ├── layouts/
│   │   └── Layout.astro
│   ├── pages/
│   │   ├── aboutUs.astro
│   │   ├── contact.astro
│   │   ├── index.astro
│   │   ├── insculpt.astro
│   │   ├── insculptChair.astro
│   │   ├── lpg.astro
│   │   └── services.astro
├── functions/
│   └── api/
│       ├── env-check.js
│       └── send-email.js
│   ├── sections/
│   │   ├── Footer.astro
│   │   ├── Header.astro
│   │   ├── Hero.astro
│   │   ├── InsculpChair.astro
│   │   ├── Insculpt.astro
│   │   ├── Lpg.astro
│   │   └── Services.astro
│   └── styles/
│       ├── global.css
│       └── hamburger.css
├── astro.config.mjs
├── wrangler.jsonc
├── tsconfig.json
├── package.json
└── README.md
```

## 🧞 Commands

Run from the project root:

| Command             | Action                                       |
| :------------------ | :------------------------------------------- |
| `npm install`       | Install dependencies                         |
| `npm run dev`       | Start local dev server at `localhost:4321`   |
| `npm run build`     | Build for production to `./dist/`            |
| `npm run preview`   | Preview production build locally             |
| `npm run astro ...` | Run Astro CLI commands (`astro check`, etc.) |

## 🛠️ Tech Stack

- Framework: Astro 5
- Styling: CSS + Astro components
- Deployment: Cloudflare Pages
- Adapter: `@astrojs/cloudflare`
- Email: Resend API

## 📧 Contact Form Setup

The contact form posts to `/api/send-email` and uses Resend.

Set these environment variables in Cloudflare Pages:

- `RESEND_API_KEY`
- `DESTINATION_EMAIL`

Verify env vars after deploy by visiting `/api/env-check`.

See `RESEND_SETUP.md` for setup details.

## 🌐 Deployment

This project is deployed via Cloudflare Pages.

1. Push changes to `dev`
2. Cloudflare builds and deploys automatically
3. Production URL: `https://www.zarashalsofokus.com`

## 📄 Pages

- `/` Home
- `/services` Services
- `/insculpt` Insculpt
- `/insculptChair` Insculpt Chair
- `/lpg` LPG
- `/contact` Contact
- `/aboutUs` About Us

## 🔍 SEO Notes

- Canonical URLs are generated in `src/layouts/Layout.astro`
- Unique page titles/descriptions are set per page
- Open Graph tags use canonical URL values

- **Unique Meta Tags** - Each page has unique title and description optimized for search engines1. Push changes to the `dev` branch

- **JSON-LD Structured Data** - Rich snippets on service pages for better search visibility2. Cloudflare automatically builds and deploys

- **Open Graph Tags** - Optimized social media sharing3. Live at: [https://www.zarashalsofokus.com](https://www.zarashalsofokus.com)

- **Semantic HTML** - Proper heading hierarchy and semantic elements

- **Fast Loading Times** - Optimized with Astro's static generation### Environment Variables (Cloudflare Pages)

## 📝 Development NotesSet these in Cloudflare Dashboard → Workers & Pages → Project → Settings → Environment variables:

- Uses Astro's file-based routing- `RESEND_API_KEY` - Resend API key for email functionality

- API endpoint at `/api/send-email` for form submissions (not `/contact`)- `DESTINATION_EMAIL` - Email to receive contact form submissions

- Cloudflare adapter enables serverless functions

- Tailwind CSS with custom animations## 📄 Pages Overview

- Section components for reusable layouts

- Site URL configured: `https://www.zarashalsofokus.com`- **Homepage** (`/`) - Hero section with services overview

- **Services** (`/services`) - Detailed services with split image sections

## 🤝 Contributing- **Insculpt** (`/insculpt`) - Full page about Insculpt body sculpting

- **Insculpt Chair** (`/insculptChair`) - Pelvic floor strengthening treatment

This is a private project for Zaras Hälsofokus. For questions or updates, contact the development team.- **LPG** (`/lpg`) - LPG/Endermologie treatment details

- **Contact** (`/contact`) - Contact form with validation

## 📞 Business Contact- **About Us** (`/aboutUs`) - Professional "under construction" page

**Zaras Hälsofokus** ## 🎨 Design System

Website: [www.zarashalsofokus.com](https://www.zarashalsofokus.com)

Booking: [Book via BokaDirekt](https://www.bokadirekt.se/places/zaras-halsofokus-40836)The site uses a consistent color palette defined in `global.css`:

- Primary: `#bfb6ad` (warm beige)
- Secondary: `#2f2011` (dark brown)
- Accent shades: Various beige/brown tones for sections

Background images with overlays are implemented using CSS variables for easy customization.

## 📱 Responsive Features

- Mobile-first design approach
- Hamburger menu for mobile navigation
- Responsive grid layouts
- Touch-friendly buttons and links
- Optimized images for different screen sizes

## 🔍 SEO Features

- JSON-LD structured data on service pages
- Semantic HTML
- Meta tags for social sharing
- Descriptive alt text for images
- Fast loading times with Astro

## 📝 Development Notes

- Uses Astro's file-based routing
- API endpoint at `/api/send-email` for form submissions
- Cloudflare adapter enables serverless functions
- TailwindCSS with custom animations
- Section components for reusable layouts

## 🤝 Contributing

This is a private project for Zaras Hälsofokus. For questions or updates, contact the development team.

## 📞 Business Contact

**Zaras Hälsofokus**  
Website: [www.zarashalsofokus.com](https://www.zarashalsofokus.com)  
Booking: [Book via BokaDirekt](https://www.bokadirekt.se/places/zaras-halsofokus-40836)
