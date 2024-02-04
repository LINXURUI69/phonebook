# Use official Node.js image
FROM node:21.5.0 as build-container

# Set working directory
WORKDIR /app/frontend

# Copy application files
COPY . .

# Install dependencies
RUN npm install

# Build application
RUN npm run build

# Use official Nginx image
FROM nginx

# Copy built application
COPY --from=build-container /app/frontend/build /usr/share/nginx/html

# Copy custom Nginx configuration
COPY /nginx-custom.conf /etc/nginx/conf.d/default.conf