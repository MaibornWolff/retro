FROM node:12-alpine as frontend
WORKDIR /app/frontend
COPY ./frontend/package.json ./frontend/package-lock.json ./
RUN npm i --silent
COPY ./frontend . 
RUN npm run build:prod

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
COPY ./backend/package.json ./backend/package-lock.json ./
RUN npm i --silent
COPY ./backend .
COPY --from=frontend /app/frontend/build ./public/
RUN npm run build
EXPOSE 3001
CMD [ "npm", "run", "start:prod" ]
