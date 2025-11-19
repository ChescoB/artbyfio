# Abacus.ai Next.js Website - Setup & Running Guide

## ✅ What's Been Done

1. **Extracted your project** from the backup tar archive
2. **Installed Node.js v25.2.0** - required for the project
3. **Installed all dependencies** (1141 packages) with `npm install --legacy-peer-deps`
4. **Started the development server** - Now running at **http://localhost:3000**

## 📋 Project Details

- **Framework**: Next.js 14.2.28 with React 18.2.0
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL (via Prisma ORM)
- **Authentication**: NextAuth.js
- **Package Manager**: Yarn (configured, but npm is set up)
- **UI Components**: Radix UI
- **Additional Features**: 
  - AWS S3 integration for file storage
  - Chart.js and Plotly.js for data visualization
  - React Hook Form for form handling

## 🚀 How to Run the Project

### Option 1: Use the batch file (Easiest)
```bash
run-dev.bat
```

### Option 2: Manual terminal commands
```bash
# Set Node.js in PATH (Windows PowerShell)
$env:PATH += ";C:\Program Files\nodejs"

# Start development server
npm run dev
```

### Option 3: In VS Code Terminal
The project is already open in VS Code. You can:
1. Press ``Ctrl + ` `` to open the terminal
2. Run `npm run dev`
3. Open http://localhost:3000 in your browser

## 📁 Project Structure

```
nextjs_space/
├── app/              # Next.js app directory (routes & pages)
├── components/       # React components
├── hooks/           # Custom React hooks
├── lib/             # Utility functions
├── prisma/          # Database schema
├── public/          # Static assets
├── scripts/         # Build & seed scripts
├── types/           # TypeScript type definitions
├── node_modules/    # Dependencies (just installed)
└── Configuration files:
    ├── package.json
    ├── tsconfig.json
    ├── tailwind.config.ts
    ├── next.config.js
    └── .env          # Environment variables
```

## 🔧 Available Commands

- `npm run dev` - Start development server (http://localhost:3000)
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 🔐 Environment Variables

Your `.env` file is already configured with:
- Database connection (PostgreSQL)
- NextAuth secret
- AWS S3 bucket configuration
- AWS region settings

⚠️ **Note**: Keep your `.env` file secure - never commit it to public repositories

## 📊 Database Setup

The project uses Prisma ORM with PostgreSQL. The database schema is configured in `prisma/schema.prisma`.

To sync your local database with the schema, run:
```bash
npx prisma migrate dev
```

Or to push schema changes without creating migrations:
```bash
npx prisma db push
```

## 🐛 Troubleshooting

### Port 3000 already in use?
Change the port:
```bash
npm run dev -- -p 3001
```

### Dependency issues?
If you get peer dependency warnings, they've been handled with `--legacy-peer-deps`. The build is stable.

### Database connection issues?
Verify the `DATABASE_URL` in `.env` is correct and the PostgreSQL server is accessible.

## 📦 Next Steps

1. **Open http://localhost:3000** in your browser to see your site
2. **Make changes** to files in the `app/` and `components/` directories
3. **Hot reload** - Changes are automatically reflected in the browser
4. **Build for production** when ready with `npm run build`

## 💾 Stopping the Server

Press `Ctrl+C` in the terminal where the dev server is running.

---

**Your project is ready to develop!** 🎉
