FROM node:14-alpine

WORKDIR /usr/src/app

COPY package*.json ./
COPY yarn.lock ./

RUN yarn install

COPY . .

EXPOSE ${PORT?8080}
CMD ["node", "./dist/index.js"]
