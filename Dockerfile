# Step 1: Use a Node.js base image
FROM node:18-alpine AS builder

# Step 2: Set working directory in the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Step 4: Install dependencies
RUN npm install --frozen-lockfile

# Step 5: Copy all project files
COPY . .

# Step 6: Build the application
RUN npm run build

# Step 7: Install only production dependencies
RUN npm prune --production

# Step 8: Use a minimal Node.js image for the final build
FROM node:18-alpine

# Step 9: Set working directory for the production container
WORKDIR /app

# Step 10: Copy files from the builder stage
COPY --from=builder /app ./

# Step 11: Expose the port
EXPOSE 3003

# Step 12: Define the command to run the app
CMD ["npm", "start"]
