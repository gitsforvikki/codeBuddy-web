# CodeBuddy Web

**CodeBuddy** is a developer networking and collaboration platform that helps developers discover other developers, build professional connections, communicate in real time, and collaborate.

This repository contains the frontend application of CodeBuddy, built with **React** and **Vite**.

---

## 🚀 Tech Stack

*   **React 19** — UI development
*   **Vite** — Development and production build tooling
*   **Redux Toolkit** — Global state management
*   **React Router** — Client-side routing
*   **Tailwind CSS** — Responsive UI styling
*   **Axios** — API communication
*   **Socket.IO Client** — Real-time messaging
*   **React Hot Toast** — User notifications
*   **Razorpay** — Premium payment checkout

---

## ✨ Features

*   🔐 **User authentication**
*   👤 **Developer profiles**
*   🔎 **Developer discovery and feed**
*   🤝 **Connection requests**
*   💬 **Real-time one-to-one chat**
*   💎 **Premium membership**
*   💳 **Razorpay payment integration**
*   🔄 **Redux-based state management**
*   🛡️ **Protected routes**
*   🔔 **Real-time and toast notifications**
*   📱 **Responsive design**
*   ⚡ **Fast Vite development environment**

---

## 🏗️ Frontend Architecture

The application follows a modular structure where UI components, pages, state management, API services, and utilities are separated based on their responsibilities.

**The frontend is responsible for:**
*   Rendering the application UI
*   Managing client-side state
*   Handling navigation and protected routes
*   Communicating with backend APIs
*   Managing authentication state
*   Establishing real-time chat connections
*   Initiating the Razorpay checkout flow

> ⚠️ *Note: Sensitive operations such as authentication validation, authorization, payment verification, and database operations are handled by the backend.*

---

## 🔐 Authentication

Authentication is managed through the CodeBuddy backend. 

**The frontend:**
*   Maintains the authenticated user state using Redux
*   Checks authentication when the application starts
*   Protects authenticated routes
*   Sends credentials with API requests
*   Redirects unauthenticated users to the login page

*Note: Authentication tokens and sensitive credentials are not stored directly in frontend source code.*

---

## 💬 Real-Time Chat

CodeBuddy uses **Socket.IO** for real-time communication. The frontend establishes a socket connection with the backend and supports:
*   One-to-one messaging
*   Real-time message delivery
*   Chat state management
*   User-specific conversations

---

## 💎 Premium Membership

CodeBuddy provides a premium membership option using **Razorpay**.

**The frontend:**
1.  Requests payment/order details from the backend.
2.  Opens the Razorpay checkout.
3.  Handles the checkout response.
4.  Sends required payment information back to the backend for server-side verification.

*Note: Payment verification and membership activation are handled exclusively by the backend.*

---

## ⚙️ Environment Variables

Create a `.env` file in the project root:

```env
VITE_API_BASE_URL=http://localhost:3000
```

| Variable | Description |
| :--- | :--- |
| `VITE_API_BASE_URL` | Base URL of the CodeBuddy backend API |

*For production, replace the local backend URL with the deployed backend API URL.*

---

## 🛠️ Getting Started

### 1. Clone the repository
```bash
git clone <repository-url>
cd codebuddy-web
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables
Create a `.env` file:
```env
VITE_API_BASE_URL=http://localhost:3000
```
*Make sure the CodeBuddy backend is running and accessible at the configured URL.*

### 4. Start the development server
```bash
npm run dev
```

The application will be available at:
```text
http://localhost:5173
```

---

## 📦 Production Build

Create an optimized production build:
```bash
npm run build
```

Preview the production build locally:
```bash
npm run preview
```

---

## 📜 Available Scripts

```bash
npm run dev       # Start development server
npm run build     # Create production build
npm run preview   # Preview production build
npm run lint      # Run ESLint
```

---

## 🔗 Backend

The frontend communicates with the CodeBuddy backend for authentication, user management, connection requests, chat, and payments.

*   **Backend Repository:** [https://github.com/gitsforvikki/codeBuddy](https://github.com/gitsforvikki/codeBuddy)

---

## 🌐 Live Demo

*   **CodeBuddy:** [https://codebuddydev.vercel.app/](https://codebuddydev.vercel.app/)

---

## 📌 Related Repository
*   **Backend:** CodeBuddy

---

## 📄 License

This project is created for portfolio and demonstration purposes.
