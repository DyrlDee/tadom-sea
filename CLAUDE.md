# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
- `npm run dev` - Start development server on http://localhost:3000
- `npm run build` - Build production version
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Testing
No test framework is currently configured in this project.

## Project Overview

TadomSea is a Next.js 15 environmental pollution tracking application focused on the Tadom area. Users can report pollution incidents and view them on an interactive heatmap.

## Architecture

### Tech Stack
- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS v4
- **Maps**: Leaflet with react-leaflet for interactive mapping
- **TypeScript**: Full TypeScript support
- **Deployment**: Configured for Vercel

### Application Structure

**Core Pages:**
- `/` - Dashboard with welcome page and action cards
- `/report` - Pollution incident reporting form 
- `/heatmap` - Interactive map showing pollution data with real-time loading

**Key Components:**
- `app/layout.tsx` - Root layout with Sidebar and Header
- `app/components/Sidebar.tsx` - Collapsible navigation sidebar
- `app/components/Header.tsx` - Top navigation header
- `app/heatmap/MapComponent.tsx` - Leaflet map integration with dynamic loading
- `app/heatmap/page.tsx` - Heatmap page with API data fetching

### External API Integration
The heatmap page expects a backend API at `http://localhost:8000` (configurable via `NEXT_PUBLIC_API_BASE_URL`):
- `GET /api/reports?limit=1000` - Fetches pollution reports with fields: `_id`, `latitude`, `longitude`, `created_at`, `description?`, `image_url?`

### Map Implementation Details
- Uses dynamic imports to prevent SSR issues with Leaflet
- Implements proper cleanup to prevent memory leaks
- Handles map reinitialization for navigation between routes
- Red circle markers represent pollution report locations
- Default center: Kuala Lumpur (3.139, 101.6869)

### Styling
- Uses Tailwind CSS with custom button classes (`btn-primary`, `btn-secondary`, `btn-ghost`)
- Responsive design with mobile-first approach
- Custom card styling with hover effects
- Gradient backgrounds and modern UI patterns

## Development Notes

### Known Issues
- Map component requires client-side only rendering due to Leaflet dependencies
- Map refresh functionality implemented to handle potential rendering errors

### Environment Variables
- `NEXT_PUBLIC_API_BASE_URL` - Backend API base URL (defaults to http://localhost:8000)