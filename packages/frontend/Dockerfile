FROM node:21-alpine3.18 as build
WORKDIR /app
COPY ./ /app/
RUN npm ci
RUN npm run frontend:build

FROM node:21-alpine3.18 as run
WORKDIR /app

COPY --from=build /app/packages/frontend/build/standalone ./

CMD ["npm", "run", "--prefix", "./packages/frontend", "startstandalone"]
