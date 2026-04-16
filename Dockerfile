FROM oven/bun:1.2-alpine AS build
WORKDIR /app
COPY package.json bun.lockb* ./
RUN bun install --frozen-lockfile
COPY . .
RUN bunx --bun astro build

FROM caddy:2-alpine AS final

COPY --from=build /app/dist /usr/share/caddy

CMD ["caddy", "file-server", "--root", "/usr/share/caddy", "--listen", ":80"]
