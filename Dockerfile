FROM node:22 AS Base

WORKDIR /app

RUN npm install -g nodemon

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "nodemon","-L","index.js" ]