````markdown
# vehicle-rental-api

A **TypeScript-based Node.js & Express REST API** for managing vehicle rentals.  
Includes **JWT authentication**, **user management**, **vehicle CRUD**, and **booking features** with PostgreSQL integration.

---

## 🌐 Live Deployment

🔗 **API Base URL:** https://vehicle-rental-api-topaz.vercel.app/  
📦 **GitHub Repository:** https://github.com/nayeem-webdev/vehicle-rental-api

---

## 🚀 Features

- 🔐 **User Authentication** (Signup/Login with JWT)
- 👤 **User Management** (Admin controls + user self-update)
- 🚗 **Vehicle Management** (CRUD + availability tracking)
- 📅 **Booking System** (Pricing logic, status updates, auto return)
- 🗄 **PostgreSQL Database**
- 🧩 **Modular Architecture** with TypeScript
- 🔐 **Role-based Authorization** (Admin / Customer)

---

## 🛠 Technology Stack

- **Node.js**
- **Express.js (v5)**
- **TypeScript**
- **PostgreSQL (pg)**
- **JWT Authentication**
- **Bcrypt**
- **Dotenv**
- **TSX for dev server**

---

## ⚙️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/nayeem-webdev/vehicle-rental-api.git
cd vehicle-rental-api
```
````

### 2. Install dependencies

```bash
npm install
```

### 3. Create `.env` file

```
PORT=5000
JWT_SECRET=yoursecret
JWT_EXPIRE=7d
DB_CONNECTION_STRING=postgresql://azure.neon.tech

```

### 4. Run locally

#### Development

```bash
npm run dev
```

#### Build

```bash
npm run build
```

#### Run production build

```bash
node dist/server.js
```

---

# 📡 API Reference

(Extracted from your **[API Reference](./API_REFERENCE.md)** file)

---

## 📜 License

Licensed under **ISC License**.

---
