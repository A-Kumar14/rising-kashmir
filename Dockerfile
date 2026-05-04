# Sample production image (Node 20 LTS). Build: docker build -t rk-web .
# Run: pass AUTH_SECRET (32+ chars), AUTH_GOOGLE_ID, AUTH_GOOGLE_SECRET at runtime.
FROM node:20-alpine AS base

FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Next standalone expects `public/` to exist (may be empty).
RUN mkdir -p public
ENV NEXT_TELEMETRY_DISABLED=1
# NextAuth is evaluated at build; replace at `docker run` with real values.
ENV AUTH_SECRET="docker-build-placeholder-secret-32chars!!"
ENV AUTH_GOOGLE_ID="000000000000-docker-build.apps.googleusercontent.com"
ENV AUTH_GOOGLE_SECRET="GOCSPX-docker-build-placeholder-not-real"
RUN npm run build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nextjs
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
USER nextjs
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
CMD ["node", "server.js"]
