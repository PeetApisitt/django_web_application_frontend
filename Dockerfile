# Stage 1: Build the React (Vite) application
FROM node:18-alpine AS build

WORKDIR /app

# Copy package.json and lock files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application source code
COPY . .

# Optional build-time environment variable for Vite
ARG VITE_API_BASE_URL=http://127.0.0.1:8000/api
ENV VITE_API_BASE_URL=${VITE_API_BASE_URL}

# Build production bundle into /app/dist
RUN npm run build

# Stage 2: Serve static files with Nginx
FROM nginx:alpine

# Copy built static files from Stage 1 to Nginx web root
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
