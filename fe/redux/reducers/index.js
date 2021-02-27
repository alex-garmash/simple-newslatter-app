import { SET_PAGE_NAME } from '../actions';

const reducer = (state, action) => {
    const { type, payload } = action;

    switch (type) {
        case SET_PAGE_NAME:
            return { ...state, pageName:payload};
    }

    return state;
};

export default reducer;