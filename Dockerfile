FROM node:20 AS builder
WORKDIR /tmp/app
COPY package*.json ./
COPY .eleventy.js ./
COPY src ./src
RUN npm i
RUN npm run build

FROM nginx:latest
COPY --from=builder /tmp/app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]


# FROM node:20

# WORKDIR /app

# COPY package*.json ./
# COPY .eleventy.js ./
# COPY src ./src

# RUN npm i
# RUN

# EXPOSE 8080

# CMD ["npm", "start"]