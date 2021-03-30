const express = require('express');
const conf = require('../../server.config');
const router = express.Router();

module.exports = function (server){

    server.use(conf.BASE_API_PATH, router);

    server.all('/env-conf', async function (req, res, next) {
        if (req.originalUrl === '/env-conf') {
            if (req.method.toLowerCase() == 'post' && Object.keys(req.body) && Object.keys(req.body).length) {
                for (const key in req.body) {
                    if (conf[key] != null) {
                        conf[key] = req.body[key];
                    }
                }
            }
            res.json({env: process.env, conf: conf});
        } else {
            next();
        }
    });
};