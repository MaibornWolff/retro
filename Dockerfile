FROM node:12-alpine as frontend
WORKDIR /app/frontend
COPY ./frontend/package.json ./frontend/yarn.lock ./
RUN yarn install --silent
COPY ./frontend . 
RUN yarn build:prod

FROM node:12-alpine

# Installs latest Chromium package.
RUN apk add --no-cache \
  python2 \
  build-base \
  chromium \
  nss \
  freetype \
  freetype-dev \
  harfbuzz \
  ca-certificates \
  ttf-freefont



# https://github.com/puppeteer/puppeteer/blob/master/docs/api.md#environment-variables
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
  PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser


WORKDIR /app
COPY ./backend/package.json ./backend/yarn.lock ./
RUN yarn install --silent
COPY ./backend .
COPY --from=frontend /app/frontend/build ./public/
EXPOSE 3001
CMD [ "yarn", "start:prod" ]
