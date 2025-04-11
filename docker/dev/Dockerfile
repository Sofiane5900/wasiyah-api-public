# Node LTS Alpine
FROM node:22.14-alpine

ARG WORKDIR=/home/www-data/app

RUN apk update && apk add --no-cache \
    bash \
    curl \
    git \
    postgresql-dev \
    postgresql-client \
    make \
    openssl

RUN set -x ; \
  addgroup -g 1001 -S www-data ; \
  adduser -u 1001 -D -S -G www-data www-data && exit 0 ; exit 1

RUN sed -i '/^www-data:/s:/bin/ash:/bin/bash:' /etc/passwd
RUN echo 'PS1="\[\e[36m\]\u\[\e[0m\]:\[\e[35m\]\W\[\e[0m\]\\$ "' >> /home/www-data/.bashrc

RUN npm install -g pnpm
RUN npm install -g @nestjs/cli

USER www-data

WORKDIR ${WORKDIR}

RUN chown -R www-data:www-data ${WORKDIR}

COPY --chown=www-data:www-data . ${WORKDIR}

RUN if [ -d "node_modules" ]; then rm -rf node_modules; fi
RUN if [ -d ".pnpm-store" ]; then rm -rf .pnpm-store; fi

RUN pnpm config set store-dir ${WORKDIR}/.pnpm-store

RUN pnpm install --frozen-lockfile

USER root
COPY docker/dev/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]
CMD ["pnpm", "dev"]
