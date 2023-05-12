FROM node:20-alpine AS base

RUN npm config set registry https://registry.npmmirror.com
RUN npm i -g pnpm
RUN pnpm config set registry https://registry.npmmirror.com

FROM base AS dependencies

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

# 安装依赖包
RUN pnpm install

FROM base AS build

WORKDIR /app

COPY . .

COPY --from=dependencies /app/node_modules ./node_modules
RUN pnpm migrate:dev
RUN pnpm build
RUN pnpm prune --prod

FROM base AS deploy

EXPOSE 4000
EXPOSE 4001

WORKDIR /app

COPY --from=build /app .

CMD [ "pnpm", "start" ]