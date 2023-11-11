# Stage 1
FROM node:latest as node
WORKDIR /app
COPY package*.json /app/

# Stage 2
RUN npm ci
COPY ./ /app/
ARG configuration=production
RUN npm run build -- --output-path=./dist/out --configuration $configuration

# Stage 3
FROM nginx:alpine
#Copy ci-dashboard-dist
COPY --from=node /app/dist/out/ /usr/share/nginx/html
#Copy default nginx configuration
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
