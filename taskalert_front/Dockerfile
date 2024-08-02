# first stage angular app 
FROM node:18.19-alpine as build

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package.json /usr/src/app

RUN npm i

COPY dist/. /usr/src/app/


# second stage nginx server: changed the base config to enable multi site
FROM nginx:1.13.12-alpine

RUN mkdir -p /usr/share/nginx/html/taskalert

COPY --from=build /usr/src/app/taskalert/browser/. usr/share/nginx/html/taskalert

COPY nginx.conf /etc/nginx/conf.d/default.conf
