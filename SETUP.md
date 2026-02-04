# Quick Start Guide

## Prerequisites
- Node.js >= 18.0.0
- npm >= 9.0.0

## Installation Steps

### 1. Install Dependencies
```bash
# Install root dependencies
npm install

# Install backend dependencies
cd backend && npm install && cd ..

# Install frontend dependencies
cd frontend && npm install && cd ..
```

### 2. Start the Application

#### Option A: Run Both (Recommended for Development)
```bash
npm run dev
```

This will start:
- Backend on http://localhost:4000/graphql
- Frontend on http://localhost:5173

#### Option B: Run Separately

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

### 3. Access the Application

- **Frontend UI**: http://localhost:5173
- **GraphQL Playground**: http://localhost:4000/graphql
- **Health Check**: http://localhost:4000/health

## Testing

### Run All Tests
```bash
# Backend tests
cd backend && npm test

# Frontend tests
cd frontend && npm test

# With coverage
cd backend && npm test -- --coverage
cd frontend && npm run test:coverage
```

## Features to Try

1. **View Switching**: Toggle between Grid and Tile views
2. **Hamburger Menu**: Click the menu icon to see navigation
3. **Filtering**: Use the Filter button to filter shipments
4. **Pagination**: Navigate through pages of shipments
5. **Details View**: Click any shipment card to see full details
6. **Flag Shipments**: Use the flag button to mark important shipments
7. **Delete**: Remove shipments (with confirmation)
8. **Edit**: Click edit button (UI placeholder for now)

## Common Issues

### Port Already in Use
If port 4000 or 5173 is already in use:

**Backend:**
```bash
# Edit backend/.env
PORT=4001
```

**Frontend:**
```bash
# Edit frontend/.env
VITE_GRAPHQL_URI=http://localhost:4001/graphql

# Edit frontend/vite.config.ts
server: {
  port: 5174
}
```

### Dependencies Not Found
```bash
# Clear node_modules and reinstall
rm -rf node_modules backend/node_modules frontend/node_modules
npm install
cd backend && npm install && cd ..
cd frontend && npm install && cd ..
```

### GraphQL Connection Error
1. Ensure backend is running
2. Check VITE_GRAPHQL_URI in frontend/.env
3. Check CORS_ORIGIN in backend/.env

## Production Build

```bash
# Build backend
cd backend
npm run build
npm start

# Build frontend
cd frontend
npm run build
npm run preview
```

## Project Structure Overview

```
tms-app/
├── backend/              # GraphQL API Server
│   ├── src/
│   │   ├── data/        # Mock data generator
│   │   ├── resolvers/   # GraphQL resolvers
│   │   ├── schema/      # GraphQL type definitions
│   │   ├── services/    # Business logic
│   │   └── types/       # TypeScript interfaces
│   └── package.json
├── frontend/            # React Application
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── graphql/     # GraphQL queries & Apollo client
│   │   ├── types/       # TypeScript interfaces
│   │   └── utils/       # Helper functions
│   └── package.json
└── README.md
```

## Key Technologies

- **Frontend**: React 18, TypeScript, Apollo Client, Vite
- **Backend**: Node.js, Apollo Server, GraphQL, TypeScript
- **Testing**: Jest (backend), Vitest (frontend)
- **Styling**: Pure CSS with CSS Variables

## Next Steps

1. Explore the GraphQL schema at http://localhost:4000/graphql
2. Try different filters and views in the UI
3. Check the detailed README.md for API documentation
4. Run tests to see comprehensive coverage
5. Customize the theme in frontend/src/index.css

## Need Help?

- Check README.md for detailed documentation
- Review test files for usage examples
- Inspect GraphQL schema for available queries/mutations
- Check browser console for any errors

---

Happy coding! 🚀
