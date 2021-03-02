##################################BUILDER#########################################
FROM node

RUN \
    mkdir -p /app

COPY package*.json /app/

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