# EmpTrackAI — Employee Activity Tracking System

EmpTrackAI is a full-stack employee activity tracking system. It provides a React admin dashboard and a FastAPI backend for organizations to manage employees, review activity records, and maintain secure role-based access.

## Features

- Multi-organization support
- Super-admin registration and login
- React admin dashboard
- Employee management
- Activity logging for screenshots, app usage, and keystrokes
- JWT authentication and role-based access
- PostgreSQL database with SQLAlchemy ORM

## Technology Stack

- Frontend: React, Vite, CSS
- Backend: Python, FastAPI
- Database: PostgreSQL
- ORM: SQLAlchemy 2.0
- Authentication: JWT and Passlib (bcrypt)
- Validation: Pydantic v2
- Configuration: pydantic-settings

## Project Structure

```text
EmpTrackAI/
├── frontend/                 # React admin dashboard
├── app/                      # FastAPI application
│   ├── api/v1/routes/
│   ├── core/
│   ├── db/
│   ├── models/
│   ├── repositories/
│   ├── schemas/
│   └── services/
├── requirements.txt
└── README.md
```

## Setup

### Backend

```powershell
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

Create a `.env` file in the project root:

```env
DATABASE_URL=postgresql+psycopg2://postgres:yourpassword@localhost:5432/emptrackai
SECRET_KEY=your_very_long_random_secret_key_here
ACCESS_TOKEN_EXPIRE_MINUTES=10080
PROJECT_NAME=EmpTrackAI
```

### Frontend

```powershell
cd frontend
npm install
npm run dev
```

The frontend runs locally through Vite. The backend API runs at `http://127.0.0.1:8000`.

## Current API Endpoints

| Method | Endpoint | Description |
| --- | --- | --- |
| POST | `/api/v1/register` | Register an organization and admin |
| POST | `/api/v1/login` | Admin login |
| GET | `/health` | Health check |

## Planned Enhancements

- Employee and activity-log APIs
- Real-time dashboard with WebSockets
- Reports and exports
- Docker and Docker Compose
- Alembic migrations

Made for EmpTrackAI.
# rahul-profile
