# Shopping Hub - Premium MERN E-commerce

A fully functional, enterprise-quality E-commerce application built with the MERN stack (MongoDB, Express, React, Node.js).

## 🚀 Features

### User Side

- **Authentication**: Secure JWT-based registration and login.
- **Product Browsing**: Clean card-based UI with search, categories, and smooth animations.
- **Cart Management**: Add/remove products, manage quantities, and localStorage persistence.
- **Wishlist**: Save favorite products for later with dedicated wishlist page and persistence.
- **Checkout Flow**: Multi-step process (Shipping -> Payment -> Place Order).
- **Order History**: Personalized profile with full purchase records and real-time statuses.
- **Responsive Design**: Mobile-first approach using Tailwind CSS.

### Admin Panel

- **Analytics Dashboard**: Overview of sales, orders, users, and products.
- **Inventory Management**: CRUD operations for products.
- **User Management**: Control over user accounts and permissions.
- **Order Tracking**: Monitor and update order fulfillment statuses.

## 🛠️ Tech Stack

- **Frontend**: React, Vite, Redux Toolkit, Framer Motion, Tailwind CSS v4, Lucide Icons.
- **Backend**: Node.js, Express, Mongoose, JWT, BcryptJS.
- **Database**: MongoDB.

## 📂 Project Structure

```
Shopping Hub/
├── client/           # React Frontend
│   ├── src/
│   │   ├── app/      # Redux Store
│   │   ├── features/ # Redux Slices
│   │   ├── components/
│   │   └── pages/
├── server/           # Node.js Backend
│   ├── config/       # Database connection
│   ├── models/       # Mongoose Schemas
│   ├── routes/       # API Endpoints
│   └── controllers/  # Business Logic
```

## ⚙️ Setup Instructions

### Prerequisites

- Node.js installed
- MongoDB installed locally or a MongoDB Atlas URI

### 1. Backend Setup

1. Navigate to `/server`
2. Run `npm install`
3. Create a `.env` file (copied from `.env.example` if available, or use the provided values):
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   NODE_ENV=development
   ```
4. **Seed the database**: Run `npm run data:import` to populate sample products and an admin user.
5. Start server: `npm run dev`

### 2. Frontend Setup

1. Navigate to `/client`
2. Run `npm install`
3. Create a `.env` file:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```
4. Start development server: `npm run dev`

### 3. Demo Credentials

- **Admin**: `admin@example.com` / `password123`
- **User**: `john@example.com` / `password123`

## 👨‍💻 Author

Built with ❤️ by Sakthi
