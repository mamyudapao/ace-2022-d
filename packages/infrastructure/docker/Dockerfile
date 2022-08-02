FROM node:lts as builder
RUN apt-get update && apt-get install -y openjdk-11-jdk
WORKDIR /app
COPY . .
RUN yarn install --frozen-lockfile

FROM node:lts-alpine as frontend

WORKDIR /app
COPY --from=builder /app .

RUN yarn frontend build
CMD ["yarn", "frontend", "start:production"]

FROM node:lts as backend

WORKDIR /app
COPY --from=builder /app .

RUN yarn backend build
CMD ["yarn", "backend", "start:production"]
