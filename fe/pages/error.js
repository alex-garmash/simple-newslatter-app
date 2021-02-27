import React from 'react';
import styled from 'styled-components';
import { GlobalStyle } from '../styles/globalStyled';
import Head from "next/head";

const ErrorComponent = (props) => {
    return (
        <ErrorComponentStyle>
            <Head>
                <title>ERROR PAGE 404</title>
            </Head>
            <GlobalStyle background={''} isErrorPage={true} />
            <h1 data-mnr-bo="error-primary-message">{props.primaryMessage}</h1>
            <div className={"server-error-message"} style={{display: 'none'}}>{props.serverErrorMessage || 'unknown error'}</div>
        </ErrorComponentStyle>
    );
};

const ErrorComponentStyle = styled.div`
    overflow-x: hidden;
    text-align: center;
    
    h1 {
      font-weight: 500;
      font-size: 62px;
    }
    .error-man {
      position: fixed;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
    }

`;

ErrorComponent.getInitialProps = (props) => {
    const { ctx: { res } } = props;
    return {
        primaryMessage: 'הדף לא נמצא',
        ...res.data
    };
};

export default ErrorComponent;