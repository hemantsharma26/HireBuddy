# HireBuddy Backend

Production-ready backend for HireBuddy - Human-to-human instant hiring platform.

## 🚀 Quick Start

### Prerequisites

- Node.js >= 18.0.0
- MongoDB >= 5.0

### Installation

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Update .env with your configuration

# Start development server
npm run dev
```

### Production

```bash
npm start
```

## 📁 Project Structure

```
src/
├── config/          # Configuration files
├── controllers/     # Request handlers
├── middlewares/     # Express middlewares
├── models/          # Mongoose models
├── routes/          # API routes
├── services/        # Business logic services
├── utils/           # Utility functions
├── app.js           # Express app setup
└── server.js        # Server entry point
```

## 🔐 Environment Variables

See `.env.example` for required variables:

- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT tokens
- `TWILIO_*` or `MSG91_*`: OTP service credentials

## 📡 API Documentation

- Base URL: `http://localhost:5000/api/v1`
- Health Check: `GET /api/v1/health`

### Main Endpoints

- **Auth**: `/api/v1/auth/*`
- **Users**: `/api/v1/users/*`
- **Requests**: `/api/v1/requests/*`
- **Chats**: `/api/v1/chats/*`
- **Ratings**: `/api/v1/ratings/*`
- **Reports**: `/api/v1/reports/*`
- **Admin**: `/api/v1/admin/*`

See full API documentation in `/docs/api_design.md`

## 🧪 Testing

```bash
npm test
```

## 📦 Deployment

Recommended platforms:

- **Railway**: Easy deployment from GitHub
- **Render**: Free tier available
- **AWS EC2**: For production scale

## 🔒 Security Features

- JWT authentication
- OTP-based login
- Role-based access control
- Content moderation
- Rate limiting
- Input validation
- CORS protection

## 📝 License

MIT
