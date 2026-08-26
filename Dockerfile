# --- Build stage ---
FROM node:22 AS builder
WORKDIR /tmp/app
COPY package*.json ./
COPY .eleventy.js ./
COPY src ./src
RUN npm i
RUN npm run build

# --- Runtime stage ---
# Pinned rather than :latest so a rebuild months from now produces the same
# server. Serves plain HTTP on 80; the shared edge proxy handles TLS.
FROM nginx:1.27-alpine

COPY --from=builder /tmp/app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
