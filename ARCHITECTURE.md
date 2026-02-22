# 🏗️ System Architecture – StudentTools Hub

---

# 1️⃣ High-Level Architecture

Frontend (React)
        ↓
Backend API (Node + Express)
        ↓
Database (MongoDB Atlas)

---

# 2️⃣ Frontend Architecture

- SPA using React
- React Router for navigation
- Utility logic in `/utils`
- API calls using Axios
- SEO handled using React Helmet

---

# 3️⃣ Backend Architecture

### REST API Design

GET /api/tools
POST /api/planner
POST /api/auth/register
POST /api/auth/login

---

# 4️⃣ Database Design

## User Schema

- name
- email
- password
- isPremium
- createdAt

## Planner Schema

- userId
- subjects
- examDates
- generatedSchedule
- createdAt

---

# 5️⃣ Security

- JWT Authentication
- Password hashing (bcrypt)
- CORS enabled
- Environment variables

---

# 6️⃣ Scalability Plan

Phase 1: Client-side tools only  
Phase 2: Add authentication  
Phase 3: Add payment gateway  
Phase 4: Add AI tools  

---

# 7️⃣ Performance Optimization

- Lazy loading
- Code splitting
- CDN via Vercel
- Minified assets
