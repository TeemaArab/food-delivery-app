# Food Delivery App

This is a full-stack food delivery web application that allows users to browse food items, add products to the cart, place orders, make payments using Stripe, and track order activity. The project also includes an admin panel for managing food items and monitoring customer orders.

## Project Overview

This project was built as a full-stack MERN application to simulate the core functionality of a modern food ordering platform. It focuses on the connection between the frontend and backend, API integration, cart and order management, authentication, image upload, and payment flow.

The application includes:

* A **customer-facing frontend** for browsing and ordering food
* An **admin panel** for managing food items and viewing orders
* A **Node.js/Express backend** for APIs and business logic
* A **MongoDB database** for storing users, food items, and orders
* **Stripe integration** for payment handling

---

## Main Features

### Customer Side

* Browse available food items
* Filter food by category
* Add and remove items from the cart
* Store cart data for each user
* Register and log in securely
* Place orders with delivery address
* Proceed to payment using Stripe
* View placed orders

### Admin Side

* Add new food items
* Upload food images
* View all customer orders
* Update order status
* Manage food list

---

## Tech Stack

### Frontend

* React
* Vite
* React Router
* Axios
* CSS
* React Toastify

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* Multer
* Cloudinary (image hosting)
* Stripe
* bcrypt
* validator
* dotenv
* cors

---

## Project Structure

```
FOOD_DELIVERY/
├── admin/
│ ├── public/
│ ├── src/
│ │ ├── assets/
│ │ ├── components/
│ │ │ ├── Navbar/
│ │ │ └── Sidebar/
│ │ ├── pages/
│ │ │ ├── Add/
│ │ │ ├── List/
│ │ │ └── Orders/
│ │ ├── App.jsx
│ │ ├── index.css
│ │ └── main.jsx
│ ├── index.html
│ ├── package.json
│ └── vite.config.js
│
├── frontend/
│ ├── public/
│ ├── src/
│ │ ├── assets/
│ │ ├── components/
│ │ │ ├── AppDownload/
│ │ │ ├── ExploreMenu/
│ │ │ ├── FoodDisplay/
│ │ │ ├── FoodItem/
│ │ │ ├── Footer/
│ │ │ ├── Header/
│ │ │ ├── LoginPopup/
│ │ │ └── Navbar/
│ │ ├── context/
│ │ │ └── StoreContext.jsx
│ │ ├── pages/
│ │ │ ├── Cart/
│ │ │ ├── Home/
│ │ │ ├── MyOrders/
│ │ │ ├── PlaceOrder/
│ │ │ └── VerifyPayment/
│ │ ├── App.css
│ │ ├── App.jsx
│ │ ├── index.css
│ │ └── main.jsx
│ ├── index.html
│ ├── package.json
│ └── vite.config.js
│
├── backend/
│ ├── config/
│ │ ├── cloudinary.js
│ │ └── db.js
│ ├── controllers/
│ │ ├── cartController.js
│ │ ├── foodController.js
│ │ ├── orderController.js
│ │ └── userController.js
│ ├── middleware/
│ │ └── auth.js
│ ├── models/
│ │ ├── foodModel.js
│ │ ├── orderModel.js
│ │ └── userModel.js
│ ├── routes/
│ │ ├── cartRoute.js
│ │ ├── foodRoute.js
│ │ ├── orderRoute.js
│ │ └── userRoute.js
│ ├── uploads/
│ ├── .env
│ ├── package.json
│ └── server.js
│
└── README.md
```

---

## System Design Summary

### Frontend

The frontend is responsible for the user interface and customer interaction. Users can browse food items, manage their cart, register or log in, and place orders.

### Admin Panel

The admin panel is a separate React application used to manage food items and view order information.

### Backend

The backend handles all API requests, authentication, database operations, image uploads, and payment session creation.

### Database

MongoDB stores:

* User information
* Food items
* Orders
* Cart data linked to users

---

## Core Functionalities

### 1. Authentication

Users can register and log in. Passwords are hashed before being saved in the database. JWT is used to authenticate protected routes.

### 2. Food Management

Admin users can add food items with name, description, category, price, and image. Images are uploaded using Multer and stored in the `uploads` folder.

### 3. Cart Management

Users can add items to the cart, remove items, and view the total cost. Cart data is stored in the backend per user so it can be retrieved again.

### 4. Order Placement

When a user places an order:

* Order data is saved in the database
* User cart is cleared
* Stripe checkout session is created
* User is redirected to payment

### 5. Order Tracking

Orders can be viewed in the frontend by the user and in the admin panel by the admin.

### 6. Payment Integration

Stripe is used to process payments in test mode. The backend creates a checkout session and redirects the user to Stripe.

---

## Database Models

### User Model

Typical fields:

* `name`
* `email`
* `password`
* `cartData`

### Food Model

Typical fields:

* `name`
* `description`
* `price`
* `image`
* `category`

### Order Model

Typical fields:

* `userId`
* `items`
* `amount`
* `address`
* `status`
* `payment`
* `date`

---

## API Routes

### Food Routes

Base path:

```bash
/api/food
```

Endpoints:

* `POST /add` → Add a new food item
* `GET /list` → Get all food items
* `POST /remove` → Remove a food item

### User Routes

Base path:

```bash
/api/user
```

Endpoints:

* `POST /register` → Register a new user
* `POST /login` → Log in user

### Cart Routes

Base path:

```bash
/api/cart
```

Endpoints:

* `POST /add` → Add item to cart
* `POST /remove` → Remove item from cart
* `POST /get` → Get cart data for user

### Order Routes

Base path:

```bash
/api/order
```

Endpoints:

* `POST /place` → Place a new order and create Stripe session
* `POST /verify` → Verify payment result
* `GET /userorders` → Get orders for a specific user
* `GET /list` → Get all orders for admin
* `POST /status` → Update order status

---

## Environment Variables

Create a `.env` file inside the backend folder.

Example:

```env


MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
FRONTEND_URL=http://localhost:5174
CLOUDINARY_NAME=name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_SECRET=your_api_secret
```

For the frontend, if used:

```env
VITE_API_URL=http://localhost:4000
```

---

## Installation and Setup

### 1. Clone the repository

```bash
git clone <repository-url>
cd food_delivery
```

### 2. Install backend dependencies

```bash
cd backend
npm install
```

### 3. Install frontend dependencies

```bash
cd ../frontend
npm install
```

### 4. Install admin dependencies

```bash
cd ../admin
npm install
```

### 5. Run backend

```bash
cd ../backend
npm run server
```

### 6. Run frontend

```bash
cd ../frontend
npm run dev
```

### 7. Run admin panel

```bash
cd ../admin
npm run dev
```

---

## Running the Application

After starting all parts of the project:

* Frontend runs on: `http://localhost:5173`
* Admin panel runs on its Vite port, often: `http://localhost:5174`
* Backend runs on: `http://localhost:4000`

* After Deployment, backend runs on:`https://food-delivery-app-iw1b.onrender.com`

---

## Sample Application Flow

### Customer Flow

1. User opens the frontend
2. User browses food items
3. User adds items to cart
4. User logs in or registers
5. User proceeds to checkout
6. User enters delivery details
7. User is redirected to Stripe payment
8. Order is saved and payment is verified

### Admin Flow

1. Admin opens admin panel
2. Admin adds food items with images
3. Admin checks the list of orders
4. Admin updates order status

---

## Important Backend Logic

### Image Uploads

Food images are uploaded using **Multer** and then stored in **Cloudinary**.  Previously, images were stored locally in the backend `uploads` folder.  
The project was updated to use **Cloudinary cloud storage** so images can be accessed globally and the backend does not need to store image files locally.



### Authentication Middleware

Protected routes use JWT middleware. The token is verified and the user ID is attached to the request body for use in controllers.

### Cart Persistence

Cart data is stored in the user document in MongoDB, making it possible to retrieve the cart again from the backend.

---

## Testing Notes

This project was tested by:

* Running frontend, backend, and admin locally
* Using the browser for UI testing
* Using MongoDB to confirm saved data
* Testing APIs through frontend integration and backend logs
* Testing API endpoints with Postman
* Verifying payment flow using Stripe test mode

---

## Challenges Solved During Development

Some practical issues handled during the project included:

* Fixing cart refresh issues where frontend state disappeared after page reload
* Debugging token handling between localStorage, context, and backend middleware
* Debugging payment flow when payment status was not updating correctly
* Handling route and redirect issues after checkout

These problems helped improve the connection between frontend state, backend APIs, and database updates.

---

## Possible Future Improvements

* Add real admin login, authentication and authorization
* Add order cancellation feature
* Add search and sorting for food items
* Add user profile page
* Add email notifications after order placement
* Add responsive design improvements
* Add mobile app


---

## Learning Outcomes

This project helped strengthen knowledge in:

* React state management
* Context API
* API integration with Axios
* Express route and controller structure
* MongoDB and Mongoose
* Authentication with JWT
* File upload with Multer
* Stripe payment integration
* Debugging full-stack application issues

---


