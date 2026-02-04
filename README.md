# 🚚 Transportation Management System (TMS)

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3.3-blue)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.2.0-blue)](https://reactjs.org/)
[![GraphQL](https://img.shields.io/badge/GraphQL-16.8.1-e10098)](https://graphql.org/)

A production-ready, full-stack Transportation Management System built with modern web technologies. Features include real-time shipment tracking, authentication & authorization, advanced filtering, and a beautiful responsive UI.

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Live Demo](#-live-demo)
- [Screenshots](#-screenshots)
- [Architecture](#-architecture)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [API Documentation](#-api-documentation)
- [Authentication](#-authentication)
- [Deployment](#-deployment)
- [Testing](#-testing)
- [Contributing](#-contributing)
- [License](#-license)

## ✨ Features

### Core Functionality
- **Shipment Management**: Create, read, update, and delete shipments
- **Real-time Tracking**: Track shipments with detailed tracking history
- **Advanced Filtering**: Filter by status, carrier, shipper, and flagged items
- **Pagination**: Efficient data loading with customizable page sizes
- **Search**: Quick search across tracking numbers, carriers, and locations

### User Experience
- **Dual View Modes**: Switch between Grid and Tile views
- **Responsive Design**: Mobile-first, works on all devices
- **Toast Notifications**: Real-time feedback for all actions
- **Modal Details**: Expanded view for shipment details
- **Flag System**: Mark important shipments for quick access

### Security & Authentication
- **JWT Authentication**: Secure token-based authentication
- **Role-Based Access Control**: Admin and Employee roles
- **Protected Routes**: API endpoints secured with authorization
- **Password Hashing**: bcrypt for secure password storage

### Developer Experience
- **TypeScript**: Full type safety across the stack
- **GraphQL API**: Flexible, efficient data fetching
- **Apollo Client**: Advanced caching and state management
- **Comprehensive Testing**: >80% code coverage
- **ESLint & Prettier**: Code quality and consistency
- **Docker Support**: Containerized deployment ready

## 🛠 Tech Stack

### Frontend
- **Framework**: React 18.2 with TypeScript
- **Build Tool**: Vite 5.1
- **GraphQL Client**: Apollo Client 3.14
- **Styling**: CSS3 with CSS Variables
- **Icons**: React Icons 5.0
- **Notifications**: React Toastify 10.0
- **Testing**: Vitest + React Testing Library

### Backend
- **Runtime**: Node.js 18+
- **Framework**: Express.js 4.18
- **GraphQL Server**: Apollo Server 4.10
- **Authentication**: JWT (jsonwebtoken 9.0)
- **Password Hashing**: bcryptjs 3.0
- **Type Safety**: TypeScript 5.3
- **Testing**: Jest 29.7

### DevOps & Tooling
- **Version Control**: Git & GitHub
- **CI/CD**: GitHub Actions ready
- **Deployment**: Railway (Backend) + Railway (Frontend)
- **Process Manager**: PM2 (optional)
- **Container**: Docker & Docker Compose
- **Monitoring**: Health check endpoints

## 🌐 Live Demo

**Frontend Application**: [https://tms-frontend-production-1a65.up.railway.app](https://tms-frontend-production-1a65.up.railway.app)

**Backend GraphQL API**: [https://tms-backend-production-0566.up.railway.app/graphql](https://tms-backend-production-0566.up.railway.app/graphql)

### Demo Accounts

**Admin Account**:
- Email: `admin@tms.com`
- Password: `admin123`
- Permissions: Full access (Create, Read, Update, Delete)

**Employee Account**:
- Email: `employee@tms.com`
- Password: `employee123`
- Permissions: Read, Update, Flag (no Delete)

## 📸 Screenshots

### Login Screen
Beautiful authentication interface with form validation

### Dashboard - Tile View
Grid of shipment cards with quick actions (edit, flag, delete)

### Dashboard - Grid View
Tabular view with sortable columns and inline actions

### Shipment Details Modal
Comprehensive shipment information with tracking history timeline

### Filter Bar
Advanced filtering options for status, carrier, shipper, and flags

## 🏗 Architecture

### System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         Client Layer                         │
│  ┌──────────────────────────────────────────────────────┐   │
│  │   React App (Vite)                                    │   │
│  │   - Apollo Client (State Management & Caching)        │   │
│  │   - React Router (Navigation)                         │   │
│  │   - Components (Reusable UI)                          │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ HTTPS / GraphQL
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                        API Layer                             │
│  ┌──────────────────────────────────────────────────────┐   │
│  │   Apollo Server (Express)                             │   │
│  │   - GraphQL Schema & Resolvers                        │   │
│  │   - JWT Authentication Middleware                     │   │
│  │   - CORS Configuration                                │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      Business Logic Layer                    │
│  ┌──────────────────────────────────────────────────────┐   │
│  │   Services                                            │   │
│  │   - ShipmentService (CRUD, Search, Filter)            │   │
│  │   - AuthService (Register, Login, Verify)             │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                       Data Layer                             │
│  ┌──────────────────────────────────────────────────────┐   │
│  │   In-Memory Storage (Development)                     │   │
│  │   - Mock Shipments (50 records)                       │   │
│  │   - Users (Admin, Employee)                           │   │
│  │   → Ready for Database Integration                    │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

### Monorepo Structure

This project uses **npm workspaces** for monorepo management:

```
tms-app/
├── backend/          # Node.js GraphQL API
├── frontend/         # React SPA
└── package.json      # Root workspace configuration
```

Benefits:
- Shared dependencies
- Unified scripts
- Easy cross-package development
- Single `node_modules`

## 🚀 Getting Started

### Prerequisites

- **Node.js**: >= 18.0.0
- **npm**: >= 9.0.0
- **Git**: Latest version

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/ssaxena2609/tms-app.git
cd tms-app
```

2. **Install dependencies**
```bash
npm install
```

This will install dependencies for both backend and frontend workspaces.

3. **Configure environment variables**

**Backend** (`backend/.env`):
```env
PORT=4000
CORS_ORIGIN=http://localhost:5173
JWT_SECRET=your-super-secret-jwt-key-change-in-production
```

**Frontend** (`frontend/.env`):
```env
VITE_GRAPHQL_URI=http://localhost:4000/graphql
```

4. **Start development servers**
```bash
npm run dev
```

This starts both backend (port 4000) and frontend (port 5173) concurrently.

5. **Access the application**
- **Frontend**: http://localhost:5173
- **Backend GraphQL**: http://localhost:4000/graphql
- **Health Check**: http://localhost:4000/health

### Alternative: Individual Services

Start services separately:

```bash
# Backend only
npm run dev:backend

# Frontend only
npm run dev:frontend
```

## 📁 Project Structure

```
tms-app/
├── backend/
│   ├── src/
│   │   ├── data/
│   │   │   └── mockData.ts           # Mock shipment data generator
│   │   ├── resolvers/
│   │   │   ├── index.ts               # Main GraphQL resolvers
│   │   │   └── authResolvers.ts       # Authentication resolvers
│   │   ├── schema/
│   │   │   ├── typeDefs.ts            # Main GraphQL schema
│   │   │   └── authTypeDefs.ts        # Auth GraphQL schema
│   │   ├── services/
│   │   │   ├── shipmentService.ts     # Shipment business logic
│   │   │   └── authService.ts         # Authentication logic
│   │   ├── types/
│   │   │   ├── shipment.ts            # Shipment TypeScript types
│   │   │   └── auth.ts                # Auth TypeScript types
│   │   └── index.ts                   # Express & Apollo Server setup
│   ├── __tests__/                     # Backend tests
│   ├── .env                           # Environment variables
│   ├── .env.example                   # Environment template
│   ├── tsconfig.json                  # TypeScript config
│   ├── jest.config.js                 # Jest config
│   ├── railway.json                   # Railway deployment config
│   └── package.json                   # Backend dependencies
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Auth/
│   │   │   │   └── Auth.tsx           # Login/Register component
│   │   │   ├── FilterBar/
│   │   │   │   └── FilterBar.tsx      # Advanced filtering
│   │   │   ├── Header/
│   │   │   │   └── Header.tsx         # App header with nav
│   │   │   ├── Loading/
│   │   │   │   └── Loading.tsx        # Loading spinner
│   │   │   ├── Pagination/
│   │   │   │   └── Pagination.tsx     # Pagination controls
│   │   │   ├── ShipmentCard/
│   │   │   │   └── ShipmentCard.tsx   # Tile view card
│   │   │   ├── ShipmentDetails/
│   │   │   │   └── ShipmentDetails.tsx # Modal with details
│   │   │   └── ShipmentGrid/
│   │   │       └── ShipmentGrid.tsx   # Table grid view
│   │   ├── graphql/
│   │   │   ├── client.ts              # Apollo Client setup
│   │   │   └── queries.ts             # GraphQL queries/mutations
│   │   ├── types/
│   │   │   ├── shipment.ts            # Shipment types
│   │   │   └── auth.ts                # Auth types
│   │   ├── utils/
│   │   │   └── formatters.ts          # Utility functions
│   │   ├── __tests__/                 # Frontend tests
│   │   ├── App.tsx                    # Main app component
│   │   ├── App.css                    # App styles
│   │   ├── index.css                  # Global styles
│   │   ├── main.tsx                   # React entry point
│   │   └── vite-env.d.ts              # Vite type declarations
│   ├── public/                        # Static assets
│   ├── .env                           # Environment variables
│   ├── .env.example                   # Environment template
│   ├── index.html                     # HTML template
│   ├── tsconfig.json                  # TypeScript config
│   ├── vite.config.ts                 # Vite config
│   ├── vitest.config.ts               # Vitest config
│   ├── railway.json                   # Railway deployment config
│   └── package.json                   # Frontend dependencies
│
├── .github/
│   └── README.md                      # GitHub-specific docs
├── docs/                              # Additional documentation
│   ├── API_TESTING.md                 # API testing guide
│   ├── ARCHITECTURE.md                # Architecture details
│   ├── DEPLOYMENT.md                  # Deployment guide
│   └── SETUP.md                       # Setup instructions
├── .gitignore                         # Git ignore rules
├── LICENSE                            # MIT License
├── package.json                       # Root workspace config
└── README.md                          # This file
```

## 📚 API Documentation

### GraphQL API Endpoint

**Development**: `http://localhost:4000/graphql`
**Production**: `https://tms-backend-production-0566.up.railway.app/graphql`

### Authentication

All mutations (except `register` and `login`) require authentication via JWT token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

### Queries

#### Get All Shipments (with filters and pagination)
```graphql
query GetShipments($filter: ShipmentFilter, $pagination: PaginationInput) {
  shipments(filter: $filter, pagination: $pagination) {
    shipments {
      id
      trackingNumber
      status
      shipperName
      carrierName
      pickupLocation {
        city
        state
      }
      deliveryLocation {
        city
        state
      }
      estimatedDelivery
      flagged
    }
    totalCount
    totalPages
    currentPage
    hasNextPage
    hasPreviousPage
  }
}
```

**Variables:**
```json
{
  "filter": {
    "status": "IN_TRANSIT",
    "carrierName": "FedEx",
    "flagged": true
  },
  "pagination": {
    "page": 1,
    "limit": 12
  }
}
```

#### Get Single Shipment
```graphql
query GetShipment($id: ID!) {
  shipment(id: $id) {
    id
    trackingNumber
    status
    shipperName
    carrierName
    trackingData {
      timestamp
      location
      status
      notes
    }
    # ... all other fields
  }
}
```

#### Search Shipments
```graphql
query SearchShipments($searchTerm: String!) {
  searchShipments(searchTerm: $searchTerm) {
    id
    trackingNumber
    shipperName
    carrierName
  }
}
```

#### Get Current User
```graphql
query GetMe {
  me {
    id
    email
    name
    role
    createdAt
  }
}
```

### Mutations

#### Register User
```graphql
mutation Register($input: RegisterInput!) {
  register(input: $input) {
    token
    user {
      id
      email
      name
      role
    }
  }
}
```

**Variables:**
```json
{
  "input": {
    "email": "newuser@example.com",
    "password": "securePassword123",
    "name": "John Doe",
    "role": "EMPLOYEE"
  }
}
```

#### Login
```graphql
mutation Login($input: LoginInput!) {
  login(input: $input) {
    token
    user {
      id
      email
      name
      role
    }
  }
}
```

**Variables:**
```json
{
  "input": {
    "email": "admin@tms.com",
    "password": "admin123"
  }
}
```

#### Create Shipment
```graphql
mutation CreateShipment($input: ShipmentInput!) {
  createShipment(input: $input) {
    id
    trackingNumber
    status
  }
}
```

#### Update Shipment
```graphql
mutation UpdateShipment($input: UpdateShipmentInput!) {
  updateShipment(input: $input) {
    id
    status
    updatedAt
  }
}
```

#### Delete Shipment (Admin Only)
```graphql
mutation DeleteShipment($id: ID!) {
  deleteShipment(id: $id)
}
```

#### Toggle Flag
```graphql
mutation ToggleFlagShipment($id: ID!) {
  toggleFlagShipment(id: $id) {
    id
    flagged
  }
}
```

#### Add Tracking Data
```graphql
mutation AddTrackingData($id: ID!, $location: String!, $status: String!, $notes: String) {
  addTrackingData(id: $id, location: $location, status: $status, notes: $notes) {
    id
    trackingData {
      timestamp
      location
      status
      notes
    }
  }
}
```

### Types

**ShipmentStatus**: `PENDING`, `IN_TRANSIT`, `DELIVERED`, `CANCELLED`

**UserRole**: `ADMIN`, `EMPLOYEE`

For complete API documentation, visit the GraphQL Playground and explore the schema documentation.

## 🔐 Authentication

### How It Works

1. **User Registration/Login**
   - User submits credentials
   - Backend validates and returns JWT token
   - Frontend stores token in localStorage

2. **Authenticated Requests**
   - Apollo Client adds token to all requests via `authLink`
   - Backend verifies token in context
   - User info attached to request context

3. **Authorization**
   - Role-based access control (RBAC)
   - Admin: Full CRUD access
   - Employee: Read, Update, Flag (no Delete)

### JWT Token Structure

```json
{
  "userId": "uuid",
  "email": "user@example.com",
  "role": "ADMIN",
  "iat": 1234567890,
  "exp": 1234567890
}
```

Token expires in **7 days** by default.

### Security Best Practices

- Passwords hashed with bcrypt (10 rounds)
- JWT secret stored in environment variables
- CORS configured for specific origins
- HTTP-only cookies (optional enhancement)
- Token refresh strategy (future enhancement)

## 🚢 Deployment

### Railway Deployment (Recommended)

This project is configured for deployment on Railway with separate services for backend and frontend.

#### Quick Deploy

1. **Fork this repository** on GitHub

2. **Create Railway account** at [railway.app](https://railway.app)

3. **Deploy Backend**:
   - New Project → Deploy from GitHub
   - Select your forked repo
   - Root Directory: `backend`
   - Add environment variables:
     ```
     JWT_SECRET=your-production-secret-key
     CORS_ORIGIN=https://your-frontend-url.railway.app
     ```
   - Deploy

4. **Deploy Frontend**:
   - Add new service to project
   - Deploy from GitHub (same repo)
   - Root Directory: `frontend`
   - Add environment variable:
     ```
     VITE_GRAPHQL_URI=https://your-backend-url.railway.app/graphql
     ```
   - Deploy

5. **Update CORS**: Go back to backend and update `CORS_ORIGIN` with your actual frontend URL

### Alternative Deployments

**Vercel (Frontend)**:
```bash
npm install -g vercel
cd frontend
vercel
```

**Heroku (Backend)**:
```bash
heroku create tms-backend
git subtree push --prefix backend heroku main
```

**Docker**:
```bash
docker-compose up -d
```

See [DEPLOYMENT.md](./docs/DEPLOYMENT.md) for detailed deployment guides.

## 🧪 Testing

### Run All Tests

```bash
# Run all tests
npm test

# Backend tests only
npm run test:backend

# Frontend tests only
npm run test:frontend

# Watch mode
npm run test:watch

# Coverage report
npm run test:coverage
```

### Test Coverage

Target: **>80% coverage** across all modules

**Backend Coverage**:
- Services: >85%
- Resolvers: >80%
- Auth: >90%

**Frontend Coverage**:
- Components: >80%
- GraphQL: >85%
- Utils: >90%

### Testing Stack

**Backend**:
- Jest for unit/integration tests
- Supertest for API testing
- GraphQL testing utilities

**Frontend**:
- Vitest for unit tests
- React Testing Library for component tests
- MSW for API mocking

## 🤝 Contributing

We welcome contributions! Please follow these guidelines:

### Development Workflow

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes**
4. **Write/update tests**
5. **Ensure tests pass**: `npm test`
6. **Lint your code**: `npm run lint`
7. **Commit changes**: `git commit -m 'Add amazing feature'`
8. **Push to branch**: `git push origin feature/amazing-feature`
9. **Open a Pull Request**

### Code Standards

- **TypeScript**: All code must be typed
- **ESLint**: Follow configured rules
- **Testing**: Maintain >80% coverage
- **Documentation**: Update README for new features
- **Commits**: Use conventional commits format

### Pull Request Process

1. Update documentation if needed
2. Add tests for new functionality
3. Ensure CI/CD passes
4. Request review from maintainers
5. Address feedback
6. Merge after approval

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Apollo GraphQL team for excellent documentation
- React team for the amazing framework
- Railway for easy deployment
- All contributors and testers

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/ssaxena2609/tms-app/issues)
- **Discussions**: [GitHub Discussions](https://github.com/ssaxena2609/tms-app/discussions)
- **Email**: ssaxena2609@gmail.com

## 🗺 Roadmap

### Version 2.0 (Planned)
- [ ] Database integration (PostgreSQL/MongoDB)
- [ ] Real-time updates with GraphQL Subscriptions
- [ ] Email notifications
- [ ] Advanced analytics dashboard
- [ ] Export to PDF/CSV
- [ ] Multi-tenant support
- [ ] Mobile app (React Native)

### Version 1.5 (In Progress)
- [x] Production deployment
- [x] Authentication & Authorization
- [x] Comprehensive documentation
- [ ] Performance monitoring
- [ ] Error tracking (Sentry)
- [ ] Automated backups

---

<div align="center">

**Built with ❤️ by [Shashank Saxena](https://github.com/ssaxena2609)**

⭐ Star this repo if you find it helpful!

</div>
