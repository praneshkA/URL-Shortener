# SnapLink Analytics

SnapLink Analytics is a full-stack URL shortener application that allows users to create short URLs, manage links, and track analytics such as click count and recent visits. The platform includes secure authentication, server-side redirection, and a responsive analytics dashboard.

## Features

* User Signup & Login (JWT Authentication)
* URL Shortening
* Unique Short URL Generation
* Redirect to Original URL
* Click Analytics Tracking
* Recent Visit History
* Protected Dashboard
* Copy Short URL
* Delete Shortened URLs
* Responsive UI
* Dark/Light Theme

---

# Tech Stack

## Frontend

* React.js
* Vite
* Tailwind CSS
* shadcn/ui
* Axios
* Recharts

## Backend

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* JWT Authentication
* bcrypt
* nanoid

---

# Folder Structure

```bash
project-root/
│
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── config/
│   └── server.js
│
├── frontend/
│   ├── src/
│   ├── components/
│   ├── pages/
│   └── App.jsx
│
├── README.md
└── .gitignore
```

---

# Setup Instructions

## 1. Clone Repository

```bash
git clone https://github.com/praneshkA/URL-Shortener.git
```

---

## 2. Install Frontend Dependencies

```bash
cd frontend
npm install
```

---

## 3. Install Backend Dependencies

```bash
cd backend
npm install
```

---

# Environment Variables

## Backend `.env`

```env
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_jwt_secret
BASE_URL=http://localhost:5000
```

## Frontend `.env`

```env
VITE_API_URL=http://localhost:5000/api
```

---

# Run Application

## Start Backend

```bash
cd backend
npm run dev
```

## Start Frontend

```bash
cd frontend
npm run dev
```

---

# API Endpoints

## Authentication

| Method | Endpoint           |
| ------ | ------------------ |
| POST   | /api/auth/register |
| POST   | /api/auth/login    |
| GET    | /api/auth/profile  |

## URL Routes

| Method | Endpoint      |
| ------ | ------------- |
| POST   | /api/urls     |
| GET    | /api/urls     |
| GET    | /api/urls/:id |
| DELETE | /api/urls/:id |

## Analytics

| Method | Endpoint                  |
| ------ | ------------------------- |
| GET    | /api/analytics/:shortCode |

## Redirect

| Method | Endpoint    |
| ------ | ----------- |
| GET    | /:shortCode |

---

# Assumptions Made

* Each shortened URL belongs to one authenticated user.
* Analytics are stored for every successful redirect.
* Short codes are generated uniquely using nanoid.
* MongoDB Atlas is used as the cloud database.
* Server-side redirect handling is implemented for analytics tracking.
* Users can only manage their own URLs.
* Invalid URLs are rejected using backend validation.

---

# AI Planning Document

## Planning Approach

The application was planned using a modular MERN architecture to separate frontend and backend responsibilities clearly.

### Frontend Planning

* React-based SPA
* Dashboard-focused UI
* Component reusability
* API service layer
* Protected routes

### Backend Planning

* REST API structure
* JWT authentication middleware
* MongoDB schema relationships
* Analytics tracking system
* Centralized error handling

### Database Planning

Three primary collections were designed:

* Users
* URLs
* Visits

Relationships:

* One user → many URLs
* One URL → many visits

---

# Architecture Diagram

```text
                ┌──────────────────┐
                │     Frontend      │
                │ React + Vite UI   │
                └────────┬─────────┘
                         │ REST API
                         ▼
                ┌──────────────────┐
                │     Backend       │
                │ Node + Express    │
                └────────┬─────────┘
                         │ Mongoose
                         ▼
                ┌──────────────────┐
                │    MongoDB Atlas  │
                │ Users / URLs /    │
                │ Visit Analytics   │
                └──────────────────┘
```

---

# Future Improvements

* QR Code Generation
* Custom URL Aliases
* Link Expiry
* Device & Browser Analytics
* Export Analytics Reports
* Public Statistics Page

---

# Deployment

Frontend can be deployed using:

* Vercel

Backend can be deployed using:

* Render
* Railway

Database:

* MongoDB Atlas

---

# Author

Pranesh



