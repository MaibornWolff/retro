FROM node:10-alpine
WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --silent
COPY . .

EXPOSE 3001
CMD [ "yarn", "start" ]