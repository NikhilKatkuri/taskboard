# Taskboard Backend

## Architecture Overview

This backend application is built using **Node.js** and **Express.js**, providing a RESTful API for task management.

## Project Structure

```
backend/
├── config/         # Configuration files (database, environment)
├── controllers/    # Request handlers and business logic
├── models/         # Database schemas and models
├── routes/         # API route definitions
├── middleware/     # Custom middleware (auth, validation, error handling)
├── utils/          # Helper functions and utilities
└── server.js       # Application entry point
```

## Database

- **Type**: MongoDB / PostgreSQL / MySQL
- **ORM/ODM**: Mongoose / Sequelize / Prisma
- **Connection**: Database connection is established in `config/database.js`

### Database Schema

- **Users**: User authentication and profile data
- **Tasks**: Task details, status, assignments
- **Projects**: Project information and metadata

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user

### Tasks

- `GET /api/tasks` - Get all tasks
- `POST /api/tasks/create` - Create new task
- `PUT /api/tasks/update/:id` - Update task
- `DELETE /api/tasks/delete/:id` - Delete task

## Request/Response Flow

1. **Client Request** → API Endpoint
2. **Middleware** → Authentication, Validation
3. **Controller** → Business Logic Processing
4. **Model** → Database Interaction
5. **Response** → JSON Data to Client

## Application State

- **Stateless**: Server maintains no client state
- **JWT Tokens**: Used for authentication
- **Session Management**: Token-based sessions
- **Database State**: Persistent data storage

## Environment Variables

```env
PORT=5000
NODE_ENV=development
DATABASE_URL=your_database_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=30d
```

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Run production server
npm start
```

## Error Handling

- Centralized error handling middleware
- Consistent error response format
- HTTP status codes for different error types

## Security

- Password hashing with bcrypt
- JWT token authentication
- Input validation and sanitization
- CORS configuration
- Rate limiting
