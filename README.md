# EasyGenerator Full-Stack Authentication Module

A production-ready authentication system built with **NestJS** (backend) and **React + TypeScript** (frontend), featuring JWT-based authentication, comprehensive logging, and modern UI/UX design.

## Project Overview

This project implements a complete user authentication module with signup, signin, and protected routes, following industry best practices for both frontend and backend development.

### Key Features

- **JWT Authentication** - Secure token-based authentication
- **User Management** - Complete signup/signin flow with validation
- **Protected Routes** - Route guards for authenticated-only content
- **Comprehensive Logging** - Request/response, authentication events, and performance monitoring
- **API Documentation** - Auto-generated Swagger documentation
- **Modern UI** - Responsive design with Tailwind CSS
- **Real-time Validation** - Client-side form validation with visual feedback
- **Security First** - Password requirements, CORS configuration, input sanitization

##  Architecture

```
easyGenerator/
├── backend/          
│   ├── src/
│   │   ├── auth/    
│   │   ├── logging/ 
│   │   └── ...
│   └── ...
├── frontend/        
│   ├── src/
│   │   ├── components/  
│   │   ├── pages/       
│   │   ├── contexts/  
│   │   ├── services/   
│   │   └── ...
│   └── ...
└── README.md
```

## Tech Stack

### Backend
- **NestJS** - Progressive Node.js framework
- **MongoDB** - NoSQL database with Mongoose ODM
- **JWT** - JSON Web Tokens for authentication
- **Passport.js** - Authentication middleware
- **Winston** - Logging library
- **Swagger** - API documentation
- **bcryptjs** - Password hashing

### Frontend
- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **React Hook Form** - Form handling with validation
- **Zod** - Schema validation
- **Axios** - HTTP client

## Quick Start

### Prerequisites

- **Node.js** (v18 or higher)
- **MongoDB** (local installation or MongoDB Atlas)
- **npm** or **yarn**

### 1. Clone the Repository

```bash
git clone <repository-url>
cd easyGenerator
```

### 2. Backend Setup

```bash
cd backend
npm install

# Create environment file
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret

# Start development server
npm run start:dev
```

The backend will be available at `http://localhost:3000`
API documentation at `http://localhost:3000/api`

### 3. Frontend Setup

```bash
cd frontend
npm install

# Create environment file (optional)
echo "VITE_API_URL=http://127.0.0.1:3000" > .env

# Start development server
npm run dev
```

The frontend will be available at `http://localhost:5173`



## Testing the Application

1. **Navigate to the landing page** at `http://localhost:5173`
2. **Enter your email** in the hero section and click "Try free for 14 days"
3. **Complete the signup form** with:
   - Name (min 3 characters)
   - Valid email address
   - Password (min 8 chars, 1 letter, 1 number, 1 special character)
4. **Access the protected dashboard** after successful authentication
5. **Test signin/logout** functionality

## API Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/auth/signup` | User registration | ❌ |
| POST | `/auth/login` | User authentication | ❌ |
| GET | `/auth/profile` | Get user profile | ✅ |
| POST | `/auth/logout` | User logout | ✅ |

## Production Deployment

### Backend Deployment
- Set environment variables for production
- Configure MongoDB connection
- Set secure JWT secrets
- Enable HTTPS
- Configure CORS for production domains

### Frontend Deployment
- Build the production bundle: `npm run build`
- Set production API URL in environment
- Deploy to CDN or static hosting service

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

---
