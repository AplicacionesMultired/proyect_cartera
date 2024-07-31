FROM node:lts-slim

WORKDIR /app

COPY . /app

RUN yarn && yarn build

EXPOSE 4040

CMD ["yarn", "start"]