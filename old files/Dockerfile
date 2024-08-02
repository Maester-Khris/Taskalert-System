FROM node:18.19-alpine

# RUN mkdir -p /usr/src/app

WORKDIR /app

COPY ./package.json ./

RUN npm i

COPY . .

# EXPOSE 8001
 
CMD ["npm","run","start"]