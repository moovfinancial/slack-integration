FROM node:14-alpine

WORKDIR /usr/src/app

COPY ./package.json .
COPY ./src/ ./src/
COPY ./tsconfig.json .
COPY ./yarn.lock .

RUN yarn install --frozen-lockfile
RUN yarn build

HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:${PORT:-8080}/ || exit 1

EXPOSE ${PORT:-8080}
CMD ["node", "./dist/index.js"]
