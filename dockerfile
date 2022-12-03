FROM node:16.18-alpine3.15

RUN npm install -g @vue/cli

EXPOSE 8080

WORKDIR /app
