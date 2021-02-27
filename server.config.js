const packageJsonFile = require('./package.json');

module.exports = {
    /// GENERAL
    SERVICE_NAME: 'kubernetes-project',
    PORT: "3000",
    APP_URL: 'http://localhost:3000/',
    APP_RELATIVE_URL: 'http://localhost:3000/',
    IS_DEV: process.env.NODE_ENV || 'dev',
    BASE_API_PATH: '/api/v1/',
    NEXTJS_ASSET_PREFIX: '',
    // DB
    MONGODB_CONNECTION_STRING: 'mongodb://localhost:27017',
    DB_NAME: 'subscribe',
    DB_NAME_ADMIN: 'admin',


    VERSION: packageJsonFile.version + '_' + '__BUILD_VERSION__'
};