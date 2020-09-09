import { combineReducers, createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { apiMiddleware } from "redux-api-middleware";
import logger from "redux-logger";
import auth from './auth/reducer';
import pushsms from './pushsms/reducer';

const storeReducer = combineReducers({
    auth, pushsms
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    storeReducer,
    composeEnhancers(
        applyMiddleware(thunk, apiMiddleware, logger),
    ),
);

export const withAuthAmo = (headers) => (state) => ({ ...headers, Authorization: `Bearer ${state.auth.accessToken}` });
export const withAuthPUSHSMS = (headers) => ({
    ...headers, authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJjdXN0b21lcl9pZCI6NTkwLCJkYXRldGltZSI6MTU5NTQyMjM1Nn0.j2w0F8wTEmDVf7X8KSVDeQ4R34Hzbeie0yaQ36nHhwo`
})

export default store;