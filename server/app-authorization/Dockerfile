#################### DEVELOPMENT STAGE ####################
# Base image
FROM --platform=linux/amd64 node:20.13.1-alpine AS development

# Create app directory
WORKDIR /usr/src/app

# Create non-root user for better security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Copy dependency files with correct ownership
COPY --chown=appuser:appgroup package*.json ./

# Install app dependencies
RUN npm install --ignore-scripts

# Copy application source and configs with correct ownership
COPY --chown=appuser:appgroup src ./src
COPY --chown=appuser:appgroup tsconfig*.json ./
COPY --chown=appuser:appgroup nest-cli.json ./
COPY --chown=appuser:appgroup eslint.config.mjs ./

# Switch to non-root user
USER appuser

# Build the app
RUN npm run build

# Expose the port on which the app will run
EXPOSE 3000

# Start the server using the production build
CMD ["npm", "run", "start"]
