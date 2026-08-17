# ─────────────────────────────────────────────
#  MilkMist — Backend Dockerfile
#  Node.js 20 LTS (Alpine) – Production Image
# ─────────────────────────────────────────────
FROM node:20-alpine

# Install OS deps needed by bcrypt's native bindings
RUN apk add --no-cache python3 make g++

# Create app directory
WORKDIR /app

# Copy package manifests first (layer-cache optimisation)
COPY package.json package-lock.json ./

# Install production dependencies only (skip nodemon etc.)
RUN npm ci --omit=dev

# Copy source code
COPY . .

# Expose the API port
EXPOSE 3000

# Run as non-root user for security
USER node

# Start the server
CMD ["node", "app.js"]
