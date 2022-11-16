FROM node:16

WORKDIR /usr/src/app

COPY package.json ./

COPY yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build

EXPOSE 5000

CMD [ "node", "build/server.js" ]