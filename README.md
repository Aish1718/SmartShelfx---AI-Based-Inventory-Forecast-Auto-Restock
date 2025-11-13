# 📦 SmartShelfX - AI-Based Inventory Management Platform

<div align="center">

![SmartShelfX Logo](https://via.placeholder.com/150x150?text=SmartShelfX)

**Intelligent Inventory Forecasting & Auto-Restock System**

[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.2.0-brightgreen.svg)](https://spring.io/projects/spring-boot)
[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-orange.svg)](https://www.mysql.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

</div>

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 Overview

SmartShelfX is a full-stack AI-powered inventory management platform designed to optimize stock levels through intelligent demand forecasting and automated restocking operations. Built with modern technologies, it provides real-time inventory tracking, predictive analytics, and seamless vendor management.

### Key Highlights

- **AI-Driven Forecasting**: Machine learning models predict future demand
- **Automated Restocking**: Smart purchase order generation
- **Real-Time Tracking**: Live inventory level monitoring
- **Role-Based Access**: Admin, Manager, and Vendor roles
- **CSV Import**: Bulk product data import
- **Analytics Dashboard**: Comprehensive reporting and insights

---

## ✨ Features

### 1. 🔐 User & Role Management
- JWT-based authentication and authorization
- Three user roles: Admin, Warehouse Manager, Vendor
- Secure login and registration
- Role-based dashboard navigation

### 2. 📦 Inventory Catalog & Product Management
- Complete CRUD operations for products
- Product details: SKU, category, vendor, reorder level, current stock
- Advanced search and filtering
- Batch import via CSV upload
- Category-based organization

### 3. 📊 Stock Transactions
- Record incoming shipments (Stock-IN)
- Track outgoing sales/dispatches (Stock-OUT)
- Transaction history with timestamps
- Automated real-time inventory updates
- Multi-user transaction handling

### 4. 🤖 AI-Based Demand Forecasting
- Historical data analysis
- Daily/Weekly demand predictions
- Stockout risk identification
- Python microservice with TensorFlow/Scikit-learn
- Visual forecast trends

### 5. 🛒 Auto-Restock & Purchase Orders
- AI-generated restock recommendations
- Automated purchase order creation
- Vendor approval workflow
- Email/SMS notifications
- PO status tracking (Pending, Approved, Dispatched, Delivered)

### 6. 🔔 Alerts & Notifications
- Low stock alerts
- Out-of-stock warnings
- Expiry alerts for perishable goods
- Forecast-based alerts
- Vendor response tracking
- Dismissible notification system

### 7. 📈 Analytics Dashboard & Reports
- Inventory trends visualization
- Monthly purchase/sales comparison
- Top restocked products
- Real-time KPI metrics
- Export reports as Excel/PDF
- Interactive charts with Chart.js

---

## 🛠️ Tech Stack

### Backend
- **Framework**: Java Spring Boot 3.2.0
- **Security**: Spring Security + JWT
- **Database**: MySQL 8.0
- **ORM**: Spring Data JPA (Hibernate)
- **Validation**: Hibernate Validator
- **Email**: JavaMail API
- **Build Tool**: Maven

### Frontend
- **Framework**: React 18.2
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Styling**: TailwindCSS 3.3
- **Charts**: Chart.js + React-Chartjs-2
- **Icons**: Lucide React
- **CSV Parsing**: PapaParse

### AI Service
- **Language**: Python 3.9+
- **Framework**: Flask / FastAPI
- **ML Libraries**: TensorFlow, Scikit-learn
- **Data Processing**: Pandas, NumPy

### DevOps
- **Containerization**: Docker
- **Database**: MySQL 8.0
- **Version Control**: Git

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Java Development Kit (JDK) 17+**
- **Maven 3.6+**
- **Node.js 16+ and npm**
- **MySQL 8.0+**
- **Python 3.9+** (for AI service)
- **Git**

---

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/smartshelfx.git
cd smartshelfx
```

### 2. Database Setup

```bash
# Login to MySQL
mysql -u root -p

# Create database
CREATE DATABASE smartshelfx;
CREATE USER 'smartshelfx_user'@'localhost' IDENTIFIED BY 'your_password';
GRANT ALL PRIVILEGES ON smartshelfx.* TO 'smartshelfx_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;

# Import schema
mysql -u root -p smartshelfx < database/schema.sql
```

### 3. Backend Setup

```bash
cd backend

# Update application.properties with your MySQL credentials
# src/main/resources/application.properties

# Build and run
mvn clean install
mvn spring-boot:run
```

Backend will start on: `http://localhost:8080`

### 4. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm start
```

Frontend will open at: `http://localhost:3000`

### 5. AI Service Setup (Optional - Batch 4)

```bash
cd ai-service

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run service
python app/main.py
```

AI Service will start on: `http://localhost:5000`

---

## 📁 Project Structure

```
SmartShelfX/
│
├── backend/                          # Spring Boot Backend
│   ├── src/main/java/com/smartshelfx/
│   │   ├── SmartShelfXApplication.java
│   │   ├── config/                   # Security, CORS, Database config
│   │   ├── controller/               # REST Controllers
│   │   ├── model/                    # JPA Entities
│   │   ├── repository/               # Data Access Layer
│   │   ├── service/                  # Business Logic
│   │   ├── security/                 # JWT, UserDetails
│   │   ├── dto/                      # Data Transfer Objects
│   │   └── exception/                # Error Handling
│   ├── src/main/resources/
│   │   └── application.properties    # Configuration
│   └── pom.xml                       # Maven dependencies
│
├── frontend/                         # React Frontend
│   ├── src/
│   │   ├── App.js                    # Main application
│   │   ├── components/               # React components
│   │   │   ├── auth/                 # Login, Register
│   │   │   ├── dashboard/            # Dashboard
│   │   │   ├── products/             # Product management
│   │   │   ├── transactions/         # Stock transactions
│   │   │   ├── forecast/             # AI forecasting
│   │   │   ├── purchase-orders/      # PO management
│   │   │   ├── alerts/               # Notifications
│   │   │   └── analytics/            # Reports
│   │   ├── services/                 # API services
│   │   ├── context/                  # React Context
│   │   └── utils/                    # Helper functions
│   ├── public/
│   └── package.json
│
├── ai-service/                       # Python Microservice
│   ├── app/
│   │   ├── main.py                   # Flask/FastAPI app
│   │   ├── models/                   # ML models
│   │   ├── services/                 # Forecast logic
│   │   └── routes/                   # API routes
│   └── requirements.txt
│
├── database/
│   ├── schema.sql                    # Database schema
│   └── seed-data.sql                 # Sample data
│
└── docs/
    ├── API_DOCUMENTATION.md
    └── USER_MANUAL.md
```

---

## 🔌 API Documentation

### Authentication Endpoints

#### POST `/api/auth/register`
Register a new user

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "MANAGER"
}
```

#### POST `/api/auth/login`
Authenticate user and get JWT token

**Request Body:**
```json
{
  "email": "admin@smartshelfx.com",
  "password": "admin123"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "type": "Bearer",
  "id": 1,
  "name": "System Administrator",
  "email": "admin@smartshelfx.com",
  "role": "ADMIN"
}
```

### Product Endpoints

#### GET `/api/products`
Get all products

#### POST `/api/products`
Create new product (Admin/Manager only)

#### PUT `/api/products/{id}`
Update product (Admin/Manager only)

#### DELETE `/api/products/{id}`
Delete product (Admin only)

#### POST `/api/products/import-csv`
Import products from CSV

### Transaction Endpoints

#### POST `/api/transactions/stock-in`
Record incoming shipment

#### POST `/api/transactions/stock-out`
Record outgoing dispatch

#### GET `/api/transactions/history`
Get transaction history

### Full API documentation available at: [API_DOCUMENTATION.md](docs/API_DOCUMENTATION.md)

---

## 📸 Screenshots

### Login Page
![Login](https://via.placeholder.com/800x450?text=Login+Page)

### Dashboard
![Dashboard](https://via.placeholder.com/800x450?text=Dashboard)

### Product Management
![Products](https://via.placeholder.com/800x450?text=Product+Management)

### Analytics
![Analytics](https://via.placeholder.com/800x450?text=Analytics+Dashboard)

---

## 🔑 Default Credentials

```
Admin:
Email: admin@smartshelfx.com
Password: admin123

Manager:
Email: manager@smartshelfx.com
Password: admin123

Vendor:
Email: vendor1@supplies.com
Password: admin123
```

---

## 🧪 Running Tests

### Backend Tests
```bash
cd backend
mvn test
```

### Frontend Tests
```bash
cd frontend
npm test
```

---

## 🐳 Docker Deployment

```bash
# Build and run all services
docker-compose up -d

# Stop services
docker-compose down
```

---

## 📝 Environment Variables

### Backend (.env)
```properties
DB_HOST=localhost
DB_PORT=3306
DB_NAME=smartshelfx
DB_USER=root
DB_PASSWORD=your_password
JWT_SECRET=your_jwt_secret
AI_SERVICE_URL=http://localhost:5000
```

### Frontend (.env)
```properties
REACT_APP_API_URL=http://localhost:8080/api
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👥 Authors

- **Your Name** - *Initial work* - [YourGitHub](https://github.com/yourusername)

---

## 🙏 Acknowledgments

- Spring Boot Documentation
- React Documentation
- TailwindCSS
- Chart.js
- Lucide Icons

---

## 📧 Contact

For questions or support, please contact:
- Email: support@smartshelfx.com
- GitHub Issues: [Create an issue](https://github.com/yourusername/smartshelfx/issues)

---

## 🗺️ Roadmap

- [x] User Authentication & Authorization
- [x] Product Management with CSV Import
- [ ] Stock Transaction Management
- [ ] AI-Based Demand Forecasting
- [ ] Automated Purchase Orders
- [ ] Alert System
- [ ] Analytics Dashboard
- [ ] Mobile App
- [ ] Multi-warehouse Support
- [ ] Barcode Scanning
- [ ] Real-time Notifications

---

<div align="center">

**⭐ Star this repository if you find it helpful!**

Made with ❤️ by the SmartShelfX Team

</div>