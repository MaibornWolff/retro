FROM node:21-alpine3.18 AS build
WORKDIR /app
COPY ./ /app/
RUN npm ci
RUN npm run frontend:build

FROM node:21-alpine3.18 AS run
WORKDIR /app

COPY --from=build /app/packages/frontend/build/standalone/packages/frontend ./
COPY --from=build /app/packages/frontend/build/standalone/node_modules ./node_modules
COPY --from=build /app/packages/frontend/build/standalone/packages/shared ./
COPY --from=build /app/packages/frontend/public ./public
COPY --from=build /app/packages/frontend/build/static ./build/static

CMD PORT=80 node server.js
