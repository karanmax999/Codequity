# Getting Started with CodeQuity - Key Setup Guide

## 🎯 Quick Setup (5 minutes)

### 1. **Session Secret** (Required)
Generate a secure random string for session encryption:

**Option A - Using Node.js:**
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

**Option B - Using Online Generator:**
- Visit: https://generate-secret.vercel.app/
- Copy the generated string

**Option C - Using PowerShell:**
```bash
powershell -Command "[Convert]::ToHexString([Security.Cryptography.RandomNumberGenerator]::GetBytes(32))"
```

### 2. **Database URL** (Optional for development)
For development, you can skip this and use memory storage. For production:

**Free PostgreSQL Options:**
- **Neon Database** (Recommended): https://neon.tech/
  1. Sign up for free account
  2. Create new project
  3. Copy connection string

- **Supabase**: https://supabase.com/
  1. Create free project
  2. Go to Settings → Database
  3. Copy connection string

- **Railway**: https://railway.app/
  1. Create new project
  2. Add PostgreSQL service
  3. Copy connection string

### 3. **Complete .env Setup**

Create your `.env` file:

```bash
# Copy the template
cp .env.example .env
```

Edit `.env` with your values:

```bash
# Required - Use generated session secret
SESSION_SECRET=your-generated-secret-here

# Optional - Add database URL when ready
DATABASE_URL=postgresql://username:password@host:port/database

# Development defaults (keep as-is)
NODE_ENV=development
PORT=3000
VITE_API_URL=http://localhost:3000
```

## 🚀 Step-by-Step Setup

### **Step 1: Generate Session Secret**
```bash
# Run this command and copy the output
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### **Step 2: Create .env File**
```bash
# Create .env file
echo "SESSION_SECRET=your-secret-from-above" > .env
echo "NODE_ENV=development" >> .env
echo "PORT=3000" >> .env
echo "VITE_API_URL=http://localhost:3000" >> .env
```

### **Step 3: Start Development**
```bash
npm run dev
```

## 📋 Key Sources

### **Session Secret**
- **What it is**: Encryption key for user sessions
- **How to get**: Generate random 64-character string
- **Required**: ✅ Yes (for security)

### **Database URL** 
- **What it is**: PostgreSQL connection string
- **Free providers**: Neon, Supabase, Railway
- **Required**: ❌ No (works without it)

### **VITE_API_URL**
- **What it is**: Backend API endpoint
- **Default**: http://localhost:3000
- **Required**: ✅ Yes

## 🎯 One-Command Setup

Run this complete setup:

```bash
# Generate session secret
SESSION_SECRET=$(node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")

# Create .env file
cat > .env << EOF
DATABASE_URL=
NODE_ENV=development
PORT=3000
SESSION_SECRET=$SESSION_SECRET
VITE_API_URL=http://localhost:3000
EOF

# Start development
npm run dev
```

## 🔍 Verification

After setup, you should see:
```
Using memory storage (no DATABASE_URL provided)
7:57:05 AM [express] serving on port 3000
```

## 🌐 Production Deployment

When ready for production:

1. **Get Database URL** from Neon/Supabase
2. **Update .env** with production values
3. **Deploy** using your preferred platform

## 📞 Need Help?

- **Session Secret Issues**: Run the generation command again
- **Database Issues**: Skip DATABASE_URL for now (memory storage works)
- **Port Issues**: Change PORT=3001 in .env if 3000 is busy
