# HARDIK HIRWAL — Personal Portfolio (MERN Stack)

A personal portfolio website migrated from Next.js + TypeScript to the **MERN Stack** (MongoDB, Express.js, React.js, Node.js) using **Vite** and **JavaScript / JSX**.

---

## Technology Stack

- **Frontend**: React.js, Vite, JavaScript (ES6+), CSS Modules
- **Backend**: Node.js, Express.js
- **Database**: MongoDB, Mongoose
- **Animations & Effects**: Motion (`motion/react`)

---

## Project Structure

```
hardik_portfolio/
│
├── client/                     # Frontend (React + Vite)
│   ├── public/
│   │   └── images/             # Portfolio & project cover images
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   │   ├── About.jsx       # About section with perspective & resume download
│   │   │   ├── Contact.jsx     # Contact form with backend submission
│   │   │   ├── Home.jsx        # Hero section with large typography & pillars
│   │   │   ├── MenuOverlay.jsx # Full-screen editorial navigation overlay
│   │   │   ├── Navbar.jsx      # Top bar with branding & Day/Night toggle
│   │   │   ├── ProjectModal.jsx# Project detail overlay modal
│   │   │   ├── Projects.jsx    # 4-project carousel with drag/swipe & navigation
│   │   │   ├── Skills.jsx      # Skills section with animated progress bars
│   │   │   └── TextEffect.jsx  # Word-by-word fade-in-blur text animation
│   │   ├── pages/
│   │   │   └── Portfolio.jsx   # Main single-page portfolio layout & state
│   │   ├── utils/
│   │   │   └── api.js          # Centralized API configuration (VITE_API_URL)
│   │   ├── App.jsx             # Root React component
│   │   ├── main.jsx            # React DOM entry point
│   │   ├── index.css           # Global design tokens, themes & resets
│   │   └── page.module.css     # Scoped component styles
│   ├── index.html              # HTML template with Google Fonts typography
│   ├── package.json            # Frontend dependencies and scripts
│   ├── package-lock.json       # Frontend lockfile
│   ├── vite.config.js          # Vite configuration
│   ├── .env.example            # Frontend environment template
│   └── .gitignore              # Client gitignore rules
│
├── server/                     # Backend (Express + MongoDB)
│   ├── models/
│   │   └── Contact.js          # Mongoose schema for contact submissions
│   ├── routes/
│   │   ├── contact.js          # POST /api/contact endpoint
│   │   └── resume.js           # GET /api/resume/download endpoint
│   ├── public/
│   │   └── resume.pdf          # Resume served by Express res.download()
│   ├── .env.example            # Backend environment template
│   ├── .gitignore              # Server gitignore rules
│   ├── package.json            # Backend dependencies and scripts
│   ├── package-lock.json       # Backend lockfile
│   └── server.js               # Express application entry point
│
├── .gitignore
├── README.md
└── AGENTS.md
```

---

## Getting Started

### 1. Backend Setup

```bash
cd server
npm install
npm run dev
```

The Express server will start on **http://localhost:5000**.

#### Backend Environment Variables (`server/.env`)
```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/portfolio
FRONTEND_URL=http://localhost:5173
```

### 2. Frontend Setup

```bash
cd client
npm install
npm run dev
```

The Vite dev server will start on **http://localhost:5173**.

#### Frontend Environment Variables (`client/.env`)
```env
VITE_API_URL=http://localhost:5000/api
```

---

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Health check returning `{ success: true, message: "Portfolio backend is running" }` |
| `GET` | `/api/resume/download` | Serves `Hardik_Hirwal_Resume.pdf` via `res.download()` |
| `POST` | `/api/contact` | Validates and stores contact form submissions (name, email, message) in MongoDB |

---

## Features Preserved

- **Day / Night Mode**: Seamless theme switching with persistent state and design tokens.
- **Shared Portrait Parallax**: Fixed portrait with smooth RAF lerp mouse tracking and scroll-based fade out.
- **Projects Carousel**: 4 featured projects with horizontal drag/touch sliding, counter, navigation buttons, and modal details.
- **Editorial Design**: Custom typography (Space Grotesk, Syne, Space Mono), noise grain overlay, and clean layout.
- **Responsive Layout**: Fluid breakpoints optimized for mobile, tablet, laptop, and desktop.
