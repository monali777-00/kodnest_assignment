# Internshala Internship Search Replica

A production-grade web application replicating Internshala's internship search page. Built as part of the SDE (Web) Internship assignment.

## Tech Stack
- **Framework**: [Next.js 14](https://nextjs.org/) (App Router, Server-side Rendering)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Vanilla CSS Modules](https://nextjs.org/docs/app/building-your-application/styling/css-modules) (Clean, encapsulated, and tailored styles without third-party design frameworks)

---

## Key Features

1. **Live API Fetching & Proxying**
   - Fetches live data from `https://internshala.com/hiring/search`.
   - Utilizes Next.js Server Route Handler (`src/app/api/internships/route.ts`) to act as an API proxy. This bypasses client-side **CORS restrictions** seamlessly and handles server caching.

2. **Advanced Frontend Filtering**
   - **Profile filter**: Dynamically populated from available jobs.
   - **Location filter**: Dynamically populated locations + dedicated "Work from home" filter.
   - **Duration filter**: Allows filtering internships based on maximum length in months.
   - **Stipend slider**: Real-time filtering based on minimum stipend value.
   - **Special checkboxes**: Checkboxes to filter for Remote (Work From Home), Part-time status, and Job Offer (PPO).

3. **Detailed Slide-out Modal Drawer**
   - Allows users to click on any internship card to open a details drawer.
   - Displays key info, dynamically generated responsibilities/skills matching the job profile, and a mock **Apply Form** with validation.

4. **Premium Responsive Design**
   - Fully optimized for desktop, tablet, and mobile browsers using fluid flex/grid layouts.
   - Smooth state transitions, hover animations, and elegant typography (Google Inter).

---

## Folder Structure

```
kodnest_assignment/
├── src/
│   ├── app/
│   │   ├── layout.tsx                # Global HTML wrapper & metadata
│   │   ├── page.tsx                  # Main search dashboard integration
│   │   ├── page.module.css           # Dashboard layout styling
│   │   ├── globals.css               # Design system tokens and base resets
│   │   └── api/
│   │       └── internships/
│   │           └── route.ts          # Server API Proxy (bypasses CORS)
│   ├── components/
│   │   ├── Navbar/                   # Navigation bar
│   │   ├── FilterSidebar/            # Left filter card panel
│   │   ├── InternshipCard/           # Custom list item card
│   │   └── InternshipDetailModal/    # Slide-out details + Mock Apply Form
│   ├── hooks/
│   │   └── useInternships.ts         # Custom state hook containing the filtering logic
│   ├── utils/
│   │   └── formatters.ts             # Stipend and duration formatters
│   └── types/
│       └── index.ts                  # TS interface definitions
├── package.json
└── tsconfig.json
```

---

## How to Set Up and Run Locally

1. **Install Dependencies**
   Run this command in the root folder of the project to download and install packages:
   ```bash
   npm install
   ```

2. **Run Development Server**
   Start the local dev environment:
   ```bash
   npm run dev
   ```

3. **View the Application**
   Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

---

## GitHub Upload Guide

Follow these commands to push the project to your GitHub repository:

1. **Initialize Git Repository**
   ```bash
   git init
   ```

2. **Stage and Commit Files**
   ```bash
   git add .
   git commit -m "feat: complete Internshala search replica with advanced filters"
   ```

3. **Link to your GitHub Repository**
   Create a repository on your GitHub account (`https://github.com/monali777-00`) named e.g. `internshala-search-replica`, and link it locally:
   ```bash
   git remote add origin https://github.com/monali777-00/internshala-search-replica.git
   ```

4. **Push Code to Main**
   ```bash
   git branch -M main
   git push -u origin main
   ```

---

## Vercel Hosting Guide

To host this Next.js application on **Vercel** for free:

1. **Via GitHub Integration (Recommended)**
   - Sign up or log into [Vercel](https://vercel.com) using your GitHub account.
   - Click **Add New** > **Project**.
   - Import your newly pushed `internshala-search-replica` repository.
   - Vercel automatically detects Next.js settings. Click **Deploy**.
   - Your application will be live in less than a minute!

2. **Via Vercel CLI**
   - Install Vercel CLI globally: `npm install -g vercel`
   - Run the command `vercel` in the root folder and follow the prompts to log in and deploy.
