# 🧩 Fullstack App — Django Backend & Next.js Frontend

This project is a fullstack web application that combines a **Django REST API backend** with a **Next.js frontend**, all orchestrated using **Docker Compose**. It includes a `BackendAPI.md` file to document the available API endpoints.

## 📁 Project Structure

```
.
├── backend/             # Django backend project
│   ├── manage.py
│   └── ...
├── frontend/            # Next.js frontend application
│   ├── package.json
│   └── ...
├── docker-compose.yml   # Docker Compose setup
├── BackendAPI.md        # API documentation
└── README.md            # This file
```

## 🚀 Getting Started

### 🔧 Prerequisites

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

### 📦 Setup & Run

1. Clone the repository:

```bash
git clone git@github.com:Alfredowss/Fractal-interview.git
cd <repo-folder>
```

2. Start the development server:

```bash
docker-compose up --build
```

3. Visit the app:

- **Frontend**: [http://localhost:3000](http://localhost:3000)
- **Backend API**: [http://localhost:8000](http://localhost:8000)

## 🌐 Environment Variables

### Frontend (`frontend/.env`)

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```
## 👨‍💻 Alfred

Made with ❤️ using Django & Next.js.
