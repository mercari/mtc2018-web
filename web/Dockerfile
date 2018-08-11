FROM node:8

WORKDIR /usr/src/app

COPY . .

RUN npm install --no-progress
RUN npm run build

EXPOSE 8080
CMD [ "npm", "start" ]
