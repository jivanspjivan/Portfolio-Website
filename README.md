# Jivan — Full-Stack Portfolio

A recruiter-focused, mobile-first portfolio with a React frontend and Node/Express backend.

## Project structure

```text
frontend/  React + Vite UI
backend/   Express API + Neon/PostgreSQL persistence
```

## Run locally

1. Copy `backend/.env.example` to `backend/.env` and add your Neon connection string.
2. Start the API:

   ```bash
   cd backend
   npm install
   npm run dev
   ```

3. In a second terminal, start the frontend:

   ```bash
   cd frontend
   npm install
   npm run dev
   ```

The frontend runs at `http://localhost:5173` and proxies `/api` requests to the backend at
`http://localhost:3001`.

## Database

The backend automatically creates the `visitors` and `contacts` tables on first start.
Visitor IP addresses are stored as one-way SHA-256 hashes by default. Set
`STORE_RAW_IP=true` only if you have a clear legal and privacy basis for retaining raw IP
addresses.

