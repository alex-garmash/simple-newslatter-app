'use strict';
const {basename} = require('path');
const { checkIfCollectionExists, insertOrUpdateRecord,findRecordInDataBase } = require('../databases/databases.repository');
const config = require('../../../server.config');

async function adminService(req) {
    console.info(`${basename(__filename)} [adminService] entered`);
    try {

        let result = await checkIfCollectionExists(config.DB_NAME_ADMIN);

        // admin not exist
        if(!result.data || result.err){
            // create admin
            result = await insertOrUpdateRecord(config.DB_NAME_ADMIN,{email:req.body.email,password:req.body.password})
            if (!result || result.err || !result.data) {
                console.error(`${basename(__filename)} [adminService] failed to add data to mongo`);
            }else{
                console.info(`${basename(__filename)} [adminService] get data from db`);
            }
            // get all records
            result = await findRecordInDataBase(config.DB_NAME,{},{projection:{ _id: 0}})
        }
        // admin exist
        else{
            result = await findRecordInDataBase(config.DB_NAME_ADMIN,{email:req.body.email,password:req.body.password},{projection:{ _id: 0}});
            if(!result || result.err){
                result = {err:500,data:null}
            }
            if(result.data.length){
                result = await findRecordInDataBase(config.DB_NAME,{},{projection:{ _id: 0}})
            }
        }

        return result;
    }
    catch (err) {
        console.error(`${basename(__filename)} [adminService] failed. error: ${JSON.stringify(err.message)}`);
        return {err:err.message,data:null};
    }
}


module.exports = {
    adminService: adminService
};