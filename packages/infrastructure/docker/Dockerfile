FROM node:lts as builder
RUN apt-get update && apt-get install -y openjdk-11-jdk
WORKDIR /app
COPY . .
RUN yarn install --frozen-lockfile

FROM node:lts-alpine as frontend
ENV NODE_ENV production
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

WORKDIR /app

COPY --from=builder --chown=nextjs:nodejs /app .

USER nextjs

RUN yarn frontend build

EXPOSE 3000
ENV NEXT_PUBLIC_API_ENDPOINT "http://backend:3001"

CMD ["yarn", "frontend", "start:production"]

FROM node:lts as backend
ENV NODE_ENV production
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nestjs

WORKDIR /app

COPY --from=builder --chown=nestjs:nodejs /app .

USER nestjs

RUN yarn backend build

EXPOSE 3001
ENV DATABASE_URL "mysql://root:password@mysql:3306/root"

CMD ["yarn", "backend", "start:production"]
