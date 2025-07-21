# MERN Auth System with Reset Password

This is a full-stack authentication system built with the **MERN stack** (MongoDB, Express, React, Node.js). It allows users to sign up, log in, verify their email, reset their password, and manage sessions securely with cookies.

## 🌐 Features

- ✅ User registration with email & password
- ✅ Email verification (via token)
- ✅ Login system with secure cookie authentication
- ✅ Password reset functionality with email
- ✅ Frontend form validations and error messages
- ✅ Fully responsive UI using Tailwind CSS

---

## 🧩 Tech Stack

### 🚀 Frontend

- React.js
- Tailwind CSS
- Axios
- React Router DOM
- React Hot Toast (for notifications)

### 🔧 Backend

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for secure token-based auth
- Nodemailer (for email verification & password reset)
- dotenv (for environment variables)

---

## 🖼️ Screenshots

### 1. Login Page  
![Login](https://github.com/Shoaib4343/MERN_PROJECTS/blob/ec1074235a1536952dd23abca4044c5690924ddd/Advance-Mern-Auth/Screenshot%202025-07-21%20112929.png)

### 2. Sign Up Page  
![Sign Up]([./screenshots/signup.png](https://github.com/Shoaib4343/MERN_PROJECTS/blob/d448f3fc00fd6eec34d8a9481eb918c1b859fbcc/Advance-Mern-Auth/Screenshot%202025-07-21%20110426.png))

### 3. Reset Password  
![Reset Password](https://github.com/Shoaib4343/MERN_PROJECTS/blob/ec1074235a1536952dd23abca4044c5690924ddd/Advance-Mern-Auth/Screenshot%202025-07-21%20111543.png)


### 3. Reset Password  OTP
![Reset Password](https://github.com/Shoaib4343/MERN_PROJECTS/blob/ec1074235a1536952dd23abca4044c5690924ddd/Advance-Mern-Auth/Screenshot%202025-07-21%20111605.png)


### 4. New Password Form  
![New Password](https://github.com/Shoaib4343/MERN_PROJECTS/blob/ec1074235a1536952dd23abca4044c5690924ddd/Advance-Mern-Auth/Screenshot%202025-07-21%20111625.png)

---

## ⚙️ How to Run the Project

### 1. Clone the Repository

```bash
git clone https://[github.com/your-username/your-project.git](https://github.com/Shoaib4343/MERN_PROJECTS/tree/ec1074235a1536952dd23abca4044c5690924ddd/Advance-Mern-Auth)
cd Advance-Mern-Auth


``` Setup Backend
cd backend
npm install


```Create a .env file and add:PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password_or_app_password


npm start


```Setup Frontend
cd frontend
npm install
npm run dev


```Folder Structure
/backend
  |__ models/
  |__ routes/
  |__ controllers/
  |__ config/
  |__ .env
  |__ server.js

/frontend
  |__ src/
       |__ components/
       |__ pages/
       |__ assets/
       |__ App.js
       |__ index.js


