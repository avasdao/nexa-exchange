# Dockerfile
FROM node:16

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

ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000
ENV NUXT_ENV_MAGIC_PUBLISHABLE_KEY=pk_live_CAF7378F498C1F81

CMD [ "npm", "start" ]
