# Internshala Internship Search Replica

A clean, responsive, and functional frontend replica of Internshala's internship search page. This application fetches live internship data and provides instant client-side filtering.

## What this project is about

This project is a replica of the Internshala internship search page. It connects to the live Internshala search API to display real-time internship listings, letting users browse, search, filter, and apply for roles in a clean, modern user interface.

What has been done:
- **Live API Integration**: Integrated a server-side proxy route to pull live data directly from `https://internshala.com/hiring/search` without encountering client-side CORS issues.
- **Dynamic Frontend Filtering**: Built filtering controls that update listings instantly on the client side:
  - **Profile & Location**: Filters dynamically built based on the available listings.
  - **Stipend Slider**: Real-time slider to filter by minimum stipend value.
  - **Duration Filter**: Limits results based on internship length (in months).
  - **Special Filters**: Quick checkboxes for Work From Home (WFH), Part-time, and Job Offers (PPO).
- **Slide-out Detail Drawer**: Clicking any internship card opens a side-drawer showing complete details, requirements, and a mock application form with validation.
- **Responsive Layout**: Designed from scratch using Vanilla CSS Modules for fully responsive layouts (mobile, tablet, and desktop) and smooth transitions.

## Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Vanilla CSS Modules

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
