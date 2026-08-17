# ─────────────────────────────────────────────────────────
#  MilkMist — Frontend Dockerfile (Multi-Stage Build)
#  Stage 1: Build React app with Vite
#  Stage 2: Serve with Nginx Alpine
# ─────────────────────────────────────────────────────────

# ── Stage 1: Build ──────────────────────────────────────
FROM node:22-alpine AS builder

WORKDIR /app

# Copy package manifests first (layer cache)
COPY package.json package-lock.json ./

# Install all dependencies (including devDependencies needed for build)
RUN npm install

# Copy source
COPY . .

# Accept the backend API URL at build time
# e.g. --build-arg VITE_API_BASE_URL=http://13.xx.xx.xx:3000/api
ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL=${VITE_API_BASE_URL}

# Build the production bundle
RUN npm run build

# ── Stage 2: Serve ──────────────────────────────────────
FROM nginx:stable-alpine AS runner

# Remove default Nginx static content
RUN rm -rf /usr/share/nginx/html/*

# Copy built assets from Stage 1
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom Nginx config (SPA routing support)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
