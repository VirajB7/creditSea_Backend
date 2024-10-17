This is the repository for CreditSea Backend Assignment 

# CreditSea
This application is a loan management system built with TypeScript and Node.js. The application allows users to apply for loans, while verifiers can assess and manage these applications. The system implements role-based access control to ensure that only authorized users can perform specific actions.

## Features

- User authentication and authorization using JWT.
- Role-based access control for users, verifiers, and admins.
- Create, read, update, and delete loan applications.
- Health check endpoint to monitor the server status.
- Error handling and validation for user inputs.

## Technologies Used

- Node.js
- Express.js
- TypeScript
- MongoDB
- Mongoose
- JSON Web Tokens (JWT)
- bcrypt.js for password hashing

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/username/CreditSea.git

2. Navigate to the project directory:

   ```bash
   cd CreditSea
   
3. Install the dependencies

   ```bash
   npm install
   
4. Create a .env file in the root directory and add the following environment variables:

   ```bash
   JWT_SECRET=your_jwt_secret
   MONGO_URI=your_mongodb_connection_string
   PORT=your_desired_port

5. Start the development server

     ```bash
     npm run dev

6. Usage
  Start the server:

   ```bash
      npm start

## API Endpoints
### Authentication

- Login
   -  POST /api/auth/login
   - Request Body:
 ```json
{
  "email": "user@example.com",
  "password": "your_password"
}
```

- Register User:
     - POST /api/auth/register
     - Request Body:
```json

{
  "email": "user@example.com",
  "password": "your_password",
  "role": "user" // or "admin"
}
```

- Loan Management
   - Create Loan: POST /api/loans
   - Request Body:
```json
{
  "fullName": "John Doe",
  "loanAmount": 5000,
  "loanTenure": 12,
  "employementStatus": "employed",
  "employementAddress1": "123 Main St",
  "employementAddress2": "Apt 4B",
  "reason": "Home renovation",
  "termsAccepted": true,
  "creditInfoDisclosure": true
}
```

   - Get Loans: GET /api/loans

### Testing
You can test the API endpoints using tools like Postman or Curl. Make sure to include the JWT token in the Authorization header for protected routes.


### Acknowledgements
- Express.js
- TypeScript
- MongoDB
- Mongoose
- JSON Web Tokens
- bcrypt.js

   
