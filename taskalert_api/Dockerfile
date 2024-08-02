FROM node:18.19

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package.json /usr/src/app

RUN npm i

COPY . /usr/src/app

EXPOSE 8001

CMD ["npm","start"]