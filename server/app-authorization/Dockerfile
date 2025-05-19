#################### DEVELOPMENT STAGE ####################
# Base image
FROM --platform=linux/amd64 node:20.13.1-alpine AS development

# Create app directory
WORKDIR /usr/src/app

# Create non-root user for better security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install app dependencies
RUN npm i --ignore-scripts

# Bundle app source
COPY src ./src
COPY tsconfig*.json ./
COPY nest-cli.json ./
COPY package*.json ./
COPY eslint.config.mjs ./

# Creates a "dist" folder with the production build
RUN npm run build

# Switch to non-root user
USER appuser

# Expose the port on which the app will run
EXPOSE 3000

# Start the server using the production build
CMD ["npm", "run", "start"]

