# Zynetic Backend

This is the backend for the Zynetic application, built with Node.js and MongoDB.

## Prerequisites

- Node.js (v16 or higher)
- npm (v8 or higher)
- MongoDB (Atlas or local instance)

## Setup Instructions

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd Zynetic/backend/product-management-api
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure the environment:

   - Create a `.env` file in the root directory based on `.env.example`.
   - Set the following variables:
     ```
     MONGODB_URI=<your_mongodb_connection_string>
     JWT_SECRET=<your_jwt_secret>
     PORT=5000
     ```

4. Run the development server:

   ```bash
   npm run dev
   ```

5. Deploy to Vercel:

   ```bash
   npm run deploy
   ```

## Features

- User authentication (signup, login, logout)
- Product management (create, read, update, delete)
- Product rating system
- Admin and user roles

## Environment Variables

- `MONGODB_URI`: MongoDB connection string (required).
- `JWT_SECRET`: Secret key for JWT authentication (required).
- `PORT`: Port number for the server (default: 5000).

## Database Setup

- If using MongoDB Atlas, ensure your IP address is whitelisted in the Atlas dashboard.
- If using a local MongoDB instance, ensure MongoDB is running and accessible.

## Testing

Run the tests using:

```bash
npm test
```

## Troubleshooting

- If the server fails to start, ensure MongoDB is running and the `MONGODB_URI` is correct.
- If authentication fails, verify the `JWT_SECRET` matches the one used in the frontend.

## License

This project is licensed under the MIT License.
