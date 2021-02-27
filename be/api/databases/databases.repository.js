'use strict';
const {basename} = require('path');
const config = require('../../../server.config');
const MongoClient = require('mongodb').MongoClient;

async function insertOrUpdateRecord(dbName,data) {
    console.info(`${basename(__filename)} [insertOrUpdateRecord] entered. `);
    let db = null;
    const dataObj = {};
    const dataAdd = {};
    let response = {err: 500, data: null};
    if(!data.password){
        dataObj.email = data.email;
        dataObj.name = data.name;
        dataAdd.email = data.email;
    }else{
        dataObj.email = data.email;
        dataObj.password = data.password;
    }

    try {
        db = await MongoClient.connect(config.MONGODB_CONNECTION_STRING, { useUnifiedTopology: true });
        const result = await db.db(config.DB_NAME).collection(dbName).updateOne(dataAdd,{$set:dataObj},{upsert:true});

        if(!result || !result.result || result.result.ok !== 1){
            console.error(`${basename(__filename)} [insertOrUpdateRecord] can not add data to mongo: `);
        }else{
            console.info(`${basename(__filename)} [insertOrUpdateRecord] data added to mongo. `);
            response = {err:null,data:data}
        }

        return response;
    } catch (err) {
        console.error(`${basename(__filename)} [insertOrUpdateRecord] failed. error: ${JSON.stringify(err.message || err)}`);
        return {err: err.message, data: null};
    } finally {
        // Ensures that the client will close when you finish/error
        await db.close();
    }
}

async function findRecordInDataBase(dbName,data,projection = {}) {
    console.info(`${basename(__filename)} [findRecordInDataBase] entered. `);
    let db = null;
    let response = {err: 500, data: null};
    try {
        db = await MongoClient.connect(config.MONGODB_CONNECTION_STRING, { useUnifiedTopology: true });
        const result = await db.db(config.DB_NAME).collection(dbName).find(data,projection).toArray();
        if(!result){
            console.error(`${basename(__filename)} [findRecordInDataBase] can not find data in mongo: `);
        }else{
            console.info(`${basename(__filename)} [addRecordToDataBase] data added to mongo. `);
            response = {err:null,data:result}
        }
        return response;
    } catch (err) {
        console.error(`${basename(__filename)} [findRecordInDataBase] failed. error: ${JSON.stringify(err.message || err)}`);
        return {err: err.message, data: null};
    }finally {
        // Ensures that the client will close when you finish/error
        await db.close();
    }
}

async function checkIfCollectionExists(collectionName) {
    console.info(`${basename(__filename)} [checkIfCollectionExists] entered. `);
    let db = null;
    let response = {err: 500, data: null};
    try {
        db = await MongoClient.connect(config.MONGODB_CONNECTION_STRING, { useUnifiedTopology: true ,useNewUrlParser: true,});
        const collections = await db.db(config.DB_NAME).listCollections().toArray();
        const result = collections.filter(c => c.name === collectionName);

        if(!result || result.length === 0){
            console.error(`${basename(__filename)} [checkIfCollectionExists] collection name: ${collectionName} not exists in mongo `);
        }else{
            console.info(`${basename(__filename)} [checkIfCollectionExists] collection name: ${collectionName} exists in mongo. `);
            response = {err:null,data:result}
        }
        return response;
    } catch (err) {
        console.error(`${basename(__filename)} [checkIfCollectionExists] failed. error: ${JSON.stringify(err.message || err)}`);
        return {err: err.message, data: null};
    }finally {
        // Ensures that the client will close when you finish/error
        await db.close();
    }
}

module.exports = {
    insertOrUpdateRecord: insertOrUpdateRecord,
    findRecordInDataBase: findRecordInDataBase,
    checkIfCollectionExists: checkIfCollectionExists

};