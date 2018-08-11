FROM node:8

WORKDIR /usr/src/app

COPY . .

RUN npm install --only production

EXPOSE 8080
CMD [ "npm", "start" ]
