# Shah Works - Premium Agency Website

A high-end, world-class agency website built with Next.js, TypeScript, and Tailwind CSS.

## Features

- 🎨 Premium, modern UI design
- ⚡ Built with Next.js 14 (App Router)
- 💎 TypeScript for type safety
- 🎭 Smooth animations with Framer Motion
- 📱 Fully responsive design
- 🚀 Optimized for performance

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm, yarn, or pnpm package manager

### Installation

1. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

2. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
shahworks/
├── app/                    # Next.js App Router pages
│   ├── about/             # About page
│   ├── contact/           # Contact page
│   ├── services/          # Services page
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── home/             # Home page sections
│   ├── ui/               # Reusable UI components
│   ├── Footer.tsx        # Footer component
│   └── Navigation.tsx    # Navigation component
└── public/               # Static assets
```

## Build for Production

```bash
npm run build
npm start
```

## Tech Stack

- **Framework:** Next.js 14
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Icons:** Lucide React

## Customization

- Update colors in `tailwind.config.ts`
- Modify content in respective page components
- Add/remove sections as needed
- Customize animations in component files

