# 🎫 SupportApp - DCC Ticketing System

A comprehensive Data Center/Customer Care ticketing system with a modern React frontend and robust Node.js backend API.

## 🏗️ Project Structure

This is a monorepo containing both frontend and backend applications:

```
SupportApp/
├── support-be/          # Backend API (Node.js + Express + TypeScript)
├── support-fe/          # Frontend App (React + TypeScript + Vite)
├── README.md           # This file
├── .gitignore          # Git ignore rules for the entire monorepo
└── support.code-workspace  # VS Code workspace configuration
```

## 🧩 Monorepo with Turborepo

This repository is managed with Turborepo and npm workspaces.

- All workspace packages live in `support-be/` and `support-fe/` as defined in the root `package.json` `workspaces` field.
- The pipeline is configured in `turbo.json`.

### Install (from repo root)

```bash
npm install
```

### Common Commands (from repo root)

- `npm run dev` — Runs `turbo dev` to start all apps that have a `dev` script (backend + frontend).
- `npm run build` — Runs `turbo build` across workspaces with proper dependency ordering and caching.
- `npm run start` — Runs `turbo start` (each app’s `start` after it’s built).
- `npm run lint` — Runs `turbo lint`.
- `npm run type-check` — Runs TypeScript checks via `turbo type-check`.
- `npm run test` — Runs tests via `turbo test`.
- `npm run clean` — Cleans build artifacts via `turbo clean`.

### Run a Single Package

- With npm workspaces:
  - Backend: `npm run dev -w support-be`
  - Frontend: `npm run dev -w support-fe`
- With Turborepo filters:
  - Backend: `npx turbo run dev --filter=@support-app/backend`
  - Frontend: `npx turbo run dev --filter=@support-app/frontend`

### Pipeline Highlights (`turbo.json`)

- `build` depends on upstream `^build` and caches outputs like `dist/**` and `build/**`.
- `dev` and `start` are marked `persistent: true` and do not use cache.
- `lint`, `type-check`, and `test` depend on upstream builds.
- Global dependencies include environment files: `**/.env`, `**/.env.*`.

Turborepo provides incremental and remote/local caching to speed up repeated tasks. The cache directory lives at `.turbo/` (ignored by Git per `.gitignore`).

## 🎯 Overview

The SupportApp is designed to manage customer support tickets, user management, agent assignments, and ticket lifecycle operations. It provides:

- **Backend**: RESTful API built with Node.js, Express, TypeScript, and Prisma ORM
- **Frontend**: Modern React application with Material-UI Joy, TypeScript, and Vite

## ✨ Key Features

- 🎫 **Ticket Management** - Create, update, assign, and track support tickets
- 👥 **User Management** - Manage customers, agents, and administrators
- 🔐 **Authentication & Authorization** - JWT-based auth with role-based access control
- 📎 **File Attachments** - Support for ticket attachments
- 🔄 **Ticket Allocation** - Intelligent ticket assignment to agents
- 📊 **Analytics & Reporting** - Ticket statistics and performance metrics
- 🔍 **Advanced Search & Filtering** - Find tickets by status, priority, category, etc.
- 📱 **Modern UI** - Responsive design with Material-UI Joy components
- 🚀 **Real-time Updates** - Live ticket status updates

## 🛠️ Tech Stack

### Backend (`support-be/`)
- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: SQL Server with Prisma ORM
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs
- **File Storage**: Backblaze B2
- **Email**: Nodemailer with IMAP support
- **AI Integration**: Google Generative AI

### Frontend (`support-fe/`)
- **Framework**: React 18
- **Language**: TypeScript
- **Build Tool**: Vite
- **UI Library**: Material-UI Joy
- **State Management**: TanStack Query (React Query)
- **Routing**: React Router DOM
- **Forms**: Formik + Yup validation
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Animations**: Framer Motion

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- SQL Server database
- Git

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone <repository-url>
cd SupportApp
```

### 2. Backend Setup

```bash
cd support-be

# Install dependencies
npm install

# Create environment file
cp .env.example .env
# Edit .env with your configuration

# Generate Prisma Client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# (Optional) Seed the database
npm run seed

# Start the backend server
npm start
```

The backend server will start at `http://localhost:4000`

### 3. Frontend Setup

```bash
cd ../support-fe

# Install dependencies
npm install

# Create environment file
cp .env.example .env
# Edit .env with your configuration

# Start the frontend development server
npm run dev
```

The frontend application will start at `http://localhost:5173`

## 🔧 Environment Configuration

### Backend Environment Variables (`support-be/.env`)

```env
# Database
DATABASE_URL="sqlserver://localhost:1433;database=DCC_Ticketing;user=sa;password=yourpassword;encrypt=true;trustServerCertificate=true"

# JWT Secret
JWT_SECRET="your-super-secret-jwt-key"

# Server Configuration
PORT=4000
NODE_ENV=development

# Logging
LOG_LEVEL=info

# Backblaze B2 (for file storage)
B2_APPLICATION_KEY_ID="your-b2-key-id"
B2_APPLICATION_KEY="your-b2-application-key"
B2_BUCKET_ID="your-b2-bucket-id"

# Email Configuration
SMTP_HOST="your-smtp-host"
SMTP_PORT=587
SMTP_USER="your-email@domain.com"
SMTP_PASS="your-email-password"

# Google AI
GOOGLE_AI_API_KEY="your-google-ai-api-key"
```

### Frontend Environment Variables (`support-fe/.env`)

```env
# API Base URL
VITE_API_BASE_URL=http://localhost:4000/api
```

## 📚 API Documentation

The backend provides a comprehensive RESTful API. Key endpoints include:

### 🔐 Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile

### 🎫 Tickets
- `GET /api/tickets` - Get all tickets (with filters)
- `POST /api/tickets` - Create new ticket
- `PUT /api/tickets/:id` - Update ticket
- `PUT /api/tickets/:id/assign` - Assign ticket to agent

### 👥 Users
- `GET /api/users` - Get all users
- `POST /api/users` - Create new user
- `PUT /api/users/:id` - Update user

For detailed API documentation, see [`support-be/README.md`](./support-be/README.md).

## 🧪 Development

### Running Both Applications

You can run both frontend and backend simultaneously:

```bash
# Terminal 1 - Backend
cd support-be
npm start

# Terminal 2 - Frontend
cd support-fe
npm run dev
```

### Building for Production

#### Backend
```bash
cd support-be
npm run build
npm run serve
```

#### Frontend
```bash
cd support-fe
npm run build
npm run preview
```

## 📊 Project Scripts

### Backend Scripts
- `npm start` - Start development server with nodemon
- `npm run build` - Build TypeScript to JavaScript
- `npm run serve` - Run built application
- `npm run seed` - Seed database with sample data

### Frontend Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 🔒 Security Features

- **JWT Authentication** - Secure token-based authentication
- **Role-Based Access Control** - Different permissions per role
- **Password Hashing** - bcryptjs with salt rounds
- **Input Validation** - Request validation and sanitization
- **SQL Injection Prevention** - Prisma ORM protection
- **CORS Configuration** - Cross-origin request handling
- **Rate Limiting** - API rate limiting
- **Helmet Security** - Security headers

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes in the appropriate directory (`support-be/` or `support-fe/`)
4. Commit your changes (`git commit -m 'Add amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues:

1. Check the individual README files in `support-be/` and `support-fe/`
2. Review the API documentation
3. Check server logs for error details
4. Test the health endpoint: `GET /health`

## 🚧 Roadmap

- [ ] Real-time notifications with WebSocket
- [ ] Email integration improvements
- [ ] Advanced reporting dashboard
- [ ] Mobile app support
- [ ] Multi-tenant support
- [ ] Integration with external systems
- [ ] Automated ticket routing
- [ ] SLA management
- [ ] Docker containerization
- [ ] CI/CD pipeline setup

## 👥 Team

- **Full-Stack Development** - Complete application development
- **Backend Development** - API and database design
- **Frontend Development** - React UI/UX implementation
- **DevOps** - Deployment and infrastructure
- **QA** - Testing and quality assurance

---

**Built with ❤️ for efficient customer support operations**

For more detailed information about each component:
- [Backend Documentation](./support-be/README.md)
- [Frontend Documentation](./support-fe/README.md)
