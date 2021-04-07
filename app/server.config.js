const packageJsonFile = require('./package.json');

module.exports = {
    /// GENERAL
    SERVICE_NAME: process.env.APP_NAME || 'kubernetes-project',
    PORT: process.env.APP_PORT || "3000",
    APP_URL: 'http://localhost:3000/',
    APP_RELATIVE_URL: 'http://localhost:3000/',
    IS_DEV: process.env.NODE_ENV || 'dev',
    BASE_API_PATH: '/api/v1/',
    NEXTJS_ASSET_PREFIX: '',
    // DB
    MONGODB_CONNECTION_STRING: process.env.MONGO_INITDB_ROOT_USERNAME && process.env.MONGO_INITDB_ROOT_PASSWORD && process.env.MONGO_HOST_URL && process.env.MONGO_INITDB_DATABASE ?
        (`mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@${process.env.MONGO_HOST_URL}/${process.env.MONGO_INITDB_DATABASE}?authSource=admin`) :
        'mongodb://localhost:27017/',
    DB_NAME: process.env.MONGO_INITDB_DATABASE || 'subscribe',
    DB_NAME_ADMIN: 'admin',

    VERSION: packageJsonFile.version + '_' + '__BUILD_VERSION__'
};