const compression = require('compression');
const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
//server config
const conf = require('./server.config');
const dev = conf.IS_DEV !== 'production';

// executed with file name and ignored properties as an array
const taskManager = require('./cron/taskManager');
const useragent = require('express-useragent');
const routes = require('./be/api/routes');
const views = require('./views/views');


const app = require('next')({ dev, dir: './fe' });
overrideEnvVars();

app
    .prepare()
    .then(async () => {
        const server = express();
        // parse application/x-www-form-urlencoded
        server.use(bodyParser.urlencoded({ extended: false }));
        // parse application/json
        server.use(bodyParser.json());

        //register other security protections
        server.use(helmet());
        //register gzip compression
        server.use(compression());

        // if (conf.IS_DEV !== 'dev') {
        //   taskManager.runJobs();
        // }
        // for ELK
        server.use(useragent.express());

        server.use(
            methodOverride(function (req) {
                if (req.body && typeof req.body === 'object' && '_method' in req.body) {
                    // look in urlencoded POST bodies and delete it
                    const method = req.body._method;
                    delete req.body._method;
                    return method;
                }
            })
        );

        //register health check middleware
        server.use(onHealthCheck);

        //REGISTER ROUTES
        const router = routes(server);
        server.use(conf.BASE_API_PATH, router);

        // register frontend views
        server.use('/', views(app));

        //Express middleware in case of SYNC error in a web request
        server.use(function (err, req, res, next) {
            console.error(`global middleware error, error: ${err}`);
            return next();
        });
        //start server
        server.listen(conf.PORT, err => {
            if (err) throw err;
            console.info(`${conf.SERVICE_NAME} ready on http://localhost:${conf.PORT}`);
        });

    })
    .catch(ex => {
        console.error(ex.message);
        process.exit(1);
    });
/*
this function is for microservice health check used by docker
*/
async function onHealthCheck(req, res, next) {
    // checks if the system is healthy, like the db connection is live
    if (req.originalUrl === '/health') {
        try {
            //TODO
            //  mognodb connect
            // const connection = await MongoClient.getConnection(conf.MONGODB_CONNECTION_STRING, {useNewUrlParser: true});
            // const db = await connection.db(conf.DB_NAME);
            // const result = await db.collection(conf.COLLECTION_NAME).find().project({_id: 0}).count();
            //
            // if (result > 0) {
            //     res.json({serviceName: conf.SERVICE_NAME, version: conf.VERSION, status: 'UP'});
            // } else {
            //     res.json({serviceName: conf.SERVICE_NAME, version: conf.VERSION, status: 'DOWN'});
            // }
            res.json({serviceName: conf.SERVICE_NAME, version: conf.VERSION, status: 'UP'});
        } catch (e) {
            res.json({serviceName: conf.SERVICE_NAME, version: conf.VERSION, status: 'DOWN'});
        }
    } else {
        next();
    }
}
function overrideEnvVars() {
    process.env.BASE_URL = conf.APP_RELATIVE_URL;
    process.env.NEXTJS_ASSET_PREFIX = conf.NEXTJS_ASSET_PREFIX;
}

/*
uncaught error from somewhere
*/
process.on('uncaughtException', function (error) {
    console.error(`uncaughtException, error: ${error}`);
});
/*
unhandled promise rejection
*/
process.on('unhandledRejection', function (reason, p) {
    console.error(`unhandledRejection, reason: ${reason}, p: ${p}`);
});