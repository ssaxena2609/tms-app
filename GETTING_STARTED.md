# 🚀 Getting Started with TMS Application

Welcome! This guide will help you get the Transportation Management System up and running in minutes.

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Quick Start](#quick-start)
3. [First Steps](#first-steps)
4. [Exploring Features](#exploring-features)
5. [Common Commands](#common-commands)
6. [Troubleshooting](#troubleshooting)
7. [Next Steps](#next-steps)

---

## Prerequisites

Before you begin, ensure you have:

- ✅ **Node.js** version 18 or higher
- ✅ **npm** version 9 or higher
- ✅ Terminal/Command line access
- ✅ Code editor (VS Code recommended)
- ✅ Modern web browser (Chrome, Firefox, Safari, Edge)

### Check Your Versions

```bash
node -v   # Should be v18.0.0 or higher
npm -v    # Should be 9.0.0 or higher
```

### Install Node.js (if needed)

Visit [nodejs.org](https://nodejs.org) and download the LTS version.

---

## Quick Start

### Option 1: Automated Setup (Recommended) ⚡

```bash
# Navigate to project directory
cd /Users/sasaxena/Desktop/test

# Run setup script (installs everything)
./setup.sh

# Start the application
npm run dev
```

**That's it!** The application will open automatically in your browser.

### Option 2: Manual Setup 🛠️

```bash
# Navigate to project directory
cd /Users/sasaxena/Desktop/test

# Install root dependencies
npm install

# Install backend dependencies
cd backend
npm install
cd ..

# Install frontend dependencies
cd frontend
npm install
cd ..

# Start the application
npm run dev
```

---

## First Steps

### 1. Application Should Be Running

After running `npm run dev`, you should see:

```
✓ Backend ready at http://localhost:4000/graphql
✓ Frontend ready at http://localhost:5173
```

### 2. Open in Browser

The frontend should open automatically at: **http://localhost:5173**

If not, manually open your browser and navigate to that URL.

### 3. Verify Backend

Open a new tab and visit: **http://localhost:4000/graphql**

You should see the GraphQL Playground interface.

### 4. Check Health

Visit: **http://localhost:4000/health**

You should see: `{"status":"OK","timestamp":"..."}`

---

## Exploring Features

### 🎨 Visual Tour

1. **Main Screen**
   - See 12 shipment cards displayed
   - Notice the header with logo and view toggles
   - See the hamburger menu icon (≡) on the left

2. **Try the Hamburger Menu**
   - Click the menu icon (≡)
   - See the side panel slide in
   - Click menu items to see sub-menus
   - Click outside or press ESC to close

3. **Switch Views**
   - Click "Grid View" button
   - See shipments in table format
   - Click "Tile View" to return to cards

4. **Apply Filters**
   - Click the "Filters" button
   - Select a status (e.g., "In Transit")
   - See results update immediately
   - Try different filter combinations

5. **View Shipment Details**
   - Click any shipment card
   - See detailed modal with full information
   - Scroll to see tracking history
   - Press ESC or click X to close

6. **Flag a Shipment**
   - Click the flag icon (🚩) on any card
   - See toast notification
   - Notice the flag becomes filled/unfilled

7. **Delete a Shipment**
   - Click the trash icon (🗑️)
   - Confirm the deletion
   - See toast notification
   - Notice shipment is removed

8. **Navigate Pages**
   - Scroll to bottom
   - Click page numbers or Next/Previous
   - See new shipments load

---

## Common Commands

### Development

```bash
# Start both frontend and backend
npm run dev

# Start backend only
npm run dev:backend

# Start frontend only
npm run dev:frontend
```

### Testing

```bash
# Run all tests
npm test

# Backend tests with coverage
cd backend && npm test -- --coverage

# Frontend tests with coverage
cd frontend && npm run test:coverage

# Watch mode (auto-rerun on changes)
cd backend && npm test -- --watch
```

### Building

```bash
# Build everything
npm run build

# Build backend only
npm run build:backend

# Build frontend only
npm run build:frontend
```

### Linting

```bash
# Check backend code
cd backend && npm run lint

# Fix backend issues
cd backend && npm run lint:fix

# Check frontend code
cd frontend && npm run lint

# Fix frontend issues
cd frontend && npm run lint:fix
```

---

## Troubleshooting

### Problem: Port Already in Use

**Error**: `EADDRINUSE: address already in use :::4000`

**Solution**:
```bash
# Find process using port 4000
lsof -ti:4000

# Kill the process
kill -9 <PID>

# Or change the port in backend/.env
PORT=4001
```

### Problem: Dependencies Not Found

**Error**: `Cannot find module 'xxx'`

**Solution**:
```bash
# Clean install everything
rm -rf node_modules backend/node_modules frontend/node_modules
npm install
cd backend && npm install && cd ..
cd frontend && npm install && cd ..
```

### Problem: GraphQL Connection Error

**Error**: Frontend can't connect to backend

**Solution**:
1. Ensure backend is running: `http://localhost:4000/health`
2. Check `frontend/.env`:
   ```
   VITE_GRAPHQL_URI=http://localhost:4000/graphql
   ```
3. Check `backend/.env`:
   ```
   CORS_ORIGIN=http://localhost:5173
   ```

### Problem: Build Fails

**Error**: TypeScript compilation errors

**Solution**:
```bash
# Ensure you have latest TypeScript
npm install -g typescript

# Check TypeScript version
tsc -v

# Clean and rebuild
cd backend
rm -rf dist
npm run build

cd ../frontend
rm -rf dist
npm run build
```

### Problem: Tests Fail

**Error**: Test suite failures

**Solution**:
```bash
# Update test snapshots
npm test -- -u

# Run tests in verbose mode
npm test -- --verbose

# Check specific test file
npm test -- shipmentService.test.ts
```

---

## Next Steps

### 1. Explore the Code

- **Frontend**: Start with `frontend/src/App.tsx`
- **Backend**: Start with `backend/src/index.ts`
- **Types**: Check `backend/src/types/shipment.ts`

### 2. Try GraphQL Queries

Open http://localhost:4000/graphql and try:

```graphql
query {
  shipments(pagination: { page: 1, limit: 5 }) {
    shipments {
      id
      trackingNumber
      status
    }
    totalCount
  }
}
```

### 3. Read Documentation

- 📚 **README.md** - Complete project documentation
- 🔧 **SETUP.md** - Detailed setup guide
- 🧪 **API_TESTING.md** - GraphQL query examples
- 🚀 **DEPLOYMENT.md** - Production deployment
- 🏗️ **ARCHITECTURE.md** - System design
- 🎨 **VISUAL_SHOWCASE.md** - UI features
- 📝 **PROJECT_SUMMARY.md** - Complete overview

### 4. Customize

- Change colors in `frontend/src/index.css`
- Modify mock data in `backend/src/data/mockData.ts`
- Add new fields to the schema
- Create new components

### 5. Add Database

Follow the instructions in DEPLOYMENT.md to:
- Set up PostgreSQL or MongoDB
- Update service layer
- Add migrations
- Update resolvers

### 6. Implement Authentication

- Add JWT token generation
- Create login/register pages
- Protect routes
- Add user context

---

## 🎓 Learning Resources

### Understanding the Code

1. **React Concepts Used**:
   - Hooks (useState, useEffect)
   - Apollo Client hooks (useQuery, useMutation)
   - Component composition
   - Props and state management

2. **GraphQL Concepts**:
   - Queries vs Mutations
   - Type definitions
   - Resolvers
   - Pagination
   - Filtering

3. **TypeScript Features**:
   - Interfaces and Types
   - Type inference
   - Generic types
   - Union types

### Project Structure

```
Key Files to Understand:
├── frontend/src/App.tsx          # Main app component
├── frontend/src/graphql/queries.ts   # GraphQL queries
├── backend/src/schema/typeDefs.ts    # GraphQL schema
├── backend/src/services/shipmentService.ts  # Business logic
└── backend/src/resolvers/index.ts    # Query/Mutation handlers
```

---

## 💡 Pro Tips

### Development

1. **Hot Reload**: Save any file to see changes instantly
2. **Console Logs**: Check browser console for errors
3. **Network Tab**: See GraphQL requests in DevTools
4. **React DevTools**: Install browser extension for debugging

### Testing

1. **Write Tests First**: Follow TDD approach
2. **Test Coverage**: Aim for >80%
3. **Mock Data**: Use realistic test data
4. **Edge Cases**: Test error scenarios

### Code Quality

1. **TypeScript**: Let types guide you
2. **Linting**: Run before committing
3. **Formatting**: Use Prettier (via ESLint)
4. **Comments**: Document complex logic

### Performance

1. **React.memo**: Prevent unnecessary re-renders
2. **Apollo Cache**: Utilize built-in caching
3. **Pagination**: Load data in chunks
4. **Code Splitting**: Split large bundles

---

## 📞 Getting Help

### Documentation

- Start with **README.md** for overview
- Check **SETUP.md** for installation issues
- See **API_TESTING.md** for GraphQL examples
- Review **TROUBLESHOOTING** section above

### Debugging

1. **Check Terminal**: Look for error messages
2. **Check Browser Console**: See frontend errors
3. **Check Network Tab**: See API requests
4. **Check GraphQL Playground**: Test queries directly

### Common Questions

**Q: How do I add a new field to shipments?**
A: Update the type definition in both `frontend/src/types/shipment.ts` and `backend/src/types/shipment.ts`, then update the GraphQL schema in `backend/src/schema/typeDefs.ts`.

**Q: How do I change the port?**
A: Edit `backend/.env` for backend port and `frontend/vite.config.ts` for frontend port.

**Q: How do I add authentication?**
A: Follow the authentication guide in DEPLOYMENT.md for implementing JWT-based auth.

**Q: Can I use a different database?**
A: Yes! The service layer is abstracted, so you can easily swap the in-memory store for any database.

---

## ✅ Verification Checklist

Before you start development, verify:

- [ ] Backend server running at http://localhost:4000
- [ ] Frontend app running at http://localhost:5173
- [ ] GraphQL Playground accessible
- [ ] Health check returns OK
- [ ] Can see shipments in UI
- [ ] Filters work correctly
- [ ] Modal opens when clicking shipment
- [ ] Tests pass successfully

---

## 🎉 You're Ready!

Congratulations! You now have a fully functional Transportation Management System running locally.

### What You Have:

✅ Modern React frontend with beautiful UI
✅ GraphQL API backend with full functionality
✅ 50 mock shipments with realistic data
✅ Complete CRUD operations
✅ Filtering and pagination
✅ Comprehensive test suites
✅ Production-ready code architecture

### Start Building:

1. Explore the existing features
2. Try modifying the code
3. Add new features
4. Write tests for your changes
5. Deploy to production when ready

---

**Happy Coding! 🚀**

Need more help? Check the other documentation files or explore the well-commented code!
