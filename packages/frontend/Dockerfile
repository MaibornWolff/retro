FROM node:19.8.1-alpine3.16 as build
WORKDIR /app
COPY ./ /app/

RUN npm ci
RUN npm run frontend:build
CMD ["npm", "run", "frontend:start"]
