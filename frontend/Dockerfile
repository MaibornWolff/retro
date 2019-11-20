FROM node:10-alpine
WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --silent
COPY . .

ENV DOCKER_HOST ip -4 addr show docker0 | grep -Po 'inet \K[\d.]+'
EXPOSE 3000
CMD [ "yarn", "start" ]