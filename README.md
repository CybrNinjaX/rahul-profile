# Rahul's Portfolio

A React single-page portfolio built with Vite. `Home.jsx` composes the portfolio sections; shared navigation, footer, animation effects, and page data live in separate modules.

## Run locally

```bash
npm install
npm run dev
```

## Project layout

```text
public/
├── images/                 Project cover artwork
├── icons/                  Public SVG icon sprite
├── models/                 Downloadable 3D models
└── favicon.svg

src/
├── assets/
│   ├── images/             Imported portfolio images
│   └── icons/              Local icon assets
├── components/
│   ├── animations/         Canvas and text animation components
│   ├── common/             Shared section heading
│   ├── layout/             Navbar and footer
│   └── sections/           Hero, about, skills, experience, projects,
│                           services, contact, and avatar components
├── data/                   Skills, projects, experience, and services
├── pages/                  Home page
├── App.jsx
├── main.jsx
└── index.css
```

`src/pages/Home.jsx` composes the homepage from `src/components/sections/`. `src/pages/HomePage.jsx` remains as a compatibility re-export for existing imports.
