'use strict';
const {basename} = require('path');
const {insertOrUpdateRecord} = require('../databases/databases.repository');
const config = require('../../../server.config');

async function subscribeRepository(name,email) {
    console.info(`${basename(__filename)} [subscribeRepository] entered. `);
    try {
        const response = await insertOrUpdateRecord(config.DB_NAME,{name:name,email:email});
        if(!response || response.err || !response.data){
            console.error(`${basename(__filename)} [subscribeRepository] no results return: `);
        }else{
            console.info(`${basename(__filename)} [subscribeRepository] finished successfully. `);
        }
        return response;
    }
    catch (err) {
        console.error(`${basename(__filename)} [subscribeRepository] failed. error: ${JSON.stringify(err.message || err)}`);
        return { err: err.message, data: null };
    }
}

module.exports = {
    subscribeRepository: subscribeRepository
};