import {
    combineReducers, createStore, compose, applyMiddleware,
} from 'redux';
import thunk from 'redux-thunk';
import { apiMiddleware } from 'redux-api-middleware';
import logger from 'redux-logger';
import pushsms from './pushsms/reducer';
import amo from './amo/reducer';
import { isDev } from '.';

const storeReducer = combineReducers({
    pushsms, amo,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    storeReducer,
    composeEnhancers(
        applyMiddleware(thunk, apiMiddleware, logger),
    ),
);

export const withAuthPUSHSMS = (headers) => ({
    // ...headers, authorization: `Bearer ${window.AMOWIDGET.params.pushsmsKey}`,
    ...headers,
    // authorization:
    // isDev
    authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJjdXN0b21lcl9pZCI6OSwiZGF0ZXRpbWUiOjE1NTU0MTY5Mzl9.J3VgVhzex1ohyP3k2dJrqOerw8a8uUvNf4qiyVcMqy8',
    //     : 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJjdXN0b21lcl9pZCI6NTkwLCJkYXRldGltZSI6MTU5NTQyMjM1Nn0.j2w0F8wTEmDVf7X8KSVDeQ4R34Hzbeie0yaQ36nHhwo',

});

export const getInfo = (state) => {
    if (state.pushsms.success) {
        return { status: 'success', desc: state.pushsms.success };
    }

    if (state.pushsms.error) {
        return { status: 'error', desc: state.pushsms.error };
    }
};

export default store;
