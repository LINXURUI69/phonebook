# Use official Node.js image
FROM node:21.5.0

# Set working directory
WORKDIR /app/server

# Copy application files
COPY . .

# Install dependencies
RUN npm install

# Expose port
EXPOSE 8080

# Run application
CMD ["npm", "start"]
