const express = require('express');
const router = express.Router();

const subscribe = require('./subscribe/subscribe.route');
const admin = require('./admin/admin.route');

const routes = (server) => {

    /*** ERROR HANDLING ***/
    server.route('/error').post((req) => {
        console.error(JSON.stringify(req.body));
    });
    /*** ERROR HANDLING ***/

    router.use('/subscribe', subscribe);
    router.use('/admin', admin);

    return router;
};

module.exports = routes;