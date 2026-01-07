# 🔗 URL Shortener Backend Service

A backend URL shortener application built with **Node.js**, **TypeScript**, **tRPC**, **Redis**, and **MongoDB**.
It generates short URLs using a counter-based approach and Base62 encoding for fast and scalable URL creation.

---

## ✨ Features

* Shortens long URLs into compact, shareable links
* Redis-based atomic counter for unique ID generation
* Base62 encoding for readable short URLs
* MongoDB for persistent URL storage
* tRPC for type-safe API communication
* Docker-ready Redis setup
* Clean layered architecture (Controller → Service → Repository)

---

## 🛠 Tech Stack

* **Node.js**
* **TypeScript**
* **tRPC**
* **Express**
* **Redis**
* **MongoDB**
* **Docker**
* **Zod** (for input validation)

---

## 📁 Project Structure

```
src/
 ├── controllers/
 ├── services/
 ├── repositories/
 ├── routers/
 │   └── tRPC/
 ├── utils/
 ├── config/
 └── server.ts
```

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory and add the following:

```env
PORT=7777
REDIS_URL="redis://localhost:6379"
MONGO_URI="mongodb://localhost:27017/short_url"
REDIS_COUNTER_KEY="url_shortener_counter_key"
BASE_URL="http://localhost:7777"
```

---

## 🚀 Getting Started

### 1️⃣ Clone the repository

```bash
git clone https://github.com/narendrajethi220/URL-Shortner.git
cd URL-Shortner
```

---

### 2️⃣ Install dependencies

```bash
npm install
```

---

### 3️⃣ Start Redis (Docker)

```bash
docker run -d \
  --name redis-stack \
  -p 6379:6379 \
  -p 8001:8001 \
  redis/redis-stack:latest
```

* Redis server → `localhost:6379`
* Redis GUI → `http://localhost:8001`

---

### 4️⃣ Start the application

```bash
npm run dev
```

Server will start on:

```
http://localhost:7777
```

---

## 🔌 API Usage (tRPC)

All APIs are exposed via tRPC at:

```
/trpc
```

Example procedure call (Postman):

```
POST http://localhost:7777/trpc/url.create
```

---

## 🧠 How URL Generation Works

1. Redis stores a global counter key
2. Each request increments the counter atomically
3. The numeric ID is converted to a Base62 string
4. The short URL is stored in MongoDB
5. The short URL is returned to the client

---

## 📌 Example Short URL

```
http://localhost:7777/aZ3f
```

---

## 📄 License

This project is for learning and educational purposes.

---

## 👨‍💻 Author

**Narendra Jethi**
Backend / MERN Stack Developer

