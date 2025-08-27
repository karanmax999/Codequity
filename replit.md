# replit.md

## Overview

CodeQuity is a React-based single-page application for India's premier tech community. The project is a community website that showcases CodeQuity's mission to build India's largest tech community through innovation, collaboration, and excellence. The application features sections for community stats, events, about information, and contact details, all presented with a modern, tech-focused design using dark themes and neon effects.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern development
- **Routing**: Wouter for lightweight client-side routing
- **Build Tool**: Vite for fast development and optimized builds
- **UI Library**: Radix UI components with shadcn/ui design system for accessible, customizable components
- **Styling**: Tailwind CSS with custom CSS variables for theming and responsive design
- **Animations**: Framer Motion for smooth animations and interactions
- **State Management**: TanStack Query (React Query) for server state management and caching
- **Forms**: React Hook Form with Hookform Resolvers for form validation

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Development**: tsx for TypeScript execution in development
- **Production Build**: esbuild for fast bundling and optimization
- **Storage Interface**: Abstract storage interface with in-memory implementation (MemStorage)
- **Database Ready**: Configured for PostgreSQL with Drizzle ORM integration

### Database Design
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema Location**: Shared schema definitions in `/shared/schema.ts`
- **Migrations**: Automated migration system with drizzle-kit
- **Connection**: Neon Database serverless PostgreSQL integration
- **Session Storage**: PostgreSQL session store with connect-pg-simple

### Development Environment
- **Hot Reload**: Vite development server with HMR
- **Error Handling**: Runtime error overlay for development
- **Code Quality**: TypeScript strict mode with comprehensive type checking
- **Path Aliases**: Configured aliases for clean imports (`@/`, `@shared/`)
- **Asset Management**: Centralized asset handling with dedicated attached_assets directory

### Design System
- **Theme**: Dark mode with cyberpunk/tech aesthetic
- **Typography**: Multiple font families (Inter, Orbitron, JetBrains Mono)
- **Colors**: CSS custom properties for consistent theming
- **Components**: Modular component architecture with shadcn/ui base
- **Responsive**: Mobile-first responsive design with Tailwind breakpoints

### Deployment Configuration
- **Build Process**: Separate client and server builds
- **Static Assets**: Client builds to `/dist/public`
- **Server Bundle**: ESM format bundle for production
- **Environment Variables**: DATABASE_URL required for production
- **Development Tools**: Replit-specific tooling and development banner integration

## External Dependencies

### Database & Storage
- **Neon Database**: Serverless PostgreSQL hosting
- **Drizzle ORM**: Type-safe database operations and migrations
- **connect-pg-simple**: PostgreSQL session store for Express sessions

### UI & Design
- **Radix UI**: Headless UI components for accessibility
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Animation library for smooth interactions
- **Lucide React**: Icon library for consistent iconography
- **shadcn/ui**: Pre-built component library built on Radix UI

### Development Tools
- **Vite**: Development server and build tool
- **TypeScript**: Type checking and development experience
- **esbuild**: Fast bundling for production builds
- **Replit Integration**: Development environment tooling and error overlays

### Runtime & Server
- **Express.js**: Web application framework
- **TanStack Query**: Data fetching and caching
- **React Hook Form**: Form handling and validation
- **Zod**: Schema validation with drizzle-zod integration