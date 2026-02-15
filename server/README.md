# Taskboard Backend

> Node.js + Express + TypeScript + MongoDB backend API for task management

## 📋 Overview

RESTful API built with Express 5 and TypeScript, providing secure authentication and task management operations with MongoDB persistence.

## 🛠️ Tech Stack

| Component            | Technology              |
| -------------------- | ----------------------- |
| **Runtime**          | Node.js                 |
| **Framework**        | Express 5               |
| **Language**         | TypeScript 5.9          |
| **Database**         | MongoDB with Mongoose 9 |
| **Authentication**   | JWT (jsonwebtoken)      |
| **Password Hashing** | bcryptjs                |
| **Validation**       | express-validator       |
| **Security**         | CORS, bcryptjs          |
| **Dev Tools**        | nodemon, ts-node        |

## 📁 Project Structure

```
server/
├── src/
│   ├── server.ts                 # Application entry point
│   ├── controllers/
│   │   ├── authController.ts     # Authentication logic
│   │   ├── taskController.ts     # Task CRUD operations
│   │   └── connection.ts         # MongoDB connection
│   ├── middleware/
│   │   └── authMiddleware.ts     # JWT authentication middleware
│   ├── models/
│   │   ├── User.ts               # User schema and model
│   │   └── Task.ts               # Task schema and model
│   ├── routes/
│   │   ├── authRoutes.ts         # Auth route definitions
│   │   └── taskRoutes.ts         # Task route definitions
│   └── types/
│       └── index.ts              # TypeScript type definitions
├── dist/                         # Compiled JavaScript output
├── tsconfig.json                 # TypeScript configuration
├── package.json
└── .env                          # Environment variables
```

## 🗄️ Database Schema

### User Model

```typescript
{
  fullName: String,        // Min 6 characters
  email: String,           // Unique, lowercase, validated
  password: String,        // Hashed with bcryptjs, min 8 chars
  createdAt: Date,
  updatedAt: Date
}
```

**Indexes**: `email` (unique)

### Task Model

```typescript
{
  title: String,           // Required, max 100 characters
  description: String,     // Optional, max 500 characters
  priority: String,        // Enum: 'Low', 'Medium', 'High'
  status: String,          // Enum: 'todo', 'in-progress', 'review', 'done'
  dueAt: Date,            // Required
  tags: [String],         // Array of strings
  owner: ObjectId,        // Reference to User
  createdAt: Date,
  updatedAt: Date
}
```

**Indexes**: `{ owner: 1, createdAt: -1 }` (compound index for efficient queries)

## 🔌 API Endpoints

### Authentication Routes

| Method | Endpoint             | Description       | Auth Required |
| ------ | -------------------- | ----------------- | ------------- |
| POST   | `/api/auth/register` | Register new user | No            |
| POST   | `/api/auth/login`    | Login user        | No            |
| GET    | `/api/auth/me`       | Get current user  | Yes           |

### Task Routes

| Method | Endpoint                | Description      | Auth Required |
| ------ | ----------------------- | ---------------- | ------------- |
| GET    | `/api/tasks`            | Get user's tasks | Yes           |
| POST   | `/api/tasks/create`     | Create new task  | Yes           |
| PUT    | `/api/tasks/update/:id` | Update task      | Yes           |
| DELETE | `/api/tasks/delete/:id` | Delete task      | Yes           |

### Health Check

| Method | Endpoint      | Description   | Auth Required |
| ------ | ------------- | ------------- | ------------- |
| GET    | `/api/health` | Health status | No            |

## 🔐 Authentication Flow

### Registration

1. Client sends: `{ fullName, email, password }`
2. Validation with express-validator
3. Password hashed using bcryptjs (10 salt rounds)
4. User saved to MongoDB
5. Response: User object (password excluded)

### Login

1. Client sends: `{ email, password }`
2. Validation with express-validator
3. User lookup by email (with password field)
4. Password comparison using bcryptjs
5. JWT token generation with user ID
6. Response: `{ token, user }`

### Protected Routes

1. Client includes JWT in Authorization header: `Bearer <token>`
2. `authMiddleware` verifies token
3. User ID extracted and attached to request
4. Controller accesses authenticated user via `req.userId`

## 🔒 Security Features

| Feature                | Implementation                         |
| ---------------------- | -------------------------------------- |
| **Password Hashing**   | bcryptjs with 10 salt rounds           |
| **JWT Authentication** | jsonwebtoken with secret key           |
| **Input Validation**   | express-validator on all routes        |
| **CORS**               | Configured for frontend origin         |
| **User Isolation**     | Tasks filtered by authenticated user   |
| **Password Exclusion** | Password field excluded from responses |
| **Error Handling**     | Centralized error middleware           |

## 📦 Installation & Setup

### Prerequisites

- Node.js (v18 or higher)
- npm (v9+)
- MongoDB instance (local or cloud like MongoDB Atlas)

### Steps

1. **Clone the repository**

   ```bash
   git clone https://github.com/NikhilKatkuri/taskboard.git
   cd taskboard/backend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the backend directory:

   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/taskboard
   # or for MongoDB Atlas:
   # MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/taskboard
   JWT_SECRET=your_super_secret_jwt_key_here
   CLIENT_URL=http://localhost:5173
   NODE_ENV=development
   ```

4. **Start development server**

   ```bash
   npm run dev
   ```

   Server will run on `http://localhost:5000`

5. **Build for production**

   ```bash
   npm run build
   npm start
   ```

## 🚀 API Request/Response Examples

### Register User

```bash
POST /api/auth/register
Content-Type: application/json

{
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123"
}

# Response (201 Created)
{
  "_id": "507f1f77bcf86cd799439011",
  "fullName": "John Doe",
  "email": "john@example.com",
  "createdAt": "2025-12-16T10:00:00.000Z",
  "updatedAt": "2025-12-16T10:00:00.000Z"
}
```

### Login

```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePass123"
}

# Response (200 OK)
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "fullName": "John Doe",
    "email": "john@example.com"
  }
}
```

### Create Task

```bash
POST /api/tasks/create
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Complete project",
  "description": "Finish the task management app",
  "priority": "High",
  "status": "in-progress",
  "dueAt": "2025-12-25T00:00:00.000Z",
  "tags": ["work", "urgent"]
}

# Response (201 Created)
{
  "_id": "507f1f77bcf86cd799439012",
  "title": "Complete project",
  "description": "Finish the task management app",
  "priority": "High",
  "status": "in-progress",
  "dueAt": "2025-12-25T00:00:00.000Z",
  "tags": ["work", "urgent"],
  "owner": "507f1f77bcf86cd799439011",
  "createdAt": "2025-12-16T10:05:00.000Z",
  "updatedAt": "2025-12-16T10:05:00.000Z"
}
```

### Get All Tasks

```bash
GET /api/tasks
Authorization: Bearer <token>

# Response (200 OK)
[
  {
    "_id": "507f1f77bcf86cd799439012",
    "title": "Complete project",
    "description": "Finish the task management app",
    "priority": "High",
    "status": "in-progress",
    "dueAt": "2025-12-25T00:00:00.000Z",
    "tags": ["work", "urgent"],
    "owner": "507f1f77bcf86cd799439011",
    "createdAt": "2025-12-16T10:05:00.000Z",
    "updatedAt": "2025-12-16T10:05:00.000Z"
  }
]
```

### Update Task

```bash
PUT /api/tasks/update/507f1f77bcf86cd799439012
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "done"
}

# Response (200 OK)
{
  "_id": "507f1f77bcf86cd799439012",
  "title": "Complete project",
  "status": "done",
  ...
}
```

### Delete Task

```bash
DELETE /api/tasks/delete/507f1f77bcf86cd799439012
Authorization: Bearer <token>

# Response (200 OK)
{
  "message": "Task deleted successfully"
}
```

## 🔧 Environment Variables

| Variable      | Description                          | Example                               |
| ------------- | ------------------------------------ | ------------------------------------- |
| `PORT`        | Server port                          | `5000`                                |
| `MONGODB_URI` | MongoDB connection string            | `mongodb://localhost:27017/taskboard` |
| `JWT_SECRET`  | Secret key for JWT signing           | `your_super_secret_key`               |
| `CLIENT_URL`  | Frontend URL for CORS                | `http://localhost:5173`               |
| `NODE_ENV`    | Environment (development/production) | `development`                         |

## 📜 Available Scripts

```bash
npm run dev      # Start development server with nodemon
npm run build    # Compile TypeScript to JavaScript
npm start        # Run compiled production server
npm test         # Run tests (if configured)
```

## ⚠️ Error Handling

### Error Response Format

```json
{
  "message": "Error description"
}
```

### HTTP Status Codes

| Code | Meaning               | Example                    |
| ---- | --------------------- | -------------------------- |
| 200  | Success               | Task retrieved             |
| 201  | Created               | User registered            |
| 400  | Bad Request           | Invalid input data         |
| 401  | Unauthorized          | Invalid/missing token      |
| 404  | Not Found             | Task not found             |
| 409  | Conflict              | Email already exists       |
| 500  | Internal Server Error | Database connection failed |

## 🧪 Testing

To test API endpoints, use tools like:

- **Postman**: Import API collection
- **curl**: Command-line testing
- **Thunder Client**: VS Code extension
- **REST Client**: VS Code extension

## 🚀 Deployment

### Prerequisites for Production

1. Set `NODE_ENV=production` in environment
2. Use strong `JWT_SECRET`
3. Use MongoDB Atlas or production MongoDB instance
4. Enable HTTPS
5. Configure proper CORS origins
6. Set up logging and monitoring

### Build and Deploy

```bash
npm run build
npm start
```

---

**Last Updated**: December 16, 2025

Made with ❤️ by [Nikhil Katkuri](https://github.com/NikhilKatkuri)
