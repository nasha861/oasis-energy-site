# OasisEnergy — Solar Energy Management Platform

OasisEnergy is a full-stack solar energy management platform built with the MERN stack. It enables customers to explore solar products and system packages, request installation and maintenance services, place orders, and make online payments.

The project demonstrates practical experience in React.js development, REST API integration, MongoDB, JWT authentication, role-based access control, payment gateway integration, and full-stack application architecture.

## Live Links

- **Live Website:** https://oasisenergy.netlify.app/
- **Backend API:** https://oasisenergy-api.onrender.com
- **Frontend Repository:** https://github.com/nasha861/oasis-energy-site
- **Backend Repository:** https://github.com/nasha861/oasis-Backend

## Project Overview

OasisEnergy connects customers with solar energy products and services through a web-based platform. The application includes customer-facing shopping and service workflows alongside dedicated administrator and technician dashboards.

### Key Features

#### Authentication and Authorization
- User registration and login
- JWT-based authentication
- Protected frontend routes
- Role-based access for administrators, customers, and technicians

#### Solar Products and Packages
- Browse solar products and their technical specifications
- Explore solar panels, inverters, batteries, and racking products
- Manage solar product listings through administrative functionality
- Access solar energy system packages

#### Shopping and Orders
- Add products to a shopping cart
- Update product quantities and remove items
- Enter customer and delivery information during checkout
- Create and track customer orders

#### Payment Integration
- Paystack payment initialization
- Payment authorization and verification
- Payment status handling through the backend

#### Installation and Maintenance
- Installation and quotation workflows
- Customer maintenance requests
- Administrator management of service requests
- Technician assignment and job progress tracking

#### Role-Based Dashboards
- **Administrator:** Manage users, technicians, products, quotations, and service requests.
- **Customer:** Browse products, place orders, and manage personal service requests.
- **Technician:** View assigned installation and maintenance jobs and update permitted job statuses.

## Technology Stack

### Frontend
- React.js
- JavaScript (ES6+)
- HTML5 and CSS3
- React Router
- Axios
- Vite

### Backend
- Node.js
- Express.js
- RESTful APIs
- MVC-oriented architecture
- JWT authentication
- Express middleware and request validation

### Database
- MongoDB
- Mongoose

### Payments
- Paystack

### Development Tools
- Git and GitHub
- Visual Studio Code
- Postman
- npm

## Application Architecture

The application is divided into two independently maintained repositories.

```text
OasisEnergy
├── Frontend: oasis-energy-site
│   ├── React components
│   ├── Pages
│   ├── API integration
│   ├── Routing
│   ├── Assets
│   └── Vite configuration
│
└── Backend: oasis-Backend
    └── src/
        ├── controllers/
        ├── middleware/
        ├── models/
        ├── routes/
        └── server.js
```

The frontend communicates with the backend through HTTP requests. The Express API handles business logic, authentication, authorization, database operations, and payment verification. MongoDB stores application data through Mongoose models.

### Application Flow

```text
React Frontend
      |
      | HTTP Requests
      v
Express REST API
      |
      ├── Authentication and Authorization
      ├── Route Handlers and Controllers
      ├── Business Logic
      └── Database Operations
                |
                v
         MongoDB / Mongoose
```

### Payment Flow

```text
Customer Checkout
       |
       v
Backend Payment Initialization
       |
       v
Paystack Payment
       |
       v
Backend Payment Verification
       |
       v
Order and Payment Status Update
```

## Backend API

The backend provides REST API functionality for the following areas:

- Authentication and user profiles
- Customers and technicians
- Solar products and system packages
- Orders and payments
- Installations and maintenance
- Quotations and service management

API requests were tested during development using Postman. See the [backend repository](https://github.com/nasha861/oasis-Backend) for the server implementation.

## Getting Started

### Prerequisites

- Node.js and npm
- Git
- Access to the OasisEnergy backend, either locally or through the deployed API

### 1. Clone the repository

```bash
git clone https://github.com/nasha861/oasis-energy-site.git
cd oasis-energy-site
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure the API

The deployed backend API is available at:

```text
https://oasisenergy-api.onrender.com/api
```

Ensure the frontend API client in `src/api/api.js` points to the correct backend URL. If the project uses environment variables for API configuration, use the variable name defined by the existing application.

### 4. Start the development server

```bash
npm run dev
```

Open the local URL displayed by Vite in your terminal.

### 5. Build for production

```bash
npm run build
```

## Deployment

The frontend is deployed on **Netlify**:

https://oasisenergy.netlify.app/

The backend is deployed separately on **Render**:

https://oasisenergy-api.onrender.com

For production functionality, the frontend must use the deployed API URL, and the backend must allow requests from the production frontend origin through its CORS configuration.

## Security

- Protected pages use authentication and role-based route checks.
- The backend enforces authorization for protected API operations.
- Payment secret keys must remain on the backend and must never be exposed in frontend code.
- Environment files and credentials should not be committed to version control.

## Learning and Development

This project provided practical experience in:

- Full-stack MERN application development
- React component design and routing
- REST API integration
- MongoDB data modeling with Mongoose
- Authentication and role-based authorization
- Request validation and error handling
- Payment gateway integration
- API testing with Postman
- Git and GitHub version control
- Deploying a frontend and backend separately

## Developer

**Aishat Raji**

- GitHub: https://github.com/nasha861
- Live Project: https://oasisenergy.netlify.app/

## Related Repository

The backend repository contains the API, database models, controllers, middleware, authentication, and payment processing:

https://github.com/nasha861/oasis-Backend
