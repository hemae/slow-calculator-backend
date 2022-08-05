FROM node:16.15.0

WORKDIR /usr/hans-cv-backend

COPY ./package*.json ./

RUN yarn install

COPY ./ ./

EXPOSE 5000

VOLUME ["./slow-calculator-database"]

USER node

CMD ["yarn", "start"]
