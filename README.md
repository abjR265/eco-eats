# EcoEats

EcoEats is a full-stack web application that helps users track food waste, manage inventory, and adopt more sustainable eating habits through data insights and actionable eco tips.

## Features

- Credentials-based user authentication using NextAuth.js
- Dashboard with real-time food waste visualizations
- Inventory management (add, edit, delete items)
- Waste logging with category-level insights
- Daily eco tips and food sustainability news feed
- PostgreSQL database hosted on Neon
- Frontend and backend fully deployed on Vercel

## Tech Stack

### Frontend
- Next.js 14 (App Router)
- Tailwind CSS
- TypeScript

### Backend
- Next.js API Routes
- NextAuth.js (Credentials provider)
- Drizzle ORM
- Neon (PostgreSQL)

### Deployment
- Frontend & Backend: Vercel
- Database: Neon

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/ecoeats.git
cd ecoeats
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file in the root directory:

```env
DATABASE_URL=postgresql://<user>:<password>@<neon-db-url>/<db-name>?sslmode=require
NEXTAUTH_SECRET=your_nextauth_secret
```

### 4. Run the development server

```bash
npm run dev
```

Visit `http://localhost:3000` in your browser.

## Folder Structure

```
public/
  file.svg
  globe.svg
  next.svg
  vercel.svg
  window.svg

src/
  app/
    api/
      auth/[...nextauth]     # Authentication logic
      food-news/             # News API
      signup/                # Signup route
    eco-tips/
      page.tsx               # Eco tips page
    inventory/
      page.tsx               # Inventory page
    login/
      page.tsx               # Login page
    signup/
      page.tsx               # Signup page
    waste-log/
      page.tsx               # Waste log page
    layout.tsx               # Root layout
    page.tsx                 # App entry point

  components/
    ClientDashboard.tsx
    EcoTipsPage.tsx
    Navbar.tsx
    SessionWrapper.tsx
    WastePieChart.tsx
    WeeklyWasteChart.tsx

  context/
    InventoryContext.tsx
    WasteContext.tsx

  db/
    schema.ts               # Drizzle ORM schema

  lib/
    auth.ts                 # Auth helpers
    db.ts                   # DB config

  types/
    next-auth.d.ts

globals.css
README.md
.gitignore
drizzle.config.json
eslint.config.mjs
next.config.ts
package.json
package-lock.json
```

## Dashboard Insights

The EcoEats dashboard provides:
- Weekly food waste trends
- Category-level pie charts
- Summary statistics from inventory and waste logs
- Daily sustainability tips and updates

## Future Improvements

- Expiry notifications for inventory items
- Personalized eco recommendations
- User leaderboard for sustainability achievements

## Contributors

- Abhijay Rane (ar2536@cornell.edu)
- Shubham Gandhi (smg384@cornell.edu)
