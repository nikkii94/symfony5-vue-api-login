FROM nginx:stable-alpine

ARG NGINX_HOST

ENV NGINX_HOST=$NGINX_HOST

RUN apk add bash

RUN rm /var/log/nginx/access.log /var/log/nginx/error.log