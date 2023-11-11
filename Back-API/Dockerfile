# FROM ubuntu:latest
FROM alpine:latest

# RUN apt update && apt upgrade -y && apt install npm -y && apt-get install build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev -y
RUN apk update
RUN apk add npm
RUN apk add gcompat libuuid
RUN apk add make gcc g++
RUN apk add libjpeg-turbo-dev imagemagick ghostscript
RUN apk add git build-base curl
RUN apk add cairo-dev jpeg-dev pango-dev giflib-dev

# Install dependencies
WORKDIR /src/
COPY . .

RUN npm install

# Expose the app port
EXPOSE 8081

# Start the app
CMD npm start
