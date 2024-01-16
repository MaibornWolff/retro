FROM node:21-alpine3.18 as build
WORKDIR /app
COPY ./ /app/

RUN npm ci
RUN npm run backend:build
CMD ["npm", "run", "backend:start"]