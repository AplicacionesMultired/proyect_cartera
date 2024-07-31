FROM nginx:stable-alpine3.19-slim

COPY ./nginx.conf /etc/nginx/nginx.conf

COPY ./dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]