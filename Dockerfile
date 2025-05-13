
# Use Node.js LTS version as base
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application
COPY . .

# Build the app
RUN npm run build

# Expose the port
EXPOSE 5004

# Start the application
CMD ["npm", "run", "preview", "--", "--port", "5004", "--host"]
