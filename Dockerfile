# build env
FROM node:14.17-alpine3.11 as build
WORKDIR /app
COPY . /app/

#prepare container 
RUN npm install --silent
RUN npm install react-scripts@3.0.1 -g --silent
RUN npm run build


# production env
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 80 
CMD ["nginx", "-g", "daemon off;"]