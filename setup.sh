#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}================================${NC}"
echo -e "${GREEN}TMS Application Setup Script${NC}"
echo -e "${GREEN}================================${NC}"
echo ""

# Check Node.js version
echo -e "${YELLOW}Checking Node.js version...${NC}"
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)

if [ "$NODE_VERSION" -lt 18 ]; then
    echo -e "${RED}Error: Node.js 18 or higher is required${NC}"
    echo -e "${RED}Current version: $(node -v)${NC}"
    exit 1
else
    echo -e "${GREEN}✓ Node.js version: $(node -v)${NC}"
fi

# Check npm version
echo -e "${YELLOW}Checking npm version...${NC}"
NPM_VERSION=$(npm -v | cut -d'.' -f1)

if [ "$NPM_VERSION" -lt 9 ]; then
    echo -e "${RED}Error: npm 9 or higher is required${NC}"
    echo -e "${RED}Current version: $(npm -v)${NC}"
    exit 1
else
    echo -e "${GREEN}✓ npm version: $(npm -v)${NC}"
fi

echo ""
echo -e "${YELLOW}Installing root dependencies...${NC}"
npm install
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Root dependencies installed${NC}"
else
    echo -e "${RED}✗ Failed to install root dependencies${NC}"
    exit 1
fi

echo ""
echo -e "${YELLOW}Installing backend dependencies...${NC}"
cd backend
npm install
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Backend dependencies installed${NC}"
else
    echo -e "${RED}✗ Failed to install backend dependencies${NC}"
    exit 1
fi
cd ..

echo ""
echo -e "${YELLOW}Installing frontend dependencies...${NC}"
cd frontend
npm install
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Frontend dependencies installed${NC}"
else
    echo -e "${RED}✗ Failed to install frontend dependencies${NC}"
    exit 1
fi
cd ..

echo ""
echo -e "${YELLOW}Setting up environment files...${NC}"

if [ ! -f backend/.env ]; then
    cp backend/.env.example backend/.env
    echo -e "${GREEN}✓ Created backend/.env${NC}"
else
    echo -e "${YELLOW}⚠ backend/.env already exists${NC}"
fi

if [ ! -f frontend/.env ]; then
    cp frontend/.env.example frontend/.env
    echo -e "${GREEN}✓ Created frontend/.env${NC}"
else
    echo -e "${YELLOW}⚠ frontend/.env already exists${NC}"
fi

echo ""
echo -e "${YELLOW}Running backend tests...${NC}"
cd backend
npm test
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Backend tests passed${NC}"
else
    echo -e "${RED}✗ Backend tests failed${NC}"
fi
cd ..

echo ""
echo -e "${GREEN}================================${NC}"
echo -e "${GREEN}Setup Complete!${NC}"
echo -e "${GREEN}================================${NC}"
echo ""
echo -e "${YELLOW}To start the application:${NC}"
echo ""
echo -e "  ${GREEN}npm run dev${NC}          # Run both frontend and backend"
echo -e "  ${GREEN}npm run dev:backend${NC}  # Run backend only"
echo -e "  ${GREEN}npm run dev:frontend${NC} # Run frontend only"
echo ""
echo -e "${YELLOW}Access points:${NC}"
echo ""
echo -e "  Frontend:  ${GREEN}http://localhost:5173${NC}"
echo -e "  Backend:   ${GREEN}http://localhost:4000/graphql${NC}"
echo ""
echo -e "${YELLOW}For more information:${NC}"
echo ""
echo -e "  ${GREEN}cat README.md${NC}      # Full documentation"
echo -e "  ${GREEN}cat SETUP.md${NC}       # Quick start guide"
echo ""
