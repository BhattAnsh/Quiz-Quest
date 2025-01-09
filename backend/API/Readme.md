# Quiz Quest Backend API Documentation

This is the backend for the Quiz Quest application. The API handles user authentication (signup, login, logout) and serves as the foundation for the application's features.

---

## Prerequisites

- Node.js installed
- MongoDB instance running locally or remotely
- Postman for API testing

---

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd quiz-quest-backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add the following:
   ```env
   NODE_ENV=development
   PORT=5000
   MONGO_URI=<your-mongo-db-uri>
   JWT_SECRET=<your-jwt-secret>
   ```

4. Start the server:
   ```bash
   npm start
   ```

---

## API Endpoints

### Base URL

```
http://localhost:8000
```

---

### 1. Signup

**Endpoint:** `/auth/signup`

**Method:** `POST`

**Description:** Registers a new user.

#### Request Body:
```json
{
  "username": "string",
  "name": "string",
  "email": "string",
  "password": "string"
}
```

#### Response:
- **201 Created:**
  ```json
  {
    "message": "User registered successfully"
  }
  ```
- **400 Bad Request:**
  ```json
  {
    "message": "Email already exists"
  }
  ```
- **500 Internal Server Error:**
  ```json
  {
    "message": "Server error",
    "error": "error details"
  }
  ```

#### Example (Postman):
1. Select `POST` method and URL `http://localhost:5000/auth/signup`
2. Go to the **Body** tab, select `raw`, and set type to `JSON`.
3. Enter:
   ```json
   {
     "username": "john_doe",
     "name": "John Doe",
     "email": "john@example.com",
     "password": "password123"
   }
   ```
4. Click **Send**.

---

### 2. Login

**Endpoint:** `/auth/login`

**Method:** `POST`

**Description:** Logs in an existing user and returns a JWT token in a cookie.

#### Request Body:
```json
{
  "email": "string",
  "password": "string"
}
```

#### Response:
- **200 OK:**
  ```json
  {
    "message": "Login successful"
  }
  ```
- **400 Bad Request:**
  ```json
  {
    "message": "Invalid credentials"
  }
  ```
- **500 Internal Server Error:**
  ```json
  {
    "message": "Server error",
    "error": "error details"
  }
  ```

#### Example (Postman):
1. Select `POST` method and URL `http://localhost:5000/auth/login`
2. Go to the **Body** tab, select `raw`, and set type to `JSON`.
3. Enter:
   ```json
   {
     "email": "john@example.com",
     "password": "password123"
   }
   ```
4. Click **Send**.

---

### 3. Logout

**Endpoint:** `/auth/logout`

**Method:** `GET`

**Description:** Logs out the user by clearing the token cookie.

#### Response:
- **200 OK:**
  ```json
  {
    "message": "Logout successful"
  }
  ```

#### Example (Postman):
1. Select `GET` method and URL `http://localhost:5000/auth/logout`
2. Click **Send**.

---

### Test Route

**Endpoint:** `/`

**Method:** `GET`

**Description:** A simple test route to confirm the backend is running.

#### Response:
- **200 OK:**
  ```
  Quiz Quest Backend is running!
  ```

---

## Running Tests

Use Postman to test each endpoint. Ensure you:

1. Set the appropriate request method (GET, POST).
2. Include required request bodies for `signup` and `login` endpoints.
3. Observe response cookies for the token on successful login.

---

## Notes

- Replace `<your-mongo-db-uri>` and `<your-jwt-secret>` with actual values.
- Use `process.env.NODE_ENV` to set the environment (`development`, `production`).
- In production, ensure `secure` cookies and HTTPS are enabled.

---

## Troubleshooting

If you encounter issues:

1. Ensure MongoDB is running and the `MONGO_URI` is correct.
2. Check the `.env` file for missing or incorrect values.
3. Review the server logs for detailed error messages.
