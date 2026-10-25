# Shiloh Creative Studio — Portfolio

A modern, responsive creative studio portfolio built with **React 19** and **Vite**. The project showcases digital agency services, creative web builds, interactive case studies, and a direct contact form powered by EmailJS.

---

## Preview & Live Demo

- **Live Site:** [Insert your deployed link here (Vercel / Netlify / GitHub Pages)]
- **Design Style:** Dark aesthetic with subtle glassmorphism and smooth micro-interactions.

---

## Features

- **Hero & Value Proposition:** High-impact introduction with responsive typography and call-to-actions.
- **Interactive Projects Carousel:** Dynamic project slider powered by Swiper.js with custom pagination.
- **Dedicated Services Section:** Breakdown of studio offerings (UI/UX, Frontend Development, Webflow/CMS, Technical SEO).
- **Process & Methodology:** A 4-step workflow explaining the journey from discovery to deployment.
- **Working Contact Form:** Direct email delivery via EmailJS with client-side validation and feedback states.
- **Accessibility & Motion Preferences:** Respects user's `prefers-reduced-motion` settings via Framer Motion.
- **Optimized Bundle:** Uses `LazyMotion` and lightweight features to keep page load fast and efficient.

---

## Tech Stack

| Category | Technology |
| :--- | :--- |
| **Framework & Build** | React 19, Vite |
| **Styling** | Vanilla CSS, Bootstrap 5, React-Bootstrap |
| **Animations** | Framer Motion (`LazyMotion`, `domAnimation`) |
| **Carousel / Slider** | Swiper.js |
| **Email Service** | EmailJS (`@emailjs/browser`) |
| **Routing** | React Router v7, React Router Hash Link |

---

## Project Structure

```text
Shiloh-Creative-Portofilo/
├── public/
│   ├── api/
│   │   └── projects.json       # Mock JSON data for projects
│   ├── images/                 # Studio assets & project mockups
│   └── favicon.svg
├── src/
│   ├── Components/
│   │   ├── NavBar.jsx          # Sticky glassmorphism navigation
│   │   ├── NavBar.css
│   │   ├── Home.jsx            # Main landing page & sections
│   │   ├── Home.css
│   │   ├── Footer.jsx          # Site footer & quick links
│   │   └── Footer.css
│   ├── App.jsx                 # App routing & splash loader
│   ├── App.css
│   ├── index.css               # Global typography & CSS variables
│   └── main.jsx
├── .env.example                # Template for EmailJS keys
├── package.json
└── vite.config.js
```

---

## Getting Started

### Prerequisites

Make sure you have Node.js (version 18 or newer) installed on your machine.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Ali-Tobar/shiloh-creative-portfolio.git
   cd shiloh-creative-portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Copy the example environment file:
   ```bash
   cp .env.example .env.local
   ```
   Open `.env.local` and add your EmailJS credentials:
   ```env
   VITE_EMAILJS_SERVICE_ID=your_service_id
   VITE_EMAILJS_TEMPLATE_ID=your_template_id
   VITE_EMAILJS_PUBLIC_KEY=your_public_key
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

---

## Available Scripts

- `npm run dev` — Starts the local development server with Hot Module Replacement (HMR).
- `npm run build` — Bundles the application for production inside the `dist/` directory.
- `npm run preview` — Locally previews the production build.
- `npm run lint` — Runs ESLint to check for code issues.

---

## Author

- **GitHub:** [@your-username](https://github.com/Ali-Tobar)
- **LinkedIn:** [Your Name](www.linkedin.com/in/ali-tobar-dev)
