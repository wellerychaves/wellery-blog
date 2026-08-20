FROM oven/bun:1.4-slim AS build
WORKDIR /app
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile
COPY . .
RUN bunx --bun astro build

FROM oven/bun:1.4-slim AS final
WORKDIR /app
COPY --from=build /app/dist ./dist
COPY serve.ts ./
EXPOSE 80
CMD ["bun", "run", "serve.ts"]
