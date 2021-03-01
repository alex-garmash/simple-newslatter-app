import { SET_PAGE_NAME } from './index';

export const setPageName = namePage => dispatch => {
    dispatch({
        type: SET_PAGE_NAME,
        payload: namePage
    });
};