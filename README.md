
# DocVault

DocVault is a **JWT‑secured file manager**. Users can register, log in, and then upload, list, download or delete **PDF / PNG / JPG** documents through a clean Bootstrap interface.

---

## ✨ Features

| Area          | Capability                                                                         |
|---------------|------------------------------------------------------------------------------------|
| **Auth**      | JWT login / register & bcrypt hashing                                              |
| **Files**     | Multer disk storage, custom file names, list / download / delete                   |
| **UI**        | Bootstrap 5 responsive cards & tables, dark‑friendly palette                       |
| **Security**  | Helmet, rate‑limit, 1 h token expiry, robust validation                            |
| **DevOps**    | Nodemon dev script, Docker sample, ESLint baseline                                 |

---

## 🗺️ Tech Stack

* **Node.js 18** / Express 5  
* **MongoDB 6** (Mongoose 7)  
* Bootstrap 5 + vanilla JS  
* JSON Web Tokens

---

## 📂 Project Structure

```text
DocVault/
├ public/                # static front‑end
│ ├ index.html           # ⇢ login.html
│ ├ login.html           # login form
│ ├ register.html        # register form
│ ├ files.html           # file dashboard
│ ├ _shared.css          # shared styles
│ └ js/
│     ├ login.js
│     ├ register.js
│     └ files.js
│
├ uploads/               # disk storage (auto‑created)
│
├ src/
│ ├ config/db.js
│ ├ controllers/
│ │ ├ authController.js
│ │ └ fileController.js
│ ├ middleware/authMiddleware.js
│ ├ models/
│ │ ├ User.js
│ │ └ File.js
│ ├ routes/
│ │ ├ auth.js
│ │ └ file.js
│ └ index.js
│
├ .env.example
└ package.json
```

---

## ⚡ Quick Start

```bash
# clone & install
git clone https://github.com/yourname/docvault.git
cd docvault && npm install

# configure
cp .env.example .env        # then edit PORT / MONGO_URI / JWT_SECRET

# ensure MongoDB is running (service or docker)

# dev server
npm run dev                 # open http://localhost:4000
```

---

## 🔑 Environment Variables

| Key | Description | Example |
|-----|-------------|---------|
| `PORT` | Listener port | `4000` |
| `MONGO_URI` | MongoDB connection | `mongodb://127.0.0.1:27017/docvault` |
| `JWT_SECRET` | 32‑char signing key | `superSecret$123` |
| `MAX_FILE_MB` | (opt) per‑file size limit | `20` |

---

## 📑 REST API

### Auth

| Method | Endpoint | Body | Success |
|--------|----------|------|---------|
| POST | `/api/auth/register` | `{ username, password }` | `{ msg }` |
| POST | `/api/auth/login` | `{ username, password }` | `{ token }` |

### Files (JWT required)

| Method | Endpoint | Notes |
|--------|----------|-------|
| POST | `/api/files/upload` | form‑data fields: `file`, `newName?` |
| GET | `/api/files` | list user files |
| DELETE | `/api/files/:id` | delete file & record |
| GET | `/api/files/:id/download` | download file |

---

## 🔒 Security Notes

* **Passwords** hashed with bcrypt (10 rounds).  
* **Tokens** expire in 1 hour; every protected route verifies them.  
* **Helmet** & **Rate‑Limit** middleware are enabled in production.  
* **Validation**  
  * Username 3‑20 alphanumeric  
  * Password ≥ 8, 1 upper, 1 lower, 1 digit  
  * Custom filename 2‑50 chars, no `\ / : * ? " < > |`

---

## 🛣️ Roadmap

- [ ] Versioning (v1, v2, …)  
- [ ] Email verify & password reset  
- [ ] Dark / light toggle  
- [ ] Docker‑compose production stack  
- [ ] React SPA front‑end

---

## 🤝 Contributing

1. Fork → feature branch → PR  
2. Run `npm run lint` before committing

---

## 🪪 License

MIT © 2025 OĞUZHAN TARHAN
