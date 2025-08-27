# CodeQuity Deployment Guide

## Quick Start (Development)

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Access the application:**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3000

## Environment Setup

1. **Copy environment template:**
   ```bash
   cp .env.example .env
   ```

2. **Configure environment variables:**
   ```bash
   # Required for database (optional for development)
   DATABASE_URL=postgresql://username:password@host:port/database
   
   # Application settings
   NODE_ENV=development
   PORT=3000
   SESSION_SECRET=your-secret-key-here
   
   # Client configuration
   VITE_API_URL=http://localhost:3000
   ```

## Deployment Options

### Option 1: Vercel (Recommended)

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Deploy:**
   ```bash
   vercel --prod
   ```

3. **Set environment variables in Vercel dashboard:**
   - `DATABASE_URL`: Your PostgreSQL connection string
   - `SESSION_SECRET`: A secure random string
   - `NODE_ENV`: production

### Option 2: Netlify

1. **Install Netlify CLI:**
   ```bash
   npm i -g netlify-cli
   ```

2. **Deploy:**
   ```bash
   netlify deploy --prod
   ```

### Option 3: Railway

1. **Install Railway CLI:**
   ```bash
   npm i -g @railway/cli
   ```

2. **Deploy:**
   ```bash
   railway up
   ```

### Option 4: Docker

1. **Build Docker image:**
   ```bash
   docker build -t codequity .
   ```

2. **Run container:**
   ```bash
   docker run -p 3000:3000 -e DATABASE_URL=your-db-url codequity
   ```

## Database Setup (Optional)

For production with PostgreSQL:

1. **Create database:**
   ```bash
   createdb codequity
   ```

2. **Run migrations:**
   ```bash
   npm run db:push
   ```

## Build Process

1. **Build for production:**
   ```bash
   npm run build
   ```

2. **Start production server:**
   ```bash
   npm start
   ```

## Environment Variables Reference

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | No (uses memory storage if not provided) |
| `NODE_ENV` | Environment (development/production) | Yes |
| `PORT` | Server port | No (defaults to 3000) |
| `SESSION_SECRET` | Session encryption key | Yes |
| `VITE_API_URL` | API base URL for client | Yes |

## Troubleshooting

### Database Connection Issues
- If `DATABASE_URL` is not provided, the app will use in-memory storage
- Check your PostgreSQL connection string format
- Ensure your database user has proper permissions

### Build Issues
- Run `npm run check` to check TypeScript errors
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Check for conflicting global packages

### Deployment Issues
- Ensure all environment variables are set in your deployment platform
- Check that your build command is `npm run build`
- Verify that your start command is `npm start`

## Development Features

- **Hot reload:** Changes are reflected immediately
- **Memory storage:** Works without database for development
- **Error handling:** Graceful fallbacks for missing configuration
- **Type safety:** Full TypeScript support
