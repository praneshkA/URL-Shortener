<h1 align="center">🚀 SnapLink Analytics</h1>

<p align="center">
  Shorten • Track • Analyze
</p>

<p align="center">
  A modern full-stack URL Shortener with Analytics built using the MERN Stack.
</p>

---

# 🌐 Live Demo

| Service | Link |
|---|---|
| Frontend | https://katomaran-url.netlify.app |
| Backend API | https://url-shortener-1hzg.onrender.com |
| Demo Video | https://www.loom.com/share/a9ea57a79c04436f96666118db09f941 |

---

# 🏗️ Architecture Diagram

<p align="center">
  <img src="./assets/image.png" width="1000"/>
</p>

---

# ✨ Features

- 🔐 JWT Authentication
- ✂️ URL Shortening
- 📊 Analytics Dashboard
- 📈 Click Tracking
- 🔗 Custom Alias Support
- 📱 Responsive UI
- 🌙 Dark Mode
- 🧾 QR Code Generation
- ⏳ Expiry Date Support
- ✏️ Edit/Delete URLs
- 📋 Copy Short Links

---

# 🛠️ Tech Stack

## Frontend
- React.js
- Tailwind CSS
- Axios
- React Router
- Recharts

## Backend
- Node.js
- Express.js
- JWT Authentication
- NanoID

## Database
- MongoDB Atlas

## Deployment
- Netlify
- Render

---

# 🚀 Setup Instructions

## 1️⃣ Clone Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_LINK
```

---

## 2️⃣ Navigate to Project

```bash
cd snaplink-analytics
```

---

# 📦 Backend Setup

## 3️⃣ Navigate to Backend Folder

```bash
cd backend
```

---

## 4️⃣ Install Dependencies

```bash
npm install
```

---

## 5️⃣ Create Environment Variables

Create `.env` inside backend folder:

```env
PORT=5000
MONGO_URI=YOUR_MONGODB_ATLAS_URI
JWT_SECRET=YOUR_SECRET_KEY
CLIENT_URL=http://localhost:5173
```

---

## 6️⃣ Start Backend

```bash
npm start
```

Backend runs on:

```bash
http://localhost:5000
```

---

# 💻 Frontend Setup

## 7️⃣ Open New Terminal

```bash
cd frontend
```

---

## 8️⃣ Install Dependencies

```bash
npm install
```

---

## 9️⃣ Start Frontend

```bash
npm run dev
```

Frontend runs on:

```bash
http://localhost:5173
```

---

# 📊 Application Flow

1. User registers/login
2. Frontend sends API requests
3. Backend validates JWT token
4. URLs stored in MongoDB
5. Short links redirect users
6. Analytics tracked on every click
7. Dashboard displays stats and trends

---

# 🧠 Development Workflow

## Phase 1 — Authentication
- Signup/Login
- JWT Authentication
- Protected Routes

## Phase 2 — URL Shortening
- Short URL generation
- NanoID implementation
- Redirect APIs

## Phase 3 — Dashboard
- URL Management
- Copy/Delete Links
- Responsive Design

## Phase 4 — Analytics
- Click Tracking
- Visit History
- Analytics Visualization

## Phase 5 — Bonus Features
- QR Codes
- Custom Alias
- Expiry Support
- Dark Mode

---

# 🧪 Assumptions

- Users must login before accessing dashboard
- MongoDB Atlas is used as cloud database
- JWT used for secure authentication
- REST APIs handle frontend/backend communication
- Expired URLs stop redirecting
- Users provide valid URLs

---

# 🤖 AI Tools Used

- ChatGPT
- Claude AI

Used for:
- UI/UX Improvements
- Debugging
- Architecture Planning
- Responsive Design
- Feature Planning

---

# ✅ Final Outcome

SnapLink Analytics successfully delivers:

- Full-stack URL Shortener
- Secure Authentication
- Analytics Tracking
- Production-style Dashboard
- Modern Responsive UI
- QR Code Support
- SaaS-style Experience

---

# 📸 Project Preview

<p align="center">
  <img src="./assets/image.png" width="1000"/>
</p>

---

# 👨‍💻 Author

Developed by Pranesh
