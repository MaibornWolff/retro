FROM node:21-alpine3.18 as build
WORKDIR /app
COPY ./ /app/

RUN npm ci
RUN npm run frontend:build
CMD ["npm", "run", "frontend:start"]
