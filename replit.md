# Hatzalah Field Guide

## Overview

A mobile-first web application designed for United Hatzalah EMTs and paramedics in Israel. The app provides quick access to drug dosage calculators, treatment protocols, and procedure guides optimized for field use during emergency medical response.

Key features include:
- Medication database with dosage calculations (weight-based and fixed dose)
- Treatment protocols for various medical emergencies
- Medical procedures with step-by-step instructions
- CPR assistant with metronome and timing
- Pediatric medical tape calculator
- Clinical calculators (GCS, APGAR, AVPU)
- Favorites system for quick access
- Dark mode support
- RTL (Hebrew) interface

## Recent Changes

### Version 1.6.0 (December 2025)
- Added clickable links to H's & T's modal in CPR assistant - each reversible cause now links to its corresponding protocol, procedure, or medication for quick reference during resuscitation

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Stack
- **React 19** with TypeScript for UI components
- **Vite** as the build tool and dev server
- **Tailwind CSS v4** for styling with custom theme configuration
- No backend - purely client-side application with localStorage for persistence

### Application Structure
```
/                    # Root-level app files (App.tsx, types, data, hooks)
/src/
  /components/
    /layout/         # Header, BottomNav
    /shared/         # Reusable components (SearchBar, ItemCard, etc.)
    /ui/             # Design system primitives (Button, Card, Modal)
  /features/
    /admin/          # Admin panel and login
    /home/           # Home page
    /info/           # App info, important numbers
    /tools/          # Medical tools menu
  /context/          # React Context for global state
```

### State Management
- **Local state** via React useState for component-level state
- **Custom hooks** (`useFavorites`, `useLocalStorage`) for persistent storage
- **React Context** (`AppContext`) for global state (dark mode, favorites)
- All data persistence uses browser localStorage

### Data Architecture
- Static data defined in `data.ts` (medications, protocols, procedures)
- TypeScript enums and interfaces in `types.ts` define all data shapes
- Items are categorized by `ItemType` enum: Medication, Protocol, Procedure
- Medications include dosage arrays with weight-based or fixed dosing

### Routing/Navigation
- Single-page app with screen-based navigation (no router library)
- `Screen` type enum defines all possible screens
- Bottom navigation bar for main sections
- Header with back button for detail views

### Styling Approach
- Tailwind CSS with custom color palette (uh-red, uh-blue, uh-orange, etc.)
- Dark mode via `dark:` Tailwind classes and `class` strategy
- RTL layout with Hebrew text
- Custom animations defined in CSS and Tailwind config
- Mobile-first responsive design

## External Dependencies

### NPM Packages
- **react/react-dom** - Core UI framework
- **tailwindcss** - Utility-first CSS framework
- **@tailwindcss/forms** - Form element styling plugin
- **@tailwindcss/postcss** - PostCSS integration
- **clsx** - Conditional className utility
- **autoprefixer** - CSS vendor prefixing

### Build Tools
- **vite** - Build tool and dev server
- **@vitejs/plugin-react** - React support for Vite
- **typescript** - Type checking

### External Services
- **Google Fonts** - Assistant font family (Hebrew-optimized)
- **Gemini API** - API key referenced in config (for AI features, key stored in `.env.local`)

### Browser APIs Used
- **localStorage** - Favorites, dark mode preference, feedback storage
- **Web Audio API** - CPR metronome functionality
- **Intl API** - Date/time formatting including Hebrew calendar