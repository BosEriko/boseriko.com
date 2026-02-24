# Use Node.js 20 LTS as base
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your app
COPY . .

# Build the Next.js app
RUN npm run build

# Expose the port Next.js will run on
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
