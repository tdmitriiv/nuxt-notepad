FROM node:24-slim AS build
WORKDIR /frontend

RUN corepack enable

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

RUN pnpm install --frozen-lockfile

COPY . /frontend

RUN pnpm run build

ENV NODE_ENV=production

EXPOSE 3000

CMD ["node", "/frontend/.output/server/index.mjs"]