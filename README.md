# Rahul Portfolio

A responsive personal portfolio for Rahul, a B.Tech Computer Science Engineering student specializing in AI & IoT. The site presents experience, skills, education, services, contact details, and a collection of software projects.

## Highlights

- Modern, responsive single-page portfolio layout
- Animated hero area, scroll-reveal effects, interactive project cards, and smooth hash navigation
- Dedicated `/projects` page for the full project collection
- Sections for about, experience, skills, featured projects, education, technology stack, services, and contact
- Lightweight client-side form validation for the contact form
- Social and GitHub links for project discovery

## Built With

- [React](https://react.dev/) 19
- [Vite](https://vite.dev/)
- [React Router](https://reactrouter.com/)
- [Tailwind CSS](https://tailwindcss.com/) 4
- CSS for the portfolio visual system and animations

## Pages and Routes

| Route | Purpose |
| --- | --- |
| `/` | Main portfolio page with all profile sections and featured projects |
| `/projects` | Full listing of portfolio projects |

The navigation links on the home page scroll to the matching section using URL hash anchors.

## Project Structure

```text
zeronext-portfolio/
├── public/                  # Static assets served directly by Vite (if added)
├── src/
│   ├── assets/              # Profile and logo image assets
│   ├── components/          # Shared UI components
│   ├── data/
│   │   └── portfolio.js     # Navigation and project content
│   ├── pages/               # Home and all-projects routes
│   ├── App.jsx              # Router and scroll-to-hash behavior
│   ├── index.css            # Global styles and animations
│   └── main.jsx             # Application entry point
├── index.html
├── package.json
└── vite.config.js
```

## Getting Started

### Prerequisites

- Node.js 20.19+ or 22.12+ (required by Vite 8)
- npm

### Installation

```bash
git clone https://github.com/codeofrealm/zeronext-portfolio.git
cd zeronext-portfolio
npm install
```

### Run Locally

```bash
npm run dev
```

Vite prints the local development URL, typically `http://localhost:5173`.

### Production Build

```bash
npm run build
npm run preview
```

`npm run build` creates an optimized production bundle in `dist/`.

### Linting

```bash
npm run lint
```

## Customizing the Portfolio

Most portfolio content lives in two places:

- `src/data/portfolio.js` — project cards, project links, technologies, and navigation items.
- `src/pages/HomePage.jsx` — biography, experience, skills, education, services, contact details, and social links.

To add a project, append an item to the `projects` array in `src/data/portfolio.js`. Include a unique `number`, title, category, description, image, technologies, and GitHub URL. The home page automatically displays the first three projects; the `/projects` route displays every entry.

Replace images in `src/assets/` and update their imports wherever they are used to personalize the visual identity.

## Contact Form Note

The contact form currently validates inputs in the browser and displays a confirmation message. It does not send email or persist submissions. Connect it to a form provider or backend endpoint before using it for production enquiries.

## Deployment

This is a static Vite application. After `npm run build`, deploy the contents of `dist/` to any static hosting provider, such as GitHub Pages, Netlify, Vercel, or Cloudflare Pages. Configure your host to fall back to `index.html` for client-side routes such as `/projects`.

## Author

**Rahul** — B.Tech CSE (AI & IoT) student

- GitHub: [codeofrealm](https://github.com/codeofrealm)
- LinkedIn: [Rahul](https://www.linkedin.com/in/rahul-77a46b273)
- Email: [rahul63794@gmail.com](mailto:rahul63794@gmail.com)

## License

This project is for portfolio purposes. Add a license file if you intend to distribute or reuse it under specific terms.
