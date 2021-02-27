const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const withOffline = require('next-offline');
const serverConfig = require('../server.config');

const workboxConfig = {
    swDest: '../public/service-worker.js',
    clientsClaim: true,
    cleanupOutdatedCaches: true,
    mode: "production",
    skipWaiting: true,
    exclude: [/\.*\/admin\.*/gi, /.manifest\.json$/i],
    manifestTransforms: [manifest => {
        /** required for precaching to work properly */
        manifest = manifest
            .map(entry => {
                // change prefix of urls in order
                entry.url = entry.url
                    .replace('_next', `/kubernetes-project/_next`)
                    .replace('//', '/');
                return entry;
            });
        return {manifest};
    }],
    runtimeCaching: [
        {
            urlPattern: /_next\/static|\.(?:png|jpg|jpeg|svg|gif|woff|ttf|css|min.js)/i,
            handler: 'CacheFirst',
            options: {
                cacheName: 'image-cache',
                cacheableResponse: {
                    statuses: [0, 200]
                },
                expiration: {
                    maxAgeSeconds: 30 * 24 * 60 * 60,
                },
            }
        }
    ]
};
const assetPrefix = serverConfig.NEXTJS_ASSET_PREFIX
const scope = assetPrefix.endsWith('/') ? assetPrefix : assetPrefix + '/'


module.exports = withOffline({
        publicRuntimeConfig: {
            assetPrefix: serverConfig.NEXTJS_ASSET_PREFIX,
            ...(serverConfig.CLIENT || {})
        },
        assetPrefix: serverConfig.NEXTJS_ASSET_PREFIX,
        workboxOpts: workboxConfig,
        registerSwPrefix: '/kubernetes-project' /** prefix for srvice-worker route should be same NEXTJS_ASSET_PREFIX of int/qa/prod */,
        scope: '/kubernetes-projectp/',
        webpack(config, {isServer, webpack}) {
            if (!isServer) {
                if (['1'].includes(process.env.ANALYZE)) {
                    config.plugins.push(
                        new BundleAnalyzerPlugin({
                            analyzerMode: 'static',
                            openAnalyzer: true
                        })
                    );
                }
            }

            config.plugins.unshift(new webpack.IgnorePlugin(/server\.config/));
            return config;
        }
    }
);