import React from 'react';
import Document, { Head,Html, Main, NextScript } from 'next/document';
import flush from 'styled-jsx/server';
import { ServerStyleSheet } from 'styled-components';
import { ServerStyleSheets } from '@material-ui/styles';
import config from '../client.config';


class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const sheet = new ServerStyleSheet();
        const sheets = new ServerStyleSheets();
        const originalRenderPage = ctx.renderPage;

        try {
            ctx.renderPage = () => originalRenderPage({
                enhanceApp: App => props => ({
                    ...sheet.collectStyles(<App {...props} />), ...sheets.collect(<App {...props} />)
                })
            });
            const initialProps = await Document.getInitialProps(ctx);
            return {
                ...initialProps,
                styles: (
                    <React.Fragment>
                        {sheets.getStyleElement()}
                        {sheet.getStyleElement()}
                        {flush() || null}
                    </React.Fragment>
                ),
            };
        } finally {
            sheet.seal();
        }
    }

    render() {
        return (
            <Html lang="en">
            <Head>
                <meta property="og:image" content={`${config.assetPrefix}/static/icons/favicon.ico`} />
                <meta charSet="utf-8" />
                {/* Use minimum-scale=1 to enable GPU rasterization */}
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                {/* PWA primary color */}
                <meta name="theme-color" content={'#684eed'} />
                <link rel="shortcut icon" type="image/x-icon" href={`${config.assetPrefix}/static/icons/favicon.ico`} />
                <script noModule={true} type="text/javascript" src={`${config.assetPrefix}/static/libs/polyfill.min.js`} />
                <link rel="manifest" href={`${config.assetPrefix}/static/manifest.json`} />
                <link rel="stylesheet" href={`${config.assetPrefix}/static/fonts/fonts.css`} />
                <script async type="text/javascript" src={config.assetPrefix + '/static/errlog.js'} />
                {process.env.IS_DEV === 'true' && (<link rel="stylesheet" href={config.assetPrefix + "/response-simulation-debugger/call/"} type="text/css" />)}
            </Head>
            <body>
            <Main />
            <NextScript />
            </body>
            </Html>
        );
    }
}

export default MyDocument;