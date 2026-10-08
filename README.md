# Competitor Coffee Shop

A plain HTML/CSS/JavaScript competitor coffee-shop website with a Node.js/Express backend. It integrates with the existing Dynamic Pricing backend by forwarding competitor price changes to `POST /api/competitor`.

## Architecture

```text
Competitor Frontend (HTML/CSS/JS)
            |
            v
Competitor Backend (Node/Express)
            |
            | POST /api/competitor
            v
Existing Dynamic Pricing Backend
            |
            v
MongoDB -> Pricing Watcher -> ML Service -> Customer Price
```

## Local setup

### Backend

```bash
cd backend
cp .env.example .env
npm install
npm start
```

### Frontend

In a second terminal:

```bash
cd frontend
python3 -m http.server 5500
```

Open `http://localhost:5500`.

## Environment variables

```env
PORT=5000
EXISTING_DYNAMIC_PRICING_API_URL=https://dynamic-pricing-backend-gidh.onrender.com
FRONTEND_URL=http://localhost:5500
```

No MongoDB credentials are required for this competitor application.

## API

`GET /api/health`

`GET /api/coffees`

`POST /api/coffees/:name/price`

Example:

```json
{
  "price": 190
}
```

The backend forwards the exact existing contract:

```json
{
  "name": "cappicinu",
  "price": 190
}
```

to:

`POST https://dynamic-pricing-backend-gidh.onrender.com/api/competitor`

## Important compatibility note

The coffee identifier `cappicinu` is intentionally kept exactly as required by the existing Dynamic Pricing system. Do not rename it to `cappuccino`.

## Deployment

### Render backend

- Root Directory: `backend`
- Build Command: `npm install`
- Start Command: `node server.js`

Set the environment variables from `.env.example` in Render.

### Static frontend

The `frontend` directory is a plain static website. It can be deployed to Vercel or another static host. If deployed publicly, update the frontend JavaScript `API` constant to point to the deployed competitor backend URL.
