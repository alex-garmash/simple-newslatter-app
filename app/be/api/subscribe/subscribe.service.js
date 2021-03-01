'use strict';
const {basename} = require('path');
const { subscribeRepository } = require('./subscribe.repository');

async function subscribeService(req) {
    console.info(`${basename(__filename)} [subscribeService] entered`);
    try {

        let result = await subscribeRepository(req.body.name,req.body.email);

        if (!result || result.err || !result.data) {
            console.error(`${basename(__filename)} [subscribeService] failed to add data to mongo`);
        }else{
            console.info(`${basename(__filename)} [subscribeService] get data from db`);
        }

        return result;
    }
    catch (err) {
        console.error(`${basename(__filename)} [subscribeService] failed. error: ${JSON.stringify(err.message)}`);
        return {err:err.message,data:null};
    }
}


module.exports = {
    subscribeService: subscribeService
};