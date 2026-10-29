# Fita Alemayehu - Full-Stack Software Engineer Portfolio

A production-grade, highly responsive developer portfolio showcasing full-stack applications, interactive UI components, architecture showcases, client work experience, and educational credentials.

## Tech Stack

- **Framework**: [TanStack Start](https://tanstack.com/start) / [TanStack Router](https://tanstack.com/router)
- **UI Library**: [React 19](https://react.dev)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com) and Vanilla CSS Design Tokens
- **Animations**: [Framer Motion](https://www.framer-motion.dev)
- **Icons**: [Lucide React](https://lucide.dev) and [React Icons](https://react-icons.github.io/react-icons/)
- **Build and Server**: [Vite 8](https://vitejs.dev) and [Nitro](https://nitro.unjs.io)
- **Testing and Quality**: [Vitest](https://vitest.dev), [ESLint](https://eslint.org), [Prettier](https://prettier.io)

## Key Features

- **Dark Mode Aesthetic**: Custom monochrome dark design with fluid typography, glassmorphic surfaces, and ambient backdrop lighting.
- **Interactive Project Showcase**: Dynamic wheel selector on desktop and vertical card navigation with gesture swipe controls on mobile.
- **Layered Architecture Gallery**: Interactive visualization of multi-layer software design (Interface, Logic, Data).
- **Responsive Experience Timeline**: Detailed client delivery logs with live status badges, practical metric callouts, and credential verification links.
- **Credential Lightbox**: Zoomable certificate viewer with keyboard navigation and pan support.
- **Secure Contact Form**: Contact form with honeypot bot protection and transactional email dispatch.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v20+ recommended) or [Bun](https://bun.sh/)

### Installation

```bash
# Clone the repository
git clone https://github.com/effileo/Personal-Portfolio.git
cd Personal-Portfolio

# Install dependencies
bun install
```

### Running Locally

```bash
bun run dev
```

The application will run at `http://localhost:3000`.

### Building for Production

```bash
bun run build
```

The production bundle is output to `.output/`.

### Running Tests

```bash
bun run test
```

## Environment Variables

Copy `.env.example` to `.env` if configuring contact form notifications:

```env
RESEND_API_KEY=your_resend_api_key_here
```

## License

MIT (c) Fita Alemayehu
