# 🌞 OasisEnergy — Solar Energy Management Platform

OasisEnergy is a full-stack solar energy management platform built with the **MERN stack**. The application provides customers with access to solar products, energy system packages, installation services, maintenance support, and online ordering and payment functionality.

The project demonstrates practical experience in **React.js frontend development, REST API development, MongoDB database management, JWT authentication, role-based access control, and full-stack application architecture**.

---
## Live links

- **Live website:** https://oasisenergy.netlify.app/
- **Backend API:** https://oasisenergy-api.onrender.com
- **Frontend repository:** https://github.com/nasha861/oasis-energy-site
- **Backend repository:** https://github.com/nasha861/oasis-Backend
## 🚀 Project Overview
---

OasisEnergy provides a digital platform where customers can:

* Explore solar energy products
* View solar energy system packages
* Learn about installation and maintenance services
* Create an account and authenticate securely
* Add solar products to a shopping cart
* Place product orders
* Select a payment method
* Make payments through Paystack
* Interact with backend REST APIs

The frontend is built with **React.js and Vite** and communicates with a **Node.js/Express.js backend API** connected to **MongoDB**.

---

## ✨ Key Features

### 🔐 Authentication & Authorization

* User registration and login
* JWT-based authentication
* Protected routes
* Role-based access control
* User roles including Admin, Customer, and Technician

### ☀️ Solar Products

* Solar product listing
* Product information and technical specifications
* Product categories including:

  * Solar Panels
  * Inverters
  * Batteries
  * Racking

### 🛒 Shopping & Orders

* Product shopping interface
* Add products to cart
* Update product quantities
* Remove products from cart
* Checkout page
* Customer delivery information
* Order creation through REST APIs

### 💳 Payment Integration

* Paystack payment initialization
* Payment authorization
* Payment verification
* Payment status handling

### 🔧 Energy Services

* Solar installation management
* Maintenance management
* Customer management
* Technician management
* Solar system packages

### 📱 Frontend

* Responsive React interface
* React Router navigation
* Axios API integration
* Loading and error handling
* Reusable components
* Local shopping cart storage

---

## 🛠️ Technologies Used

### Frontend

* React.js
* JavaScript (ES6+)
* HTML5
* CSS3
* React Router
* Redux
* Axios
* Vite

### Backend

* Node.js
* Express.js
* RESTful APIs
* MVC architecture
* JWT Authentication
* Express Middleware
* Express Validator

### Database

* MongoDB
* Mongoose

### Payment

* Paystack

### Development Tools

* Git
* GitHub
* Visual Studio Code
* Postman
* npm

---

## 🏗️ Project Architecture

The project is separated into frontend and backend applications.

```text
OasisEnergy
│
├── oasis-react
│   ├── components
│   ├── pages
│   ├── services / API
│   ├── assets
│   ├── routing
│   └── Vite configuration
│
└── backend
    └── src
        ├── config
        ├── controllers
        ├── middleware
        ├── models
        ├── routes
        └── services
```

The backend follows an **MVC-style architecture**, separating models, controllers, routes, middleware, and services.

---

## 🔄 Application Flow

```text
React Frontend
       │
       │ Axios / HTTP Requests
       ▼
Express REST API
       │
       ├── Authentication & Authorization
       │
       ├── Controllers
       │
       ├── Services
       │
       ▼
MongoDB / Mongoose
       │
       ▼
   Application Data
```

For payments:

```text
React Checkout
      │
      ▼
Create Order
      │
      ▼
Express Payment API
      │
      ▼
Paystack
      │
      ▼
Payment Verification
      │
      ▼
Update Payment Status
```

---

## 🔑 Example API Areas

The backend provides REST API endpoints for areas such as:

* Authentication
* Users
* Solar products
* Orders
* Payments
* Customers
* Installations
* Maintenance
* Technicians
* System packages

API requests were tested during development using **Postman**.

---

## 📸 Project Screenshots

Screenshots can be added here to demonstrate the application interface.

Example:

```text
Frontend Home Page
Shop / Products
Shopping Cart
Checkout
Login / Registration
```

---

## 🎯 Learning & Development Goals

This project was developed to gain practical experience in:

* Full-stack MERN development
* Building RESTful APIs
* Connecting React applications to backend APIs
* MongoDB database design
* Mongoose relationships
* JWT authentication
* Role-based authorization
* API validation
* Payment gateway integration
* Postman API testing
* Git and GitHub version control
* Structuring applications using MVC principles

---

## 👨‍💻 Developer

**Aishat Raji**

## Run locally

Clone the repository:

```bash
git clone https://github.com/nasha861/oasis-energy-site.git
cd oasis-energy-site
```

Open the project's entry page in a browser or use the local development command specified by the repository if a build tool is configured. If the repository uses a package manager, install its dependencies according to its `package.json`.

---

## Related backend

The separately maintained OasisEnergy API handles backend functionality such as authentication, product management, installation and maintenance workflows, orders, and payment processing:

https://github.com/nasha861/oasis-Backend

The deployed API is available at:

https://oasisenergy-api.onrender.com

## Deployment

The live website is hosted on **Netlify**:

https://oasisenergy.netlify.app/

The backend is hosted separately on Render. For full-stack features to work in production, the frontend's API configuration must point to the deployed backend and the backend's CORS configuration must allow the production website origin.

## Project status

The website is published on Netlify. See the live site for the deployed experience and the repository source for the current implementation.
