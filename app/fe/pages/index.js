import React from 'react';
import Body from '../components/Body';
import { SET_PAGE_NAME } from "../redux/actions";

const Index = () => {
    return <Body />;
};

Index.getInitialProps = function(props){
    const { ctx: { reduxStore } } = props;
    reduxStore.dispatch({ type: SET_PAGE_NAME, payload: "root" });
};

export default (Index);