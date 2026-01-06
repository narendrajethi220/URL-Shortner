# 🔗 URL Shortener Backend Service

A **TypeScript-based backend application** for generating and resolving shortened URLs, built with a focus on **clean architecture, type safety, validation, caching, and logging**.

---

## 📌 Features

* Generate **unique short URLs** for long URLs
* Redirect short URLs to the original destination
* **Redis-based caching** for fast URL resolution
* Persistent storage using **MongoDB**
* **Type-safe APIs** with validation
* Centralized **structured logging** with log rotation
* Environment-based configuration support

---

## 🛠 Tech Stack

* **Language:** TypeScript
* **Runtime:** Node.js
* **Framework:** Express.js
* **API Layer:** tRPC
* **Database:** MongoDB (Mongoose)
* **Cache:** Redis
* **Validation:** Zod
* **Logging:** Winston, Winston Daily Rotate File
* **Utilities:** UUID, dotenv

