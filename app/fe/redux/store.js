import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';

export function initializeStore (initialState) {

    if(typeof window === 'object') {
        const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
        return createStore(reducers, initialState, composeEnhancers(applyMiddleware(thunk)));
    }
    return createStore(reducers, initialState, applyMiddleware(thunk));
}
