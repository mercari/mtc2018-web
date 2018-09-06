FROM node:8

WORKDIR /usr/src/app

COPY . .

ARG GRAPHQL_ENDPOINT
ENV GRAPHQL_ENDPOINT $GRAPHQL_ENDPOINT
RUN npm install --no-progress
RUN npm run build

EXPOSE 8080
CMD [ "npm", "start" ]
