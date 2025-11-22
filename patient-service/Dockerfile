FROM node:24-alpine

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json if present
COPY package*.json ./

# Install dependencies (production only)
RUN npm install --only=production

# Copy the rest of the application code
COPY . .

# The app listens on port 3000
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
