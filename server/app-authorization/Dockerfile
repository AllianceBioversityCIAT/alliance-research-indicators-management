#################### BASE STAGE ####################
# Base image
FROM node:20.13.1-alpine AS base

# Create app directory
WORKDIR /app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

#################### DEVELOPMENT STAGE ####################

# Development stage
FROM base AS development

# Install app dependencies
RUN npm install

# Bundle app source
COPY . .

# Creates a "dist" folder with the production build
RUN npm run build

# Expose the port on which the app will run
EXPOSE 3001

# Start the server using the production build
CMD ["npm", "run", "start"]

#################### BUILD STAGE ####################
FROM base AS build

# Install production dependencies securely (no script execution)
RUN npm ci --only=production --ignore-scripts

# Copy source code and config files
COPY src ./src
COPY tsconfig*.json ./
COPY nest-cli.json ./
COPY package*.json ./
COPY eslint.config.mjs ./

# Build the app
RUN npm run build

#################### PRODUCTION STAGE ####################
FROM --platform=linux/amd64 node:20.13.1-alpine AS production

# Set working directory
WORKDIR /app

# Create non-root user for better security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Copy build artifacts and dependencies from build stage
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package*.json ./

# Switch to non-root user
USER appuser

# Expose the application port
EXPOSE 3001

# Run the app directly (avoid npm for security and signal handling)
CMD ["node", "dist/main.js"]

