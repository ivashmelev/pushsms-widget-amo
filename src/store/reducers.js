import { combineReducers, createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { apiMiddleware } from "redux-api-middleware";
import logger from "redux-logger";
import auth from './auth/reducer';

const storeReducer = combineReducers({
    auth
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    storeReducer,
    composeEnhancers(
        applyMiddleware(thunk, apiMiddleware, logger),
    ),
);

const withAuthAmo = (headers) => (state) => ({ ...headers, Authorization: `Bearer ${state.auth.accessToken}` });
const withAuthPUSHSMS = (headers) => ({ ...headers, Authorization: `Bearer ${window.AMOWIDGET.pushsmsKey}` })

export default store;