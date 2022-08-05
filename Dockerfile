FROM node:16.15.0

WORKDIR /usr/slow-calculator-backend

COPY ./package*.json ./

RUN yarn install

COPY ./ ./

EXPOSE 5000

USER node

CMD ["yarn", "start"]
