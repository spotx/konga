FROM node:6.12.3-alpine 

COPY . /app

WORKDIR /app

RUN chgrp -R 0 /app

RUN apk upgrade --update \
    && apk add bash git ca-certificates \
    && npm install -g bower \
    && npm --unsafe-perm --production install \
    && apk del git \
    && rm -rf /var/cache/apk/* \
        /app/.git \
        /app/screenshots \
        /app/test

EXPOSE 1337

ENTRYPOINT ["/app/start.sh"]
