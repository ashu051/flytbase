
# Drone Vision Collective

A comprehensive drone management and monitoring application built with React, TypeScript, and Shadcn UI.

## Project Overview

This application provides a complete drone fleet management system with:

- Dashboard with activity tracking and statistics
- Mission planning and scheduling
- Real-time mission monitoring
- Fleet management
- Reports and analytics

## Getting Started

### Prerequisites

- Node.js (v16.x or later recommended)
- npm (v7.x or later)

### Installation and Setup

1. Clone the repository
```sh
git clone <your-repository-url>
cd drone-vision-collective
```

2. Install dependencies
```sh
npm install
```

3. Start the development server
```sh
npm run dev
```

4. Open your browser and navigate to:
```
http://localhost:8080
```

## Project Structure

```
drone-vision-collective/
├── public/               # Static assets
├── src/                  # Source files
│   ├── assets/           # Images and SVGs
│   ├── components/       # Reusable UI components
│   │   ├── dashboard/    # Dashboard-specific components
│   │   ├── fleet/        # Fleet management components
│   │   ├── layout/       # Layout components (sidebar, navbar)
│   │   ├── missions/     # Mission planning components
│   │   ├── monitoring/   # Mission monitoring components
│   │   ├── reports/      # Report-related components
│   │   └── ui/           # Shadcn UI components
│   ├── data/             # Mock data (would be APIs in production)
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utility functions
│   └── pages/            # Main application pages
├── index.html            # Entry HTML file
└── vite.config.ts        # Vite configuration
```

## Features

### Dashboard
- Activity feed
- Statistical overview
- Quick mission insights

### Mission Planning
- Create and schedule missions
- Define waypoints and patterns
- Assign drones to missions

### Mission Monitoring
- Real-time tracking
- Mission control (start, pause, abort)
- Visual map representation

### Fleet Management
- Drone status monitoring
- Maintenance scheduling
- Detailed drone information

### Reports
- Mission success metrics
- Coverage analysis
- Image collection statistics

## Tech Stack

- **Framework**: React with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Library**: Shadcn UI
- **Routing**: React Router
- **Data Fetching**: TanStack Query
- **Icons**: Lucide React
- **Charts**: Recharts
- **Toast Notifications**: Sonner
- **Animation**: Framer Motion

## Development

To contribute to this project:

1. Create a new branch for your feature
```sh
git checkout -b feature/your-feature-name
```

2. Make your changes and test them locally

3. Commit your changes
```sh
git commit -m "Add your commit message"
```

4. Push to your branch
```sh
git push origin feature/your-feature-name
```

5. Create a pull request

## Deployment

To build the app for production:

```sh
npm run build
```

The build output will be in the `dist` directory, which can be deployed to any static site hosting service.
