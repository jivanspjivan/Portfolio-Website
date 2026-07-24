# Jivan Paratpure — Full-Stack Portfolio

A recruiter-focused, mobile-first portfolio showcasing backend engineering, AI-powered
applications, event-driven systems, and full-stack product development.

The project uses a React frontend and a separate Node.js/Express backend backed by Neon
PostgreSQL.

## Features

### Frontend

- Responsive mobile, tablet, and laptop layouts
- Recruiter-focused hero, credibility metrics, and resume download
- Active-section navigation with scroll-aware desktop and mobile behavior
- Three real projects with screenshots, live demos, repositories, and engineering highlights
- Responsive YouTube demo modal for the Guised Up project
- Professional experience timeline with company logos
- Backend, frontend, and product-development skill cards
- Contact form with validation, loading, error, and success states
- Accessible success notification toast
- Desktop hover interactions and scroll entrance animations

### Backend

- Express REST API
- Neon PostgreSQL persistence using the `pg` driver
- Automatic table creation during startup
- Contact-form validation with Zod
- Visitor device, browser, operating-system, referrer, and screen detection
- Approximate city and coordinate lookup with hosting-header fallback
- SHA-256 visitor IP hashing
- Optional raw IP storage
- Helmet security headers
- CORS protection
- Global and contact-specific rate limiting
- Centralized API error handling

## Technology stack

| Layer | Technologies |
| --- | --- |
| Frontend | React 19, Vite, JavaScript, Lucide React, CSS |
| Backend | Node.js, Express, Zod, Helmet |
| Database | Neon PostgreSQL, `pg` |
| Analytics | UA Parser, edge geolocation headers |

## Project structure

```text
Portfolio/
├── frontend/
│   ├── public/
│   │   ├── companies/
│   │   ├── projects/
│   │   └── Jivan_Paratpure.pdf
│   ├── src/
│   │   ├── components/
│   │   ├── data/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── styles.css
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── backend/
│   ├── src/
│   │   ├── db.js
│   │   └── server.js
│   ├── .env.example
│   └── package.json
└── README.md
```

## Prerequisites

- Node.js 20 or newer
- npm
- A Neon PostgreSQL project

## Environment configuration

Create `backend/.env`:

```env
PORT=3001
NODE_ENV=development

DATABASE_URL=postgresql://username:password@hostname/database?sslmode=require
FRONTEND_URL=http://localhost:5173

IP_HASH_SALT=replace-with-a-long-random-secret
STORE_RAW_IP=false

ADMIN_API_KEY=replace-with-another-long-random-secret
```

Generate secrets with:

```bash
openssl rand -hex 32
```

Run the command separately for `IP_HASH_SALT` and `ADMIN_API_KEY`.

`ADMIN_API_KEY` is reserved for future protected visitor/contact retrieval endpoints and is
not currently consumed by the API.

Never commit `backend/.env`.

Create `frontend/.env` when the frontend and backend run on different origins:

```env
VITE_API_URL=http://localhost:3001
```

For production, set this to the deployed backend origin:

```env
VITE_API_URL=https://your-backend-service.onrender.com
```

Vite environment variables are included at build time. After changing `VITE_API_URL` on a
hosting provider, rebuild and redeploy the frontend.

## Local development

### 1. Start the backend

```bash
cd backend
npm install
npm run dev
```

The API runs at:

```text
http://localhost:3001
```

### 2. Start the frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

The frontend runs at:

```text
http://localhost:5173
```

Vite proxies frontend `/api` requests to `http://localhost:3001`.

## Production build

Build the frontend:

```bash
cd frontend
npm run build
```

Preview the production frontend locally:

```bash
npm run preview
```

Start the backend in production mode:

```bash
cd backend
NODE_ENV=production npm start
```

Set `FRONTEND_URL` to the deployed frontend origin before starting the production backend.

## API endpoints

### Health check

```http
GET /api/health
```

Response:

```json
{
  "status": "ok"
}
```

### Record a visit

```http
POST /api/visit
Content-Type: application/json
```

Example body:

```json
{
  "path": "/",
  "referrer": "https://www.linkedin.com/",
  "screen": "1920x1080"
}
```

The backend adds IP, device, browser, operating-system, location, and timestamp information.

### Submit the contact form

```http
POST /api/contact
Content-Type: application/json
```

Example body:

```json
{
  "name": "Recruiter Name",
  "email": "recruiter@company.com",
  "company": "Company Name",
  "message": "I would like to discuss a backend engineering opportunity."
}
```

## Database

The backend creates two tables when it starts.

### `visitors`

Stores:

- Hashed IP address
- Optional raw IP address
- Country, region, city, latitude, and longitude
- Device type, browser, and operating system
- Page, referrer, and screen size
- Visit timestamp

### `contacts`

Stores:

- Name
- Email
- Company
- Message
- Hashed IP address
- Submission timestamp

The table creation statements use `CREATE TABLE IF NOT EXISTS`, so restarting the server does
not duplicate the tables.

## Request flow

### Visitor analytics

```text
Portfolio opened
      ↓
Frontend sends POST /api/visit once per browser session
      ↓
Backend parses device and edge location information
      ↓
Visitor IP is hashed
      ↓
Visit is stored in Neon PostgreSQL
```

### Contact form

```text
Visitor submits the form
      ↓
Frontend sends POST /api/contact
      ↓
Backend rate-limits and validates the request
      ↓
Message is stored in Neon PostgreSQL
      ↓
Frontend displays the success state and toast
```

## Privacy and security

- Raw visitor IP addresses are disabled by default.
- IP addresses are hashed with a private salt.
- Request bodies are limited to 20 KB.
- Contact submissions are rate-limited to eight requests per hour per client.
- API requests receive security headers through Helmet.
- CORS permits the configured frontend origin only.
- Contact fields are validated before database insertion.

Keep `STORE_RAW_IP=false` unless raw IP retention is necessary and covered by an appropriate
privacy policy.

## Geolocation behavior

The API first reads geolocation metadata supplied by supported hosting providers:

- Vercel `x-vercel-ip-*` headers
- Cloudflare `cf-ipcountry`

When these headers do not contain city and coordinate data, the backend performs a server-side
lookup through `ipwho.is`. The lookup:

- Runs only for valid public IP addresses
- Has a two-second timeout
- Does not block visitor insertion when it fails
- Preserves any location values already supplied by the hosting provider
- Falls back to `null` values when no location is available

Local and private IP addresses are not sent to the provider, so location fields normally remain
empty during local development.

## Troubleshooting

### `vite: not found`

Install frontend dependencies:

```bash
cd frontend
npm install
```

### `DATABASE_URL is not configured`

Create `backend/.env` and add the Neon connection string.

### `Database initialization failed` or `ETIMEDOUT`

The process cannot reach Neon. Check:

- Internet connection
- VPN or proxy restrictions
- Firewall access to PostgreSQL port `5432`
- Whether the Neon project is active
- Whether `DATABASE_URL` is the latest pooled connection string from Neon

The same table definitions are available in `backend/src/db.js` and may also be run through
the Neon SQL Editor.

### Contact form returns a server error

Confirm:

- Backend is running on port `3001`
- Neon is reachable
- Both tables exist
- `FRONTEND_URL` matches the frontend origin

## Current limitations

- Protected APIs for reading visitors and contacts are not implemented yet.
- Contact submissions are stored in Neon but do not currently send email notifications.
- Location detail depends on deployment-provider headers.

## Author

Jivan Paratpure

- [GitHub](https://github.com/jivanspjivan)
- [LinkedIn](https://www.linkedin.com/in/jivanparatpure/)
- [LeetCode](https://leetcode.com/u/jivanthegreat/)
- Email: [jivanparatpure2002@gmail.com](mailto:jivanparatpure2002@gmail.com)
