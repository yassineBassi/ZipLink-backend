FROM node:20-alpine AS builder

WORKDIR /app
COPY package.json package-lock.json ./

RUN npm install

COPY . .
ARG APP_NAME
RUN npm run build $APP_NAME

FROM node:20-alpine

WORKDIR /app
COPY package.json ./
RUN npm install --omit=dev

COPY --from=builder /app/dist/apps/$APP_NAME ./dist

CMD ["node", "dist/main.js"]