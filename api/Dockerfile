FROM node:lts-slim

WORKDIR /app

COPY package.json /app/package.json

RUN yarn

COPY ./dist /app

EXPOSE 4040

CMD ["yarn", "start"]