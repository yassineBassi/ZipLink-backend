FROM public.ecr.aws/docker/library/node:lts-alpine3.22 AS builder

ARG APP_NAME
WORKDIR /app
COPY package.json package-lock.json ./

RUN npm ci

COPY . .
RUN npm run build $APP_NAME

FROM public.ecr.aws/docker/library/node:lts-alpine3.22

ARG APP_NAME
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --omit=dev

COPY --from=builder /app/dist/apps/$APP_NAME ./dist
UN npm install -g npm@11.12.1
CMD ["node", "dist/main.js"]