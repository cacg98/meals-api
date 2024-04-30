# Use an official Node.js runtime as the base image
FROM node:20-alpine

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

# Expose port 3000 (or any other port your API listens on)
EXPOSE $RAILWAY_TCP_PROXY_PORT

# Start the API server
CMD ["npm", "start"]
