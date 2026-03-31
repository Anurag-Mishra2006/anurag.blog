# 🚀 Medium-like Blog Platform (Week 13 Project)

A full-stack blog application inspired by Medium, where users can create, read, and update blog posts. Built using a modern serverless backend and a fast React frontend.

---

## 🌐 Live Demo

👉 Frontend: *[vercel url](https://myblog-five-coral.vercel.app/)*

👉 Backend API: *[Cloudflare Worker URL](https://medium.formal-syntax.workers.dev/)*

---

## ✨ Features

* ✍️ Create blog posts
* 📖 View all blogs with preview
* 🔍 Read full blog on a dedicated page
* ✏️ Edit your blogs
* 🔐 Authentication (Signup / Signin using JWT)
* ⚡ Fast and responsive UI
* 🌍 Serverless backend (Cloudflare Workers)

---

## 🛠️ Tech Stack

### 🔹 Frontend

* React (with Hooks)
* Vite
* TypeScript
* Tailwind CSS
* React Router
* Axios

---

### 🔹 Backend

* Cloudflare Workers (Serverless)
* Hono (lightweight web framework)
* Prisma ORM
* PostgreSQL
* JWT Authentication
* Zod (validation)

---

### 🔹 Shared Code

* `@morpheus.live/medium-common`

  * Shared types
  * Validation schemas (Zod)

---

## 🏗️ Architecture

```id="w1m4x0"
Frontend (Vercel)
   ↓ HTTP (Axios)
Backend (Cloudflare Workers + Hono)
   ↓
Prisma ORM
   ↓
PostgreSQL Database
```

---

## 📂 Project Structure

```id="z2psq9"
Web_development/
    └── week13/              #Project folder
        ├── frontend/        # React app (Vite)
        ├── backend/         # Hono + Cloudflare Workers API
        ├── common/          # Shared types & schemas
    
```

---

## ⚙️ Local Setup

### 🔹 Clone Repository

```bash id="w5e2u0"
git clone https://github.com/Anurag-Mishra2006/Web_development/tree/main/week13/medium.git
cd Web_development/week13/medium
```

---

## 🖥️ Frontend Setup

```bash id="2l9j3p"
cd frontend
npm install
npm run dev
```

---

## ⚙️ Backend Setup

```bash id="3n3f2q"
cd backend
npm install
npx prisma generate
npx prisma migrate dev
npm run dev
```

---

## 🔑 Environment Variables

### Frontend (`.env`)

```env id="n1c8h0"
VITE_API_URL=https://your-backend-url
```

---

### Backend (`wrangler.toml` or `.env`)

```env id="c0zz8n"
DATABASE_URL=your_postgres_url
JWT_SECRET=your_secret_key
```

---

## 🚀 Deployment

### 🔹 Frontend (Vercel)

* Root Directory: `frontend`
* Build Command: `npm run build`
* Output Directory: `dist`

---

### 🔹 Backend (Cloudflare Workers)

```bash id="m5f6j0"
npm run deploy
```

---

## 🔐 Authentication Flow

```id="h4o4ey"
User Signup/Login
   ↓
JWT Token Generated
   ↓
Stored in client
   ↓
Sent in Authorization Header
   ↓
Backend verifies token
```

---

## 🧠 Key Learnings

* Building serverless APIs using Hono
* Using Prisma with Cloudflare Workers
* JWT-based authentication
* Monorepo structure with shared packages
* Handling production deployment issues (Vercel, MIME errors, routing)
* Type safety across frontend & backend

---

## 📸 Screenshots

*[image1](images/image.png)*
*[image2](images/image2.png)*
*[image3](images/image3.png)*
*[image4](images/image4.png)*
---

## 🤝 Contributing

Contributions are welcome! Feel free to fork and submit PRs.

---

## 📜 License

MIT License

---

## 👨‍💻 Author

**Anurag Mishra**
GitHub: https://github.com/Anurag-Mishra2006/Web_development/tree/main/week13

---

⭐ If you like this project, please give it a star!
