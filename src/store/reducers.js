import { combineReducers, createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { apiMiddleware } from "redux-api-middleware";
import logger from "redux-logger";
import pushsms from './pushsms/reducer';
import amo from './amo/reducer';

const storeReducer = combineReducers({
    pushsms, amo
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    storeReducer,
    composeEnhancers(
        applyMiddleware(thunk, apiMiddleware, logger),
    ),
);


export const withAuthPUSHSMS = (headers) => ({
    ...headers, authorization: `Bearer ${window.AMOWIDGET.params.pushsmsKey}`
});

export const getInfo = state => {
    if (state.pushsms.success) {
        return { status: 'success', desc: state.pushsms.success, };
    }

    if (state.pushsms.error) {
        return { status: 'error', desc: state.pushsms.error };
    }
}

export default store;