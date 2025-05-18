# 📱 MobileComm Full Stack App

A full-featured mobile phone store web application with admin and customer login, product management, and role-based access.

## 🔧 Tech Stack

- Frontend: React, Tailwind CSS, Axios
- Backend: Python FastAPI, SQLAlchemy
- DB: MySQL
- Auth: JWT Tokens
- Testing: Pytest (unit), Playwright/Cypress (E2E)
- Documentation: Swagger UI (FastAPI)

## 🚀 Features

- SignUp/Login using JWT Authentication
- Role-based access (Admin can add products)
- Admin dashboard: Add Product page
- Public product listing
- Responsive Navbar with Breadcrumbs
- Secure Logout
- Route protection

## 🛠️ Getting Started

### Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt
uvicorn main:app --reload
