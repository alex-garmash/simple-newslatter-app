#!/bin/bash

echo "starting entrypoint.sh for env=${ENV_CONFIG}"



APP_CONFIG_FILE=/app/server.config.js

ENV_SPECIFIC_APP_CONFIG_FILE=/app/server.config.${ENV_CONFIG}.js



echo "removing application configuration file : $APP_CONFIG_FILE"

rm -rf $APP_CONFIG_FILE

echo "copy environment specific application configuration file : $ENV_SPECIFIC_APP_CONFIG_FILE to $APP_CONFIG_FILE"

cp -rf $ENV_SPECIFIC_APP_CONFIG_FILE $APP_CONFIG_FILE

result=$?

if [ $result -ne 0 ]; then

        echo "there was an error executing entrypoint.sh"

        exit 1

fi



echo "environment specific configuration copied successfully"

echo "ending entrypoint.sh for env=${ENV_CONFIG}"

sed -i "s#__BUILD_VERSION__#$BUILD_VERSION#g" /app/server.config.js && \
sed -i "s#__BUILD_VERSION__#$BUILD_VERSION#g" /app/server.config.prod.js && \

exec $@

