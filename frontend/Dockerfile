FROM node:latest AS build-stage
WORKDIR /app
COPY sudoku/package*.json ./
RUN npm install
COPY sudoku/. .
RUN npm run build

FROM nginx:latest
COPY --from=build-stage /app/dist /usr/share/nginx/html

#RUN rm /etc/nginx/conf.d/default.conf

#COPY nginx.conf /etc/nginx/conf.d/

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

