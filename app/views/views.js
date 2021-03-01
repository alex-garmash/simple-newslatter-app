const router = require('express').Router();
const {basename} = require('path');


module.exports = function (app) {

    const handle = app.getRequestHandler();
    //sw
    router.get('/service-worker.js', (req, res) => {
        res.set('Service-Worker-Allowed', '/');
        return handle(req, res, req.url);
    });

    router.get('/', handlePage); // index page
    router.get('/admin', handlePage); // admin page


    // invalid page
    router.get('*', (req, res) => {
        return handle(req, res, req.url);
    } );

    return router;

    /////// ROUTER HANDLERS

    async function handlePage(req, res) {
        try {

            return app.render(req, res, req.path, req.query);
        }
        catch (err) {
            console.error(`${basename(__filename)} [handlePage] error: ${err.message}`);
            res.data = {
                serverErrorMessage: 'exception'
            };
            return app.render404(req, res);
        }
    }
};