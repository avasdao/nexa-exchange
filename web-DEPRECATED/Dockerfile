# Dockerfile
FROM node:22-slim

# create destination directory
RUN mkdir -p /usr/src/nuxt-app
WORKDIR /usr/src/nuxt-app

# update and install dependency
RUN apt update && apt upgrade -y

# copy the app, note .dockerignore
COPY . /usr/src/nuxt-app/
RUN yarn
RUN yarn generate

EXPOSE 3000

CMD [ "npm", "start" ]
