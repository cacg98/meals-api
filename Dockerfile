# Use an official Node.js runtime as the base image
FROM node:20-alpine AS builder

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build TypeScript files
RUN npm run build

# Use nginx image as the base image for serving the Angular app
FROM nginx:alpine

# Copy the built Angular app from the builder stage to nginx html directory
COPY --from=builder /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 3000 (or any other port your API listens on)
EXPOSE 3000
