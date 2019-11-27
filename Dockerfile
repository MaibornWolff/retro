FROM node:10-alpine as frontend
WORKDIR /app/frontend
COPY ./frontend/package.json ./frontend/yarn.lock ./
RUN yarn install --silent
COPY ./frontend .
RUN yarn build

FROM node:10-alpine
WORKDIR /app
COPY ./backend/package.json ./backend/yarn.lock ./
RUN yarn install --silent
COPY ./backend .
COPY --from=frontend /app/frontend/build ./public/
EXPOSE 3001
CMD [ "yarn", "start" ]
