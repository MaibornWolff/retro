FROM node:19.8.1-alpine3.16 as build
WORKDIR /app
COPY ./ /app/

RUN npm ci
RUN npm run build:frontend

FROM nginx:1.23.4-alpine
EXPOSE 80

COPY --from=build /app/packages/frontend/nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/packages/frontend/build /usr/share/nginx/html