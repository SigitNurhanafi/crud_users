FROM node:14-alpine
WORKDIR /App
COPY package.json .
RUN npm install
COPY . .
CMD npm start 