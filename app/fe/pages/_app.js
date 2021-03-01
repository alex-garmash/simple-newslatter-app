import React from 'react';
import App from 'next/app';
import Head from 'next/head';
import { create } from 'jss';
import withReduxStore from '../redux/next_store';
import { ThemeProvider as ScThemProvider } from 'styled-components';
import { theme } from '../styles/theme';
import { jssPreset, ThemeProvider, StylesProvider } from '@material-ui/styles';
import { GlobalStyle } from '../styles/globalStyled';
import { Provider } from 'react-redux';
const jss = create({ plugins: [...jssPreset().plugins] });

class MyApp extends App {
    static async getInitialProps({ Component, ...ctx }) {
        let pageProps;
        if (Component.getInitialProps){
            pageProps = await Component.getInitialProps(ctx);
        }
        return {
            pageProps
        };
    }

    componentDidMount() {
        // stuff for IE
        let ua = window.navigator.userAgent;
        let old_ie = ua.indexOf("MSIE ");
        let new_ie = ua.indexOf("Trident/");
        if (old_ie > -1 || new_ie > -1) {
            document.body.setAttribute("class", "ieClass");
        }
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
            jssStyles.parentNode.removeChild(jssStyles);
        }

    }

    render() {
        const { Component, pageProps } = this.props;

        return (
            <React.Fragment>
                <Head>
                    <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no" />
                    <title>PROJECT</title>
                </Head>
                <Provider store={this.props.reduxStore}>
                    <StylesProvider jss={jss}>
                        {/* Styled components theme provider.*/}
                        <ScThemProvider theme={theme}>
                            {/* Mui theme provider.*/}
                            <ThemeProvider theme={theme}>
                                <GlobalStyle />
                                <Component {...pageProps} />
                            </ThemeProvider>
                        </ScThemProvider>
                    </StylesProvider>
                </Provider>
            </React.Fragment>
        );
    }
}

export default withReduxStore(MyApp);