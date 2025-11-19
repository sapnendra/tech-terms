# Tech Terms

A full-stack web application that serves as a community-driven platform for defining and sharing technology terms. Users can create, read, update, and interact with technology term definitions while building a comprehensive knowledge base.

## 🚀 Features

### User Features
- **User Authentication**: Secure registration and login system with JWT-based authentication
- **Create Posts**: Users can create detailed technology term definitions (minimum 100 characters)
- **Browse Terms**: View all technology terms with pagination (6 posts per page)
- **Search Functionality**: Search posts by title, content, or creator name
- **Like/Unlike Posts**: Interact with posts by liking them
- **Edit Posts**: Users can edit their own posts
- **Delete Posts**: Users can delete their own posts (admins can delete any post)
- **User Profile**: View and manage user profile information
- **Contact Form**: Submit contact form messages

### Admin Features
- **Admin Authentication**: Separate admin login system
- **Post Management**: Admins can delete any post
- **User Management**: Admin role-based access control

## 🛠️ Tech Stack

### Frontend
- **React 19.1.1** - UI library
- **React Router DOM 7.9.6** - Client-side routing
- **Vite 7.1.7** - Build tool and dev server
- **Tailwind CSS 4.1.17** - Utility-first CSS framework
- **Axios 1.13.2** - HTTP client
- **React Toastify 11.0.5** - Toast notifications
- **GSAP 3.13.0** - Animation library

### Backend
- **Node.js** - Runtime environment
- **Express 5.1.0** - Web framework
- **MongoDB** - Database (via Mongoose 8.19.1)
- **JWT (jsonwebtoken 9.0.2)** - Authentication
- **Bcryptjs 3.0.2** - Password hashing
- **Cloudinary 2.8.0** - Image upload and management
- **Multer 2.0.2** - File upload handling
- **Nodemailer 7.0.9** - Email functionality
- **Cookie Parser 1.4.7** - Cookie handling
- **CORS 2.8.5** - Cross-origin resource sharing

## 📁 Project Structure

```
Tech-Terms-Techlexicon/
├── backend/
│   ├── config/
│   │   ├── cloudinary.js      # Cloudinary configuration
│   │   └── db.js              # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js  # Authentication logic
│   │   ├── contactFormController.js  # Contact form handling
│   │   └── postController.js  # Post CRUD operations
│   ├── middlewares/
│   │   └── authMiddleware.js  # JWT authentication middleware
│   ├── models/
│   │   ├── contactFormModel.js  # Contact form schema
│   │   ├── postModel.js       # Post schema
│   │   └── userModel.js       # User schema
│   ├── routes/
│   │   ├── authRoutes.js      # Authentication routes
│   │   ├── contactFormRoute.js  # Contact form routes
│   │   └── postRoutes.js      # Post routes
│   ├── index.js               # Express server entry point
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── CreatePost.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Navbar.jsx
│   │   │   └── Register.jsx
│   │   ├── pages/
│   │   │   ├── About.jsx
│   │   │   ├── AuthSystem.jsx
│   │   │   ├── Contact.jsx
│   │   │   ├── Edit.jsx
│   │   │   ├── Guidelines.jsx
│   │   │   ├── Home.jsx
│   │   │   └── Profile.jsx
│   │   ├── apiInstance.js     # Axios configuration
│   │   ├── App.jsx            # Main app component
│   │   └── main.jsx           # React entry point
│   └── package.json
└── README.md
```

## 🔧 Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance like MongoDB Atlas)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory with the following variables:
```env
PORT=3000
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
ADMIN_EMAIL=your_admin_email
ADMIN_PASSWORD=your_admin_password
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
NODE_ENV=development
```

4. Start the backend server:
```bash
npm run server  # Development mode with nodemon
# or
npm start       # Production mode
```

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173` and the backend at `http://localhost:3000`.

## 📡 API Endpoints

### Authentication Routes (`/api/auth`)
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - User login
- `POST /api/auth/admin/login` - Admin login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/profile` - Get user profile (protected)
- `GET /api/auth/is-auth` - Check authentication status (protected)

### Post Routes (`/api/post`)
- `GET /api/post/all` - Get all posts
- `GET /api/post/:id` - Get a single post by ID
- `GET /api/post/user-posts` - Get current user's posts (protected)
- `POST /api/post/newpost` - Create a new post (protected)
- `PUT /api/post/edit/:id` - Edit a post (protected, owner only)
- `DELETE /api/post/delete/:id` - Delete a post (protected, owner or admin)
- `GET /api/post/like/:_id` - Like/unlike a post (protected)

### Contact Form Routes (`/api/contact`)
- `POST /api/contact` - Submit contact form

## 🔐 Authentication

The application uses JWT (JSON Web Tokens) for authentication. Tokens are stored in HTTP-only cookies for security. Protected routes require a valid JWT token.

### User Roles
- **User**: Can create, edit, and delete their own posts
- **Admin**: Can delete any post and has additional administrative privileges

## 🎨 Features in Detail

### Post Management
- Posts require a title and content (minimum 100 characters)
- Each post is associated with the creator
- Posts support likes from authenticated users
- Posts are sorted by date (newest first)
- Duplicate titles are prevented

### Search & Pagination
- Real-time search across post titles, content, and creator names
- Pagination with 6 posts per page
- Search results are automatically paginated

### User Interface
- Modern, responsive design with Tailwind CSS
- Dark theme optimized for readability
- Toast notifications for user feedback
- Loading states and error handling
- Smooth animations with GSAP

## 🚦 Running the Application

1. **Start MongoDB** (if running locally):
```bash
mongod
```

2. **Start Backend Server**:
```bash
cd backend
npm run server
```

3. **Start Frontend Development Server**:
```bash
cd frontend
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 📝 Environment Variables

Make sure to set up all required environment variables in the backend `.env` file:

| Variable | Description |
|----------|-------------|
| `PORT` | Server port (default: 3000) |
| `MONGO_URL` | MongoDB connection string |
| `JWT_SECRET` | Secret key for JWT token signing |
| `ADMIN_EMAIL` | Admin email for admin login |
| `ADMIN_PASSWORD` | Admin password for admin login |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret |
| `NODE_ENV` | Environment (development/production) |

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

ISC

## 👤 Author

**Sapnendra Jaiswal**

---

Built with ❤️ using React and Node.js
