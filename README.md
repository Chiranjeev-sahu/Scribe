# Scribe

**The minimalist, high-performance blogging engine.**  
Built on the bleeding edge: **React 19**, **Vite**, **Tailwind CSS 4**, and **Framer Motion 12**.

Scribe is designed for writers who demand a premium, fluid interface and developers who prioritize a "Zero-Trust" security architecture.

---

## 🚀 The Scribe Difference (Unique Features)

### 🛡️ "Triple-Gate" Security Architecture

Scribe doesn't just authorize users; it enforces a three-layer validation gate for every state-changing request:

1.  **Gate 1 (Session):** Secure, rotate-able JWTs stored in `httpOnly` cookies (prevents XSS theft).
2.  **Gate 2 (Schema):** Every request body is validated against rigorous **Zod** schemas before reaching the controller.
3.  **Gate 3 (Ownership):** A custom backend authorization utility (`getAndAuthorizePost`) checks record ownership at the database level before any mutation.

### 🌊 Next-Gen Fluidity (Framer Motion 12)

Scribe leverages physics-based microinteractions to create a "tactile" web experience:

- **Gestural Feedback:** All interactive elements use spring-physics scaling and tactile hover states.
- **Dynamic Mounting:** Staggered entrance animations for post lists and page transitions, making the content feel lighter and faster.
- **Global UI Orchestration:** A centralized **Zustand** store synchronizes animations across the layout, sidebar, and modals.

### 🧹 Automated Database Sanitization (Cron-Driven)

Unlike standard CRUD apps, Scribe maintains its own hygiene:

- An automated **node-cron** job runs every 24 hours to scrub the database of "Ghost Drafts" (Untitled, empty posts that haven't been touched in 24 hours).
- This keeps your MongoDB cluster lean and your analytics accurate.

### 🖋️ Modular Writing Environment

- **Extended Tiptap 3:** A block-driven editor decoupled into modular extensions (`nodes`, `icons`, `ui`).
- **Atomic Drafting:** A seamless state-to-db synchronization logic that handles auto-saves and "Publish-on-Ready" workflows without page refreshes.

---

## 🛠️ Architecture & Stack

### Frontend

- **Framework:** React 19 (Production optimized)
- **Styling:** Tailwind CSS 4 (Next-gen utility-first)
- **State:** Zustand (Multi-store architecture)
- **Editor:** Tiptap 3 (Custom Extension Suite)

### Backend

- **Runtime:** Node.js / Express (TypeScript)
- **Database:** MongoDB via Mongoose
- **Security:** Helmet, CORS (Dynamic), JWT (Cookie-based), Bcrypt
- **Automation:** Node-Cron

---

## ⚙️ Quick Start

### 1. Prerequisites

Ensure you have Node.js 20+ and MongoDB installed.

### 2. Environment Setup

Configure your `.env` in the `/server` directory:

```env
PORT=3000
NODE_ENV=development
MONGO_URI=your_mongodb_connection_string
ACCESS_TOKEN_SECRET=your_long_random_secret
REFRESH_TOKEN_SECRET=your_even_longer_secret
ACCESS_TOKEN_EXPIRY=15m
REFRESH_TOKEN_EXPIRY=7d
FRONTEND_URI=http://localhost:5173
```

### 3. Install & Run

```bash
# Install everything
npm install

# Run the full stack in development
npm run dev
```

---

## 🏗️ Folder Philosophy

- `/client/src/stores`: Modular state logic (Auth, Bookmarks, Drafts, Editor, UI).
- `/server/src/jobs`: Background automation (Cleanup, monitoring).
- `/server/src/validators`: Request schema definitions (Zod).
- `/server/src/util`: Global error and response handling.

---

Developed by [Chiranjeev](https://github.com/Chiranjeev-sahu)
