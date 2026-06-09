# Scribe

[![Live Demo](https://img.shields.io/badge/demo-scriibe.netlify.app-0a7cff?style=flat&logo=netlify&logoColor=white)](https://scriibe.netlify.app)
[![React](https://img.shields.io/badge/React_19-61DAFB?style=flat&logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript_5.9-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite_7-646CFF?style=flat&logo=vite&logoColor=white)](https://vite.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_4-06B6D4?style=flat&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Express](https://img.shields.io/badge/Express_5-000000?style=flat&logo=express&logoColor=white)](https://expressjs.com)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb&logoColor=white)](https://www.mongodb.com)
[![Zustand](https://img.shields.io/badge/Zustand_5-443E38?style=flat&logo=react&logoColor=white)](https://zustand-demo.pmnd.rs)
[![Tiptap](https://img.shields.io/badge/Tiptap_3-1A93FF?style=flat&logo=tiptap&logoColor=white)](https://tiptap.dev)
[![Motion](https://img.shields.io/badge/Motion_12-0055FF?style=flat&logo=framer&logoColor=white)](https://motion.dev)
[![Vitest](https://img.shields.io/badge/Vitest-6B9F37?style=flat&logo=vitest&logoColor=white)](https://vitest.dev)
[![License](https://img.shields.io/badge/license-MIT-brightgreen?style=flat)](LICENSE)

> A minimalist, high-performance blogging engine built on the bleeding edge. Designed for writers who demand a premium, fluid interface and developers who prioritize security.

---

## Why Scribe Stands Out

- **Full-stack TypeScript monorepo** — end-to-end type safety from MongoDB models to React components, sharing types across the wire.
- **Triple-Gate Security Architecture** — every state-changing request passes through httpOnly JWT authentication, Zod schema validation, and database-level ownership authorization before execution.
- **Custom Rich-Text Editor** — built on Tiptap 3 with 8 custom node extensions, 37 icon components, 13 toolbar UI components, and 10 UI primitives; fully decoupled into a modular extension architecture.
- **Optimistic UI Everywhere** — bookmark toggles and profile updates update the UI instantly and roll back on failure, using Zustand store patterns.
- **Physics-Based UX** — Framer Motion 12 spring animations for page transitions, hover states, menu entrances, and layout animations deliver a tactile, native-like feel.
- **Automated Database Sanitization** — a node-cron job runs every 24 hours to scrub ghost drafts (untitled, empty posts untouched for 24 hours), keeping the database lean without manual intervention.
- **Token Rotation Security** — refresh tokens are invalidated on rotation; if a stolen refresh token is reused, the user is logged out, preventing session hijacking.
- **82 Automated Tests** — Vitest-powered test suite covering unit (utils, validators, errors), store (Zustand state transitions), component (React rendering), and integration (Express + MongoDB via supertest) layers.

---

## Features

| Category | Features |
|----------|----------|
| **Core** | Create, edit, publish, and delete blog posts; rich-text editing via Tiptap 3; auto-saving drafts with 1-second debounce; category-based browsing (Technology, Culture, People, Lifestyle) |
| **Auth & Security** | JWT access/refresh token pair in httpOnly cookies; automatic silent token refresh via Axios interceptor with request queuing; bcrypt password hashing (10 salt rounds); Zod request validation on every endpoint; Helmet HTTP security headers; dynamic CORS origin |
| **User Profiles** | Public profile pages with published posts; editable bio and avatar via Cloudinary upload; user-dropdown with profile link and logout |
| **Bookmarks** | Optimistic toggle (instant UI update, rollback on API failure); dedicated bookmarks listing page; Set-based ID tracking for O(1) lookups |
| **UI/UX** | Dark/light theme with system preference detection; responsive mobile-first design with animated hamburger menu; staggered entrance animations; spring-physics hover/tap states; custom Sentient font |
| **Automation** | Cron-driven ghost draft cleanup (midnight daily); protected cleanup endpoint with bearer token for manual triggers |
| **Editor** | Block-driven Tiptap 3 editor; custom nodes (heading, paragraph, blockquote, code-block, list, image, horizontal-rule, image-upload); link popover with URL sanitization; color highlight with popover; heading dropdown menu; text-align controls; undo/redo |

---

## Tech Stack

### Frontend

| Category | Technology | Version |
|----------|-----------|---------|
| **Framework** | React | 19.2 |
| **Build Tool** | Vite | 7.2 |
| **Language** | TypeScript | 5.9 |
| **Routing** | React Router | 7.13 |
| **Styling** | Tailwind CSS (v4), SCSS modules, `tw-animate-css`, `tw-merge` | 4.1 |
| **State Management** | Zustand (6 stores) | 5.0 |
| **Editor** | Tiptap (core, react, PM, starter-kit, highlight, placeholder, typography, text-align, subscript, superscript, horizontal-rule, image, list) | 3.19 |
| **Animations** | Motion (Framer Motion) | 12.38 |
| **UI Components** | Radix UI (dropdown-menu, popover, slot), Floating UI | 1.4-2.0 |
| **Carousel** | Embla Carousel React | 8.6 |
| **Form Handling** | React Hook Form + Zod resolvers | 7.71/5.2 |
| **HTTP Client** | Axios (with interceptor-based token refresh) | 1.13 |
| **Notifications** | Sonner | 2.0 |
| **Icons** | Lucide React | 0.563 |
| **Utilities** | clsx, Class Variance Authority, Lodash throttle | — |
| **Error Handling** | React Error Boundary | 6.1 |
| **Keyboard** | React Hotkeys Hook | 5.2 |
| **Testing** | Vitest, React Testing Library, jsdom | — |
| **Linting** | ESLint (flat config), Prettier with import sorting & Tailwind plugin | — |
| **Cloudinary** | Image upload for cover photos and avatars | — |

### Backend

| Category | Technology | Version |
|----------|-----------|---------|
| **Runtime** | Node.js | 20+ |
| **Framework** | Express | 5.2 |
| **Language** | TypeScript | 5.9 |
| **Database** | MongoDB (via Mongoose) | 9.2 |
| **Auth** | jsonwebtoken, bcrypt, httpOnly cookies | 9.0/6.0 |
| **Validation** | Zod | 4.3 |
| **Security** | Helmet, CORS (dynamic origin), Cookie-Parser | 8.1 |
| **Automation** | node-cron | 4.2 |
| **Logging** | Morgan | 1.10 |
| **Dev Server** | tsx (watch mode), tsc-alias (path resolution) | 4.21 |
| **Testing** | Vitest, Supertest, mongodb-memory-server | — |
| **Linting** | ESLint (flat config), Prettier | — |

### Infrastructure

| Component | Service |
|-----------|---------|
| **Frontend Hosting** | Netlify (SPA redirect via `netlify.toml`) |
| **Backend Hosting** | Render |
| **Image Storage** | Cloudinary (unsigned uploads with upload preset) |
| **CI** | (Planned — tests run locally via Vitest) |

---

## Database Schema

### ERD

```
User (users collection)
  _id (ObjectId)            --------+
  username (string, unique)         |
  email (string, unique)            |
  password (string, select: false)  |
  avatar (string)                   |
  bio (string)                      |
  bookmarks (ObjectId[] ref: Post) -+----> Post._id (1:N)
  refreshToken (string)             |
  createdAt / updatedAt             |
                                    |
Post (posts collection)             |
  _id (ObjectId)                    |
  title (string, indexed)           |
  summary (string)                  |
  content (Mixed - Tiptap JSON)     |
  coverImage (string)               |
  author (ObjectId ref: User) ------+----> User._id (N:1)
  category (enum: Technology|...)
  status (enum: draft|published)
  createdAt / updatedAt
```

### Models

| Model | Collection | Purpose | Key Fields | Relationships |
|-------|-----------|---------|------------|---------------|
| **User** | `users` | Account management, authentication, bookmarks | `_id`, `username` (unique, indexed), `email` (unique, indexed), `password` (select: false, bcrypt hashed), `avatar`, `bio`, `bookmarks` (ObjectId[] ref: Post), `refreshToken` (select: false) | `user.bookmarks` → `Post._id` (1:N); `user._id` referenced by `Post.author` |
| **Post** | `posts` | Blog content — drafts and published articles | `_id`, `title` (indexed), `summary`, `content` (Schema.Types.Mixed, Tiptap JSON), `coverImage`, `author` (ObjectId ref: User), `category` (enum: Technology/People/Culture/Lifestyle), `status` (enum: draft/published), `timestamps` | `post.author` → `User._id` (N:1) |

### Indexing Strategy

- **User.email**: Unique index for fast login lookups
- **User.username**: Unique index for profile URL resolution (`/profile/:username`)
- **Post.title**: Regular index for title searches
- **Post.author + Post.status**: Compound query pattern for fetching user's drafts (`author + status: 'draft'`) and published posts (`author + status: 'published'`)
- **Post.status + Post.createdAt**: Compound query pattern for the public feed (published posts sorted by creation date)

---

## API Reference

### Public Routes

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| `GET` | `/api/v1/post` | None | Paginated published posts. Query: `?page=1&limit=10&category=Technology` |
| `GET` | `/api/v1/post/public/:id` | None | Single published post by ID (populates author: username, avatar, bio) |
| `GET` | `/api/v1/user/profile/:username` | None | User's public profile + their published posts |

### Auth Routes

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| `POST` | `/api/v1/auth/signup` | None | Register new user (body: `username`, `email`, `password`). Sets `accessToken` + `refreshToken` httpOnly cookies |
| `POST` | `/api/v1/auth/login` | None | Login (body: `identifier` [username or email], `password`). Sets `accessToken` + `refreshToken` httpOnly cookies |
| `GET` | `/api/v1/auth/refresh` | Cookie | Exchange valid refreshToken for new access/refresh token pair. On reuse of old token, logs user out |
| `POST` | `/api/v1/auth/logout` | JWT | Clears refreshToken in DB, clears auth cookies |

### Protected Post Routes (JWT Required)

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| `POST` | `/api/v1/post` | JWT | Create a new draft. Returns `{ _id }`. Auto-fills title="Untitled", category="Technology" |
| `GET` | `/api/v1/post/:id` | JWT+Owner | Get a specific draft (ownership-checked) |
| `PATCH` | `/api/v1/post/:id` | JWT+Owner+Zod | Update draft fields (body: `title`, `content`, `coverImage`, `category`, `summary`) |
| `DELETE` | `/api/v1/post/:id` | JWT+Owner | Delete a post (ownership-checked) |
| `PATCH` | `/api/v1/post/:id/publish` | JWT+Owner+Zod | Publish a draft. Validates title, category, and content are non-empty before status change |
| `GET` | `/api/v1/post/user/drafts` | JWT | List current user's drafts (returns: title, coverImage, summary, category, updatedAt, author) |
| `GET` | `/api/v1/post/user/bookmarks` | JWT | List current user's bookmarked posts (populated from User.bookmarks array) |

### Protected User Routes (JWT Required)

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| `GET` | `/api/v1/user/me` | JWT | Get current authenticated user's data |
| `PUT` | `/api/v1/user/me` | JWT | Update current user's profile (body: `bio`, `avatar`) |
| `POST` | `/api/v1/user/bookmarks/:id` | JWT | Toggle bookmark on a post (adds if absent, removes if present) |

### Internal Routes

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| `POST` | `/api/v1/cleanup` | `Bearer CRON_SECRET` | Manually trigger ghost draft cleanup. Protected by `CRON_SECRET` environment variable |

### Auth — Detailed Logic

- **Access Token**: Signed JWT payload `{ _id, email, username }`, configured expiry (default `15m`), stored in httpOnly cookie
- **Refresh Token**: Signed JWT payload `{ _id }`, configured expiry (default `7d`), stored in httpOnly cookie; saved to user document for rotation validation
- **Token Refresh Pattern**: On 401 response, the Axios interceptor queues the failed request, calls `/auth/refresh`, then replays the queue. If refresh fails, the user is logged out
- **Ownership Gate**: `getAndAuthorizePost` utility queries the post by ID, checks `post.author.equals(user._id)`, and throws `403` if mismatched

### Response Format

All endpoints return:
```json
{
  "success": true,
  "data": { ... },
  "message": "Human-readable message"
}
```

Error responses (via global `errorHandler` middleware):
```json
{
  "success": false,
  "message": "Error description",
  "errors": [],
  "stack": "..."  // development only
}
```

### Error Codes

| Status | When |
|--------|------|
| `400` | Zod validation failure |
| `401` | Missing/invalid/expired token, invalid credentials, reused refresh token |
| `403` | Ownership mismatch (user trying to modify another user's post) |
| `404` | Post or user not found |
| `406` | Publish validation failure (empty title/category/content) |
| `409` | Duplicate username or email on signup |
| `500` | Internal server error, programmer errors |
| `503` | Cleanup endpoint not configured (missing `CRON_SECRET`) |

---

## Architecture

### Request Flow

```
Browser (React SPA, scriibe.netlify.app)
  |
  |-- Axios request --> Netlify CDN --> Render (scribe-roie.onrender.com)
  |   baseURL: /api/v1, withCredentials: true
  |
  v
  Express middleware stack (applied in order):
    1. helmet()            -- security headers
    2. morgan('dev')       -- request logging
    3. express.json()      -- body parsing
    4. cors(options)       -- dynamic CORS
    5. cookieParser()      -- parse accessToken + refreshToken
  |
  v
  Route handler:
    |-- validate(schema)     -- Zod body validation (400 on failure)
    |-- verify               -- JWT cookie verification (401 on failure)
    |-- getAndAuthorizePost  -- ownership check (403 on mismatch)
  |
  v
  Controller (business logic)
  |
  v
  MongoDB (Mongoose 9.x)
  |
  v
  Response: APIResponse { success, data, message }
  |
  On 401: Axios interceptor catches --> queues failed request -->
    calls GET /auth/refresh --> replays queue --> retries original request
    If refresh fails: user logged out, redirected to /auth
```

### Middleware Pipeline (Backend)

The app-level middleware stack in `app.ts` applies in order: `helmet()`, `morgan('dev')`, `express.json()`, `cors(options)`, `cookieParser()`. Route-level middleware adds Zod validation, JWT verification, and ownership checks per-endpoint. All unhandled errors propagate to the global `errorHandler` which distinguishes operational errors (ZodError, AppError, TokenExpiredError, JsonWebTokenError) from programmer errors (500 with generic message in production, full stack in development).

### State Management Strategy (Zustand)

| Store | File | Purpose | Persisted |
|-------|------|---------|-----------|
| **useAuthStore** | `stores/authStore.ts` | User session (userData, isAuthenticated, loading, error). Actions: signup, login, logout, checkAuth, updateProfile, clearError | Yes (localStorage, `auth-storage` key, partializes userData + isAuthenticated) |
| **usePostsStore** | `stores/postsStore.ts` | Public feed (posts array, pagination, currentCategory). Actions: fetchPosts, fetchPostById, loadMore, setCategory, clearPosts | No |
| **useBookmarkStore** | `stores/bookmarkStore.ts` | Bookmark state (bookmarkedIds Set, bookmarkedPosts). Actions: fetchBookmarks, toggleBookmark (optimistic), hydrateIds, isBookmarked, resetBookmarks | No |
| **useDraftsStore** | `stores/draftsStore.ts` | User's draft list. Actions: fetchDrafts, createNewDraft, deleteDraft, resetDrafts | No |
| **useEditorStore** | `stores/editorStore.ts` | Active editor state (postId, title, content, coverImage, category, summary, status, isDirty, isSaving, isPublishing). Actions: loadDraft, saveDraft (debounced), publish (with validation), setters for each field, resetEditor | No |
| **useUIStore** | `stores/uiStore.ts` | Theme (light/dark, system preference detection). Actions: toggleTheme. Side effect: subscribes to changes and toggles `dark` class on `<html>` | No |

### Client Architecture

```
main.tsx
  └── BrowserRouter
       └── App.tsx
            ├── Toaster (Sonner)
            ├── ErrorBoundary
            └── Routes
                 ├── MainLayout (Navbar + Outlet + Footer)
                 │    ├── / → Homepage
                 │    ├── /category/:categoryType → CategoryPage
                 │    └── /about → About
                 ├── /post/:id → PostDetailPage
                 ├── /write/:id → WritePage (ProtectedRoute)
                 ├── /auth → Auth
                 └── /profile/:username → ProfilePage
```

---

## Project Structure

```
scribe/
│
├── client/                              # React single-page application
│   ├── index.html                       # HTML entry + OG meta tags (SEO)
│   ├── netlify.toml                     # SPA redirect (/* → /index.html)
│   ├── vite.config.ts                   # Vite config: React plugin, Tailwind, @/ alias
│   ├── vitest.config.ts                 # Vitest config: jsdom, setup file, @/ alias
│   ├── tsconfig.json                    # TS project references (app + node)
│   ├── eslint.config.js                 # Flat config: React hooks + refresh rules
│   ├── .prettierrc.json                 # Prettier: import sorting, Tailwind class plugin
│   ├── components.json                  # shadcn/ui component registry
│   │
│   ├── src/
│   │   ├── main.tsx                     # Entry: StrictMode + BrowserRouter
│   │   ├── App.tsx                      # Root: routes, ErrorBoundary, Toaster, auth check
│   │   ├── index.css                    # Tailwind directives + CSS variables (light/dark)
│   │   ├── scss.d.ts                    # SCSS module type declarations
│   │   │
│   │   ├── api/
│   │   │   └── client.ts               # Axios instance: base URL, interceptors, token refresh queue
│   │   │
│   │   ├── pages/
│   │   │   ├── Homepage.tsx            # Landing: hero, carousel, post grid, category sidebar
│   │   │   ├── CategoryPage.tsx        # Filtered post listing by category
│   │   │   ├── PostDetailPage.tsx      # Single post view (public)
│   │   │   ├── WritePage.tsx           # Full editor: title, cover image, Tiptap editor, publish
│   │   │   ├── Auth.tsx                # Login/signup form (React Hook Form + Zod)
│   │   │   ├── ProfilePage.tsx         # Public profile with user info + published posts
│   │   │   └── About.tsx               # Static about page
│   │   │
│   │   ├── components/
│   │   │   ├── ErrorFallback.tsx        # React Error Boundary UI
│   │   │   ├── auth/
│   │   │   │   ├── LogoutButton.tsx    # Logout trigger
│   │   │   │   └── ProtectedRoute.tsx  # Auth gate: spinner → redirect → children
│   │   │   ├── layout/
│   │   │   │   ├── MainLayout.tsx      # Navbar + Outlet + Footer wrapper
│   │   │   │   ├── Navbar.tsx          # Sticky nav: categories, theme toggle, auth controls
│   │   │   │   ├── Footer.tsx          # Site footer
│   │   │   │   └── UserDropDown.tsx    # Avatar + dropdown (profile, drafts, logout)
│   │   │   ├── post/
│   │   │   │   ├── PostCard.tsx        # Blog card (default + horizontal variant, motion-animated)
│   │   │   │   ├── PostList.tsx        # Post grid with infinite scroll
│   │   │   │   ├── PostDetailPage.tsx  # Public post reader + ReadOnlyEditor
│   │   │   │   ├── ReadOnlyEditor.tsx  # Tiptap viewer (non-editable)
│   │   │   │   ├── DeletePostDialog.tsx# Confirmation dialog for post deletion
│   │   │   │   └── WriteButton.tsx     # FAB for creating new drafts
│   │   │   ├── profile/
│   │   │   │   ├── ProfileHeader.tsx   # Avatar, bio, edit button
│   │   │   │   ├── ProfileTabs.tsx     # Published posts + bookmarks tabs
│   │   │   │   ├── EditProfileDialog.tsx# Avatar upload + bio editor (Cloudinary)
│   │   │   │   └── PublishDialog.tsx   # Publish confirmation modal
│   │   │   │
│   │   │   ├── tiptap-templates/simple/  # Editor template assembly
│   │   │   │   ├── simple-editor.tsx    # Tiptap provider + toolbar + editor content
│   │   │   │   ├── simple-editor.scss   # Editor-specific styles
│   │   │   │   ├── theme-toggle.tsx     # Light/dark toggle button
│   │   │   │   └── data/content.json   # Starter content template
│   │   │   │
│   │   │   ├── tiptap-extension/       # Custom Tiptap extensions
│   │   │   │   └── node-background-extension.ts
│   │   │   ├── tiptap-node/            # 8 custom node extensions
│   │   │   │   ├── blockquote-node/    # Blockquote with custom styling
│   │   │   │   ├── code-block-node/    # Code block with syntax
│   │   │   │   ├── heading-node/       # Heading levels
│   │   │   │   ├── horizontal-rule-node/
│   │   │   │   ├── image-node/         # Inline image
│   │   │   │   ├── image-upload-node/  # Image upload handler + UI
│   │   │   │   ├── list-node/          # Ordered/unordered lists
│   │   │   │   └── paragraph-node/     # Custom paragraph
│   │   │   ├── tiptap-icons/           # 37 SVG icon components
│   │   │   ├── tiptap-ui/              # 13 toolbar button components
│   │   │   │   ├── blockquote-button/
│   │   │   │   ├── code-block-button/
│   │   │   │   ├── color-highlight-button/
│   │   │   │   ├── color-highlight-popover/
│   │   │   │   ├── heading-button/
│   │   │   │   ├── heading-dropdown-menu/
│   │   │   │   ├── image-upload-button/
│   │   │   │   ├── link-popover/
│   │   │   │   ├── list-button/
│   │   │   │   ├── list-dropdown-menu/
│   │   │   │   ├── mark-button/
│   │   │   │   ├── text-align-button/
│   │   │   │   └── undo-redo-button/
│   │   │   └── tiptap-ui-primitive/   # 10 reusable UI primitives for editor
│   │   │       ├── badge/
│   │   │       ├── button/
│   │   │       ├── card/
│   │   │       ├── dropdown-menu/
│   │   │       ├── input/
│   │   │       ├── popover/
│   │   │       ├── separator/
│   │   │       ├── spacer/
│   │   │       ├── toolbar/
│   │   │       └── tooltip/
│   │   │
│   │   ├── stores/                     # Zustand state management
│   │   │   ├── authStore.ts            # Auth state + persist
│   │   │   ├── postsStore.ts           # Public feed pagination
│   │   │   ├── bookmarkStore.ts        # Bookmark Set + optimistic toggle
│   │   │   ├── draftsStore.ts          # User draft CRUD
│   │   │   ├── editorStore.ts          # Editor state + auto-save + publish
│   │   │   └── uiStore.ts             # Theme with system preference
│   │   │
│   │   ├── hooks/                      # Custom React hooks
│   │   │   ├── use-tiptap-editor.ts   # Tiptap editor instance hook
│   │   │   ├── useLogout.ts           # Logout + navigate
│   │   │   ├── use-composed-ref.ts
│   │   │   ├── use-cursor-visibility.ts
│   │   │   ├── use-element-rect.ts
│   │   │   ├── use-is-breakpoint.ts
│   │   │   ├── use-menu-navigation.ts
│   │   │   ├── use-scrolling.ts
│   │   │   ├── use-throttled-callback.ts
│   │   │   ├── use-unmount.ts
│   │   │   └── use-window-size.ts
│   │   │
│   │   ├── lib/
│   │   │   ├── tiptap-utils.ts        # Editor utilities (image upload, URL sanitization, node selection)
│   │   │   └── utils/
│   │   │       ├── index.ts
│   │   │       └── utils.ts           # cn() Tailwind merge, formatDate()
│   │   │
│   │   ├── data/data.ts               # 20 mock posts for development
│   │   ├── assets/fonts/              # Sentient-Regular.woff2
│   │   └── styles/                    # SCSS variables + keyframe animations
│   │
│   └── src/test/setup.ts              # Vitest setup: jest-dom matchers, IntersectionObserver mock
│
├── server/                             # Express REST API
│   ├── vite.config.ts                 # Vitest config: @/ alias, env vars, setup file
│   ├── tsconfig.json                  # Strict TS: ESNext target, NodeNext module
│   ├── eslint.config.js               # Flat config with typescript-eslint
│   ├── .prettierrc                    # Prettier config
│   │
│   ├── src/
│   │   ├── server.ts                  # Entry: connect DB, start cron, listen on port
│   │   ├── app.ts                     # Express app: middleware stack + route mounting
│   │   │
│   │   ├── config/
│   │   │   ├── config.ts             # Env validator (throws on missing MONGO_URI, JWT secrets, FRONTEND_URI)
│   │   │   ├── db.ts                 # Mongoose connection with auto-retry
│   │   │   ├── corsOptions.ts        # Dynamic CORS origin from FRONTEND_URI env
│   │   │   └── cookieOptions.ts      # httpOnly cookie config (secure in prod, sameSite lax/none)
│   │   │
│   │   ├── models/
│   │   │   ├── user.model.ts         # User schema: pre-save bcrypt hook, JWT generation methods
│   │   │   └── post.model.ts         # Post schema: content (Mixed), category enum, status enum
│   │   │
│   │   ├── routes/
│   │   │   ├── auth.routes.ts        # /api/v1/auth/* (signup, login, refresh, logout)
│   │   │   ├── post.routes.ts        # /api/v1/post/* (CRUD, publish, drafts, bookmarks)
│   │   │   ├── user.routes.ts        # /api/v1/user/* (profile, me, update, bookmarks)
│   │   │   └── cleanup.routes.ts     # /api/v1/cleanup (CRON_SECRET-protected)
│   │   │
│   │   ├── controllers/
│   │   │   ├── auth.controllers.ts   # signup, login, logout, refreshAccessToken
│   │   │   ├── post.controllers.ts   # createDraft, updateDraft, getDraft, publishPost, deletePost, getDraftsList, getBookmarksList, getPostById, getPosts
│   │   │   └── user.controller.ts    # getUserProfile, toggleBookmark, getMe, updateProfile
│   │   │
│   │   ├── middlewares/
│   │   │   ├── errorHandler.ts       # Global error handler (ZodError, AppError, JWT errors, programmer errors)
│   │   │   ├── validate.ts           # Zod schema validation middleware factory
│   │   │   └── verifyJwt.ts          # JWT access token verification + user hydration
│   │   │
│   │   ├── validators/
│   │   │   ├── auth.schema.ts        # signupSchema (email, password min 8, username min 3), loginSchema
│   │   │   └── post.schema.ts        # basePostSchema + updatePost (partial)
│   │   │
│   │   ├── types/index.ts            # AuthRequest generic, DecodedToken, paramsType
│   │   ├── util/
│   │   │   ├── apiResponse.ts        # Standardized API response class
│   │   │   ├── appError.ts           # Operational error class with isOperational flag
│   │   │   ├── asyncHandler.ts       # Express async error wrapper (eliminates try/catch in routes)
│   │   │   ├── auth.utils.ts         # Token pair creation + cookie setting
│   │   │   └── getAndAuthrize.ts     # Post ownership verification utility
│   │   │
│   │   └── jobs/
│   │       └── cleanupPosts.ts       # node-cron scheduled task + manual trigger (delete ghost drafts)
│   │
│   └── src/test/setup.ts             # Vitest setup: MongoDB Memory Server (auto connect/disconnect)
│
├── TESTING_TUTORIAL.md                # Comprehensive testing guide for beginners
├── .gitignore
└── README.md                          # This file
```

---

## Getting Started

### Quick Start (Prerequisites: Node.js 20+, MongoDB running)

```bash
# 1. Install server dependencies
cd server && npm install

# 2. Configure environment
cp .env.example .env
# Edit .env — set MONGO_URI, ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET, FRONTEND_URI

# 3. Start the server
npm run dev

# 4. In a new terminal, install and start the client
cd client && npm install
npm run dev

# 5. Open http://localhost:5173
```

### Detailed Setup

#### Server `.env`

```env
PORT=3000
NODE_ENV=development

# MongoDB
MONGO_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/scribe

# JWT Secrets (use long random strings)
ACCESS_TOKEN_SECRET=your_32_plus_char_secret
REFRESH_TOKEN_SECRET=your_32_plus_char_different_secret

# Token Expiry
ACCESS_TOKEN_EXPIRY=15m
REFRESH_TOKEN_EXPIRY=7d

# Client origin (for CORS)
FRONTEND_URI=http://localhost:5173

# Optional: for manual cleanup trigger
CRON_SECRET=your_cron_secret
```

#### Client `.env`

```env
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
```

### Running with Production Build

```bash
# Server
cd server
npm run build   # Compiles TS → dist/
npm start       # Runs dist/server.js

# Client
cd client
npm run build   # Bundles to dist/
npm run preview # Serves the production build locally
```

---

## Available Scripts

### Client

| Script | Command | Description |
|--------|---------|-------------|
| `dev` | `vite` | Start development server (port 5173) |
| `build` | `tsc -b && vite build` | Type-check + production bundle |
| `preview` | `vite preview` | Preview production build locally |
| `lint` | `eslint .` | Lint all source files |
| `test` | `vitest` | Run test suite once |
| `test:watch` | `vitest --watch` | Run tests in watch mode |
| `test:coverage` | `vitest --coverage` | Run tests with coverage report |

### Server

| Script | Command | Description |
|--------|---------|-------------|
| `dev` | `tsx watch src/server.ts` | Development server with hot reload |
| `build` | `tsc && tsc-alias` | TypeScript compilation + path alias resolution |
| `start` | `node dist/server.js` | Start production server |
| `lint` | `eslint src/**/*.ts` | Lint all TypeScript files |
| `lint:fix` | `eslint src/**/*.ts --fix` | Lint + auto-fix |
| `format` | `prettier --write src/**/*.ts` | Format all TypeScript files |
| `format:check` | `prettier --check src/**/*.ts` | Check formatting without writing |
| `test` | `vitest` | Run test suite once |
| `test:watch` | `vitest --watch` | Run tests in watch mode |
| `test:coverage` | `vitest --coverage` | Run tests with coverage report |

---

## Deployment

### Frontend (Netlify)

The frontend is deployed at [scriibe.netlify.app](https://scriibe.netlify.app). The `netlify.toml` file provides SPA redirect (all routes → `index.html`).

```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

**Deploy steps:**
1. Connect GitHub repo to Netlify
2. Set build command: `cd client && npm run build`
3. Set publish directory: `client/dist`
4. Add env vars: `VITE_CLOUDINARY_CLOUD_NAME`, `VITE_CLOUDINARY_UPLOAD_PRESET`

### Backend (Render)

The backend is deployed at `https://scribe-roie.onrender.com`.

**Deploy steps:**
1. Create a new Web Service on Render
2. Connect GitHub repo
3. Set root directory: `server`
4. Build command: `npm install && npm run build`
5. Start command: `npm start`
6. Add all env vars from `.env.example`

---

## Engineering Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| **Frontend framework** | React 19 (not Next.js) | Blogging is a client-heavy CRUD app. SSR adds complexity without significant SEO benefit for authenticated dashboards; React 19's improved hydration and concurrent features are sufficient |
| **Build tool** | Vite 7 (not Webpack) | Sub-second HMR, native ESM, TypeScript 5.9 compatibility, built-in Tailwind 4 support via `@tailwindcss/vite` plugin |
| **State management** | Zustand 5 (not Redux, Context) | Minimal boilerplate (no reducers/dispatchers), direct `getState()` access outside React, built-in `persist` middleware for auth, supports subscribing to changes for side effects (UI theme) |
| **Editor architecture** | Decoupled Tiptap 3 | Separating nodes, icons, UI buttons, and UI primitives into independent directories allows adding new editor features without touching existing code; 37 icons and 13 buttons are individually importable |
| **Styling approach** | Tailwind 4 + SCSS | Tailwind for 95% of styling (utility-first, small bundles); SCSS for editor-specific complex styles (Tiptap node rendering) that benefit from nesting and mixins |
| **Authentication** | httpOnly JWT cookies (not localStorage) | Cookies with httpOnly flag are immune to XSS token theft. Refresh token rotation adds protection against stolen tokens. The 401 interceptor with request queuing ensures a seamless UX during token refresh |
| **Security architecture** | Triple-Gate (Session → Schema → Ownership) | Defense in depth: if JWT validation has a vulnerability, Zod catches malformed data; if Zod has a bypass, the ownership check prevents unauthorized mutations. No single point of failure |
| **API response format** | `APIResponse` class (not raw JSON) | Standardized `{ success, data, message }` structure across all endpoints enables consistent error handling on the client, simplifies Axios interceptor logic, and makes API self-documenting |
| **Async error handling** | `asyncHandler` wrapper | Eliminates repetitive `try/catch` blocks in every controller; forwards async errors to Express error middleware automatically |
| **Validation layer** | Zod 4 (not Joi, Yup) | Zod's TypeScript-first design means `z.infer<typeof schema>` generates types automatically, eliminating manual type definitions. Smaller bundle than Joi, faster than Yup |
| **Database** | MongoDB + Mongoose 9 | Schema flexibility for blog content (Tiptap JSON is naturally schema-less); Mongoose's `select: false` for sensitive fields prevents accidental exposure; `populate` simplifies the bookmark/user relationship |
| **Auto-save** | Zustand store + debounced effect | Editor state is in Zustand (not serialized to DB on every keystroke). A `useEffect` with `setTimeout(1000)` ensures saves are debounced. The `isDirty` flag prevents unnecessary network calls |
| **Optimistic bookmarks** | Immediate UI update + rollback | Toggling a bookmark updates `bookmarkedIds` Set instantly; if the API call fails, the previous state is restored. This makes the UI feel instant while maintaining data integrity |
| **Ghost draft cleanup** | node-cron + manual endpoint | Automated hygiene prevents database bloat from abandoned drafts. The manual endpoint (with `CRON_SECRET`) allows triggering cleanup on demand without waiting for the daily schedule |
| **Testing approach** | Vitest (not Jest) | Vitest is natively compatible with Vite's transform pipeline and path aliases; faster than Jest; supports ESM out of the box. `mongodb-memory-server` enables real database integration tests without external infrastructure |
| **Monorepo structure** | Separate `client/` and `server/` directories | Keeps dependencies and build configurations independent; each can be deployed separately; avoids complex monorepo tooling (Nx, Turborepo) for a two-package project |

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

<p align="center">
  Built by <a href="https://github.com/Chiranjeev-sahu">Chiranjeev</a>
</p>
