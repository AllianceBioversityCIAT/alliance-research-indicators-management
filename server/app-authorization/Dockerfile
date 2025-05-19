#################### DEVELOPMENT STAGE ####################
FROM --platform=linux/amd64 node:20.13.1-alpine AS development

# Create app directory
WORKDIR /usr/src/app

# Create non-root user for better security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Copy all files and configs as root
COPY package*.json ./
COPY src ./src
COPY tsconfig*.json ./
COPY nest-cli.json ./
COPY eslint.config.mjs ./

# Install dependencies (still as root)
RUN npm install --ignore-scripts

# Build the app (still as root)
RUN npm run build

# Fix ownership of the entire app directory
RUN chown -R appuser:appgroup /usr/src/app

# Switch to non-root user
USER appuser

# Expose the port on which the app will run
EXPOSE 3000

# Start the server using the production build
CMD ["npm", "run", "start"]
