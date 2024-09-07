FROM node:22-slim

RUN mkdir /usr/src/app
WORKDIR /usr/src/app
ENV PATH /usr/src/app/node_modules/.bin:$PATH

RUN apt update -y
RUN apt upgrade -y
RUN apt install clang cmake build-essential -y

COPY package.json /usr/src/app/package.json
RUN yarn install --silent

COPY . /usr/src/app
#RUN yarn run build

#EXPOSE 3000

CMD ["node", "./daemon.js"]
