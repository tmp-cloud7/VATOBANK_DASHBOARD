💳 VatoBank Dashboard — React Frontend

A responsive and modern banking dashboard interface built with React and Tailwind CSS.
The VatoBank Dashboard serves as the frontend for the VatoBank E-Banking system, providing authenticated users with real-time access to their account details, transactions, and other key features.

This project was later integrated into the main VatoBank Frontend, forming the core user interface of the application.

🧠 Overview

The VatoBank Dashboard is designed to deliver a clean, dynamic, and responsive banking experience.
It connects to a Laravel RESTful backend API, fetching real-time financial data including:

Account summaries

Transaction history

Transfer operations

User authentication

This project demonstrates strong understanding of:

React component design

State management

API integration

Tailwind UI styling

Secure token-based user sessions

⚙️ Core Features

🔐 Authentication & Authorization

Login and registration integrated with backend JWT tokens

Access control for authenticated pages only

Persistent user sessions using sessionStorage

💼 User Dashboard

Displays real-time account balances and transaction summaries

Clean and structured UI with responsive grid layouts

Dynamic components for deposits, transfers, and withdrawals

💸 Transaction Management

Users can initiate transfers, deposits, and withdrawals

API-connected forms for backend transaction operations

Real-time updates after each transaction

🧾 Reusable UI Components

Modular structure with reusable React components

Each page built with consistent styles and interactions

🎨 Tailwind CSS Styling

Fully styled with Tailwind CSS for fast, modern design

Utility-first classes ensure responsiveness and scalability

Custom styles defined in tailwind.config.js

🔗 Backend Integration

Axios-based API layer for communication with VatoBank Laravel Backend

Centralized API logic in /src/api for maintainability

Secure token passing with Bearer authorization header

🛠️ Tech Stack

Layer	Technology

Frontend Framework	React (CRA)

Styling	Tailwind CSS

API Client	Axios

Routing	React Router

State Management	useState / Context API

Build Tool	PostCSS

Environment Config	.env for backend URL

📁 Project Structure

VATOBANK_DASHBOARD/

│

├── public/                     # Static assets

├── src/

│   ├── Assets/                 # Images, icons, and logos

│   ├── api/                    # Axios setup and backend API calls

│   ├── component/              # Reusable UI components (Header, Sidebar, etc.)

│   ├── features/               # Functional modules (transactions, balances)

│   ├── helper/register/        # Form handling utilities

│   ├── pages/                  # Dashboard pages (Home, Profile, Transactions)

│   ├── App.js                  # Root component

│   ├── index.js                # React entry point

│   ├── style.js                # Shared styled components

│   ├── App.css / index.css     # Global styles

│

├── .env                        # Backend API URL

├── tailwind.config.js          # Tailwind customization

├── postcss.config.js           # PostCSS setup

├── package.json

└── README.md


🧰 Installation & Setup

1️⃣ Clone the Repository
git clone https://github.com/tmp-cloud7/VATOBANK_DASHBOARD.git

cd VATOBANK_DASHBOARD

2️⃣ Install Dependencies

npm install

3️⃣ Set up Environment Variables

Create a .env file in the root directory and add your backend API URL:

REACT_APP_VATOBANK_SERVER_API_URL=https://vatobank-app-api.onrender.com/api

4️⃣ Start Development Server

npm start


app will run on http://localhost:3000

🔐 API Integration (Example)

📦 Axios Setup — /src/api/api.js

import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_VATOBANK_SERVER_API_URL,
  headers: { Accept: 'application/json' },
});

axiosInstance.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('access_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default axiosInstance;

🎨 UI Highlights

Clean and minimalist interface with Tailwind styling

Sidebar and top navigation for easy user flow

Responsive layouts optimized for desktop and mobile

Modern gradients and accent colors consistent with VatoBank branding

🚀 Integration with VatoBank Frontend

This Dashboard project was merged into the main VatoBank Frontend as its authenticated user interface.
It powers:

The post-login experience

All banking operations (deposit, transfer, withdrawal)

API-driven dashboards and reports

📚 Objectives 

During this project, the goals were to:

Understand frontend-backend API interaction

Implement secure user sessions using JWT

Apply Tailwind CSS for rapid, responsive UI development

Manage component-based React applications

Integrate and deploy production-ready frontend builds

🏁 Conclusion

The VatoBank Dashboard is a scalable and efficient frontend designed to complement a Laravel banking API.
It demonstrates real-world frontend engineering skills, including API integration, modular architecture, and responsive design principles — a solid foundation for modern fintech or data-driven dashboards.
