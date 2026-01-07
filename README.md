# 🔗 URL Shortener Backend Service

A backend URL shortener application built with **Node.js**, **TypeScript**, **tRPC**, **Redis**, and **MongoDB**.
It generates short URLs using a counter-based approach and Base62 encoding for fast and scalable URL creation.

---

## ✨ Features

* Shortens long URLs into compact, shareable links
* Redis-based atomic counter for unique ID generation
* Redis Caching Layer which Caches short-to-original URL mappings in Redis for ultra-fast lookups and reduced database load.
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
URL-SHORTENER/
├── src/
│   ├── config/
│   │   ├── db.config.ts          # MongoDB connection configuration
│   │   ├── redis.config.ts       # Redis client configuration
│   │   ├── logger.config.ts      # Winston / logger setup
│   │   └── index.ts              # Centralized config exports
│   │
│   ├── controllers/
│   │   ├── ping.controller.ts    # Health check controller
│   │   └── url.controller.ts     # URL-related HTTP controllers
│   │
│   ├── dtos/
│   │   └── url.dto.ts            # Data Transfer Objects for URL APIs
│   │
│   ├── logs/
│   │   └── app.log               # Application logs
│   │
│   ├── middlewares/
│   │   ├── correlation.middleware.ts  # Request correlation ID
│   │   └── error.middleware.ts        # Global error handler
│   │
│   ├── models/
│   │   └── url.ts                # MongoDB URL schema/model
│   │
│   ├── repositories/
│   │   ├── cache.repository.ts   # Redis cache interactions
│   │   └── url.repository.ts     # Database operations for URLs
│   │
│   ├── routers/
│   │   ├── tRPC/                 # tRPC routers & context
│   │   ├── v1/                   # API version v1 routes
│   │   └── v2/                   # API version v2 routes (future-ready)
│   │
│   ├── services/
│   │   └── url.service.ts        # Core business logic for URL shortening
│   │
│   ├── utils/
│   │   ├── app.error.ts          # Custom application error classes
│   │   ├── base62.helper.ts      # Base62 encoding logic
│   │   └── request.helper.ts     # Request utility helpers
│   │
│   ├── validators/
│   │   ├── index.ts              # Validator exports
│   │   └── ping.validator.ts     # Validation schemas
│   │
│   └── server.ts                 # Application entry point
│
├── .env                           # Environment variables
├── .gitignore
├── package.json
├── package-lock.json
├── tsconfig.json
└── README.md

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

Request Body
{
  "originalUrl": "https://www.youtube.com/"
}

Response
{
  "result": {
    "data": {
      "id": "695e100bacf164f988ba6eab",
      "shortUrl": "1",
      "originalUrl": "https://www.youtube.com/",
      "fullUrl": "http://localhost:7777/2",
      "createdAt": "2026-01-07T07:49:31.378Z",
      "updatedAt": "2026-01-07T07:49:31.378Z"
    }
  }
}

```

```
GET http://localhost:7777/trpc/url.getOriginalUrl?input={"shortUrl":"1"}

Query Parameter
input={"shortUrl":"1"}

Response
{
  "result": {
    "data": {
      "originalUrl": "https://www.youtube.com/",
      "shortUrl": "1"
    }
  }
}

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

