'use strict';
const express = require('express');
const router = express.Router();
const { basename } = require('path');
const { subscribeService } = require('./subscribe.service');
const lodashGet = require('lodash/get');

router.route('/').post(async function(req, res) {
    try {
        console.info(`${basename(__filename)} [${req.method.toLowerCase()} ${req.path}] entered. body: ${JSON.stringify(req.body)}`);
        if (!validations(req)) {
            console.error(`${basename(__filename)} [${req.method.toLowerCase()} ${req.path}] validation failed`);
            return res.json({
                err: 'invalid input',
                data: null
            });
        }
        let result = await subscribeService(req);
        if(!result || result.err || !result.data){
            res.json({err: "can not get data from service", data: null});
        }else{
            res.json(result);
        }
    }
    catch (err) {
        console.error(`${basename(__filename)} [${req.method.toLowerCase()} ${req.path}] error: ${err.message || err}`);
        res.json({err: 'server error', data: null});
    }
});

function validations(req) {
    try{
        const result = true;
         if(!lodashGet(req, 'body',false)) return false;
         if(!lodashGet(req, 'body.name',false)) return false;
         if(!lodashGet(req, 'body.email',false)) return false;
         return result;
    }catch(err){
        console.error(`${basename(__filename)} [${req.method.toLowerCase()} ${req.path}] error: ${err.message}`);
        return false;
    }
}

module.exports = router;