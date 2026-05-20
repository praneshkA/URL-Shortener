# SnapLink Analytics

A production-ready full-stack URL shortener with real-time analytics, built for the [Katomaran Hackathon](https://katomaran.com).

> **This project is a part of a hackathon run by https://katomaran.com**

SnapLink Analytics lets authenticated users shorten URLs, track every click, view visit history, and visualize daily engagement with interactive charts.

## Tech Stack

| Layer | Technologies |
|-------|-------------|
| Frontend | React, Vite, Tailwind CSS, shadcn/ui-style components, Recharts, qrcode |
| Backend | Node.js, Express, Mongoose |
| Database | MongoDB (Atlas recommended) |
| Auth | JWT + bcrypt |

## Features

- User signup, login, JWT-protected routes, logout
- URL shortening with unique `nanoid` codes
- Server-side redirects with click tracking
- Visit analytics: total clicks, last visited, recent visits, daily chart
- Dashboard with search, copy, QR codes, delete
- Dark/light mode, responsive sidebar layout
- Toast notifications, loading & empty states

## Project Structure

```
snaplink/
├── backend/
│   ├── config/          # DB & env
│   ├── controllers/     # Auth, URLs, analytics
│   ├── middleware/      # Auth, validation, errors
│   ├── models/          # User, ShortUrl, Visit
│   ├── routes/          # REST routes
│   ├── utils/           # Helpers
│   └── server.js
├── frontend/
│   └── src/
│       ├── components/  # UI & layout
│       ├── context/     # Auth & theme
│       ├── hooks/       # Toast
│       ├── pages/       # All routes
│       └── services/    # API layer
└── README.md
```

## Prerequisites

- Node.js 18+
- MongoDB Atlas cluster (or local MongoDB)

## Setup

### 1. Clone & install

```bash
cd backend
npm install
cp .env.example .env

cd ../frontend
npm install
cp .env.example .env
```

### 2. Environment variables

**Backend** (`backend/.env`):

```env
PORT=5000
MONGO_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/snaplink?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_change_in_production
BASE_URL=http://localhost:5000
```

**Frontend** (`frontend/.env`):

```env
VITE_API_URL=http://localhost:5000/api
```

`BASE_URL` must match where the backend serves redirects (your API host in production).

### 3. MongoDB Atlas

1. Create a free cluster at [MongoDB Atlas](https://www.mongodb.com/atlas).
2. Create a database user and whitelist your IP (`0.0.0.0/0` for development).
3. Copy the connection string into `MONGO_URI`.

### 4. Run locally

**Terminal 1 — Backend:**

```bash
cd backend
npm run dev
```

**Terminal 2 — Frontend:**

```bash
cd frontend
npm run dev
```

- Frontend: http://localhost:5173
- Backend API: http://localhost:5000/api
- Short links redirect via: `http://localhost:5000/:shortCode`

## API Documentation

All protected routes require header: `Authorization: Bearer <token>`

### Auth

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register `{ name, email, password }` |
| POST | `/api/auth/login` | Login `{ email, password }` |
| GET | `/api/auth/profile` | Get current user (protected) |

### URLs

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/urls` | Create short URL `{ originalUrl }` |
| GET | `/api/urls` | List user URLs (`?search=term`) |
| GET | `/api/urls/:id` | Get single URL |
| DELETE | `/api/urls/:id` | Delete URL & visits |

### Analytics

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/analytics/:shortCode` | Analytics for owned link |

### Redirect

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/:shortCode` | Redirect & record visit |

### Example responses

**Register / Login:**

```json
{
  "success": true,
  "token": "eyJhbG...",
  "user": { "id": "...", "name": "Alex", "email": "alex@example.com" }
}
```

**Analytics:**

```json
{
  "success": true,
  "analytics": {
    "shortCode": "a8Kx2mQp",
    "totalClicks": 42,
    "lastVisited": "2026-05-20T10:00:00.000Z",
    "recentVisits": [{ "timestamp": "..." }],
    "dailyClicks": [{ "date": "2026-05-20", "clicks": 5 }]
  }
}
```

## Deployment

### Backend (Render / Railway / Fly.io)

1. Set env vars: `PORT`, `MONGO_URI`, `JWT_SECRET`, `BASE_URL` (e.g. `https://api.yourdomain.com`).
2. Start command: `npm start`
3. Ensure MongoDB Atlas allows your host IP.

### Frontend (Vercel / Netlify)

1. Set `VITE_API_URL=https://api.yourdomain.com/api`
2. Build: `npm run build`
3. Publish `dist/`

### Production notes

- Use a strong `JWT_SECRET`
- Set `BASE_URL` to your backend public URL for correct short links
- Enable HTTPS on both frontend and API
- Configure CORS origins if needed (currently open for development)

## Scripts

| Location | Command | Description |
|----------|---------|-------------|
| backend | `npm run dev` | Dev server with watch |
| backend | `npm start` | Production server |
| frontend | `npm run dev` | Vite dev server |
| frontend | `npm run build` | Production build |


