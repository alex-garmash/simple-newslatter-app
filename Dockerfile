##################################BUILDER#########################################
FROM node as builder

RUN \
    mkdir -p /app

COPY package*.json /app/

WORKDIR /app/
RUN \

    npm install --no-cache

COPY . .

ARG BUILD_NUMBER
RUN \
    sed -i "s#__BUILD_VERSION__#${BUILD_NUMBER}#g" server.config.js && \
    npm run build

RUN \
    cp -rf /app/entrypoint.sh /entrypoint.sh && \
#    dos2unix /entrypoint.sh && \
    chmod 755 /entrypoint.sh

EXPOSE 3000

ENTRYPOINT ["/bin/tini", "--", "/entrypoint.sh"]
CMD ["npm", "run", "prod"]