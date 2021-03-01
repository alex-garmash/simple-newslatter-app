import React from 'react';
import AdminPage from '../components/AdminPage';
import { SET_PAGE_NAME } from "../redux/actions";

const Admin = () => {
    return <AdminPage />;
};

Admin.getInitialProps = function(props){
    const { ctx: { reduxStore } } = props;
    reduxStore.dispatch({ type: SET_PAGE_NAME, payload: "admin" });
};

export default Admin;