# ── Stage 1: Build ──────────────────────────────────────────────────────────
FROM node:22-alpine AS builder

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm@9 && pnpm config set network-timeout 300000

# Copy dependency manifests
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# Install all dependencies (including devDependencies needed for build)
RUN --mount=type=cache,id=pnpm-backend,target=/root/.local/share/pnpm/store \
    pnpm install --no-frozen-lockfile

# Copy source
COPY . .

# Build the NestJS app
RUN pnpm run build

# ── Stage 2: Production ──────────────────────────────────────────────────────
FROM node:22-slim AS production

WORKDIR /app

# Runtime libs required by the @sparticuz/chromium binary (no system Chromium needed)
RUN apt-get update && apt-get install -y \
    ca-certificates \
    fonts-freefont-ttf \
    libnss3 \
    libdbus-1-3 \
    libatk1.0-0 \
    libatk-bridge2.0-0 \
    libcups2 \
    libdrm2 \
    libxkbcommon0 \
    libxcomposite1 \
    libxdamage1 \
    libxfixes3 \
    libxrandr2 \
    libgbm1 \
    libasound2 \
    libpango-1.0-0 \
    libcairo2 \
    --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

# @sparticuz/chromium ships its own binary — no system Chromium or PUPPETEER_* vars needed
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true

# Install pnpm
RUN npm install -g pnpm@9 && pnpm config set network-timeout 300000

# Copy package manifests
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# Install production dependencies only
RUN --mount=type=cache,id=pnpm-backend,target=/root/.local/share/pnpm/store \
    pnpm install --no-frozen-lockfile --prod

# Copy compiled output from builder
COPY --from=builder /app/dist ./dist

EXPOSE 3000

CMD ["node", "dist/main"]