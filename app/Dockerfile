##################################BUILDER#########################################
FROM node

RUN \
    mkdir -p /app

COPY package*.json /app/

ENV APP_NAME=$APP_NAME
ENV APP_PORT=$APP_PORT
ENV MONGO_INITDB_ROOT_USERNAME=$MONGO_INITDB_ROOT_USERNAME
ENV MONGO_INITDB_ROOT_PASSWORD=$MONGO_INITDB_ROOT_PASSWORD
ENV MONGO_INITDB_DATABASE=$MONGO_INITDB_DATABASE
ENV MONGO_HOST_URL=$MONGO_HOST_URL
ENV TEST=test

WORKDIR /app/

RUN \
    npm install

COPY . .

ARG BUILD_NUMBER
RUN \
    sed -i "s#__BUILD_VERSION__#${BUILD_NUMBER}#g" server.config.js && \
    npm run build

EXPOSE 3000

CMD ["npm", "run", "prod"]