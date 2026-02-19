# Zaras Hälsofokus# Astro Starter Kit: Basics

A modern, professional website for Zaras Hälsofokus - a health and wellness clinic in Stockholm specializing in Insculpt, Insculpt Chair, and LPG treatments.```sh

npm create astro@latest -- --template basics

## 🌟 Features```

- **Modern Astro Framework** - Fast, optimized static site generation with server-side capabilities> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

- **Cloudflare Pages Deployment** - Edge-deployed with serverless functions

- **Responsive Design** - Mobile-first approach with Tailwind CSS## 🚀 Project Structure

- **Contact Form** - Integrated with Resend.com API for secure email delivery

- **SEO Optimized** - JSON-LD structured data for better search engine visibilityInside of your Astro project, you'll see the following folders and files:

- **Professional Sections** - Dedicated pages for each treatment service

````text

## 🚀 Project Structure/

├── public/

```text│   └── favicon.svg

/├── src

├── public/│   ├── assets

│   ├── favicon_io/          # Favicon assets│   │   └── astro.svg

│   ├── pictures/            # Treatment images│   ├── components

│   └── videos/              # Video assets│   │   └── Welcome.astro

├── src/│   ├── layouts

│   ├── assets/              # Static assets│   │   └── Layout.astro

│   ├── components/          # Reusable Astro components│   └── pages

│   │   └── HamburgerMenu.astro│       └── index.astro

│   ├── layouts/└── package.json

│   │   └── Layout.astro     # Main layout wrapper```

│   ├── pages/               # Route pages (file-based routing)

│   │   ├── api/To learn more about the folder structure of an Astro project, refer to [our guide on project structure](https://docs.astro.build/en/basics/project-structure/).

│   │   │   └── contact.ts   # Contact form API endpoint

│   │   ├── index.astro      # Homepage## 🧞 Commands

│   │   ├── services.astro   # Services overview

│   │   ├── insculpt.astro   # Insculpt treatment pageAll commands are run from the root of the project, from a terminal:

│   │   ├── insculptChair.astro  # Insculpt Chair page

│   │   ├── lpg.astro        # LPG treatment page| Command                   | Action                                           |

│   │   ├── contact.astro    # Contact form page| :------------------------ | :----------------------------------------------- |

│   │   └── aboutUs.astro    # About page (under construction)| `npm install`             | Installs dependencies                            |

│   ├── sections/            # Page sections as components| `npm run dev`             | Starts local dev server at `localhost:4321`      |

│   │   ├── Header.astro| `npm run build`           | Build your production site to `./dist/`          |

│   │   ├── Footer.astro| `npm run preview`         | Preview your build locally, before deploying     |

│   │   ├── Hero.astro| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |

│   │   ├── Services.astro| `npm run astro -- --help` | Get help using the Astro CLI                     |

│   │   ├── Insculpt.astro

│   │   ├── InsculpChair.astro## 👀 Want to learn more?

│   │   └── Lpg.astro

│   └── styles/Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).

│       ├── global.css       # Global styles and CSS variables
│       └── hamburger.css    # Mobile menu styles
├── functions/               # Cloudflare Pages Functions (legacy)
│   └── contact/
│       └── index.js
├── astro.config.mjs         # Astro configuration
├── wrangler.jsonc           # Cloudflare deployment config
└── package.json
````

## 🧞 Commands

All commands are run from the root of the project:

| Command             | Action                                           |
| :------------------ | :----------------------------------------------- |
| `npm install`       | Installs dependencies                            |
| `npm run dev`       | Starts local dev server at `localhost:4321`      |
| `npm run build`     | Build your production site to `./dist/`          |
| `npm run preview`   | Preview your build locally, before deploying     |
| `npm run astro ...` | Run CLI commands like `astro add`, `astro check` |

## 🛠️ Tech Stack

- **Framework**: [Astro 5.x](https://astro.build)
- **Styling**: [Tailwind CSS 4.x](https://tailwindcss.com)
- **Deployment**: [Cloudflare Pages](https://pages.cloudflare.com)
- **Adapter**: [@astrojs/cloudflare](https://docs.astro.build/en/guides/integrations-guide/cloudflare/)
- **Email Service**: [Resend.com](https://resend.com)

## 📧 Contact Form Setup

The contact form uses Resend.com API for secure email delivery. To set up:

1. Sign up at [Resend.com](https://resend.com)
2. Add and verify your domain
3. Create an API key
4. Add environment variables to Cloudflare Pages:
   - `RESEND_API_KEY` - Your Resend API key
   - `DESTINATION_EMAIL` - Email address to receive form submissions

See `RESEND_SETUP.md` for detailed setup instructions.

## 🌐 Deployment

The site is automatically deployed to Cloudflare Pages via GitHub integration:

1. Push changes to the `dev` branch
2. Cloudflare automatically builds and deploys
3. Live at: [https://www.zarashalsofokus.com](https://www.zarashalsofokus.com)

### Environment Variables (Cloudflare Pages)

Set these in Cloudflare Dashboard → Workers & Pages → Project → Settings → Environment variables:

- `RESEND_API_KEY` - Resend API key for email functionality
- `DESTINATION_EMAIL` - Email to receive contact form submissions

## 📄 Pages Overview

- **Homepage** (`/`) - Hero section with services overview
- **Services** (`/services`) - Detailed services with split image sections
- **Insculpt** (`/insculpt`) - Full page about Insculpt body sculpting
- **Insculpt Chair** (`/insculptChair`) - Pelvic floor strengthening treatment
- **LPG** (`/lpg`) - LPG/Endermologie treatment details
- **Contact** (`/contact`) - Contact form with validation
- **About Us** (`/aboutUs`) - Professional "under construction" page

## 🎨 Design System

The site uses a consistent color palette defined in `global.css`:

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
- API endpoint at `/api/contact` for form submissions
- Cloudflare adapter enables serverless functions
- TailwindCSS with custom animations
- Section components for reusable layouts

## 🤝 Contributing

This is a private project for Zaras Hälsofokus. For questions or updates, contact the development team.

## 📞 Business Contact

**Zaras Hälsofokus**  
Website: [www.zarashalsofokus.com](https://www.zarashalsofokus.com)  
Booking: [Book via BokaDirekt](https://www.bokadirekt.se/places/zaras-halsofokus-40836)
