# Node LTS Alpine
FROM node:22.14-alpine

RUN apk update && apk add --no-cache \
    curl \
    postgresql-dev \
    postgresql-client \
    openssl

RUN npm install -g pnpm
RUN npm install -g @nestjs/cli
