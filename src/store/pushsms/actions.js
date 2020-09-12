import {
    GET_ACCOUNT_FETCH,
    GET_ACCOUNT_SUCCESS,
    GET_ACCOUNT_FAILURE,
    DELIVERY_MESSAGE_FETCH,
    DELIVERY_MESSAGE_SUCCESS,
    DELIVERY_MESSAGE_FAILURE,
    GET_STATUS_FETCH,
    GET_STATUS_SUCCESS,
    GET_STATUS_FAILURE
} from "./types";
import { withAuthPUSHSMS } from '../reducers';

export const getAccount = () => async dispatch => {
    dispatch({ type: GET_ACCOUNT_FETCH });

    const response = await fetch(`https://api.pushsms.ru/api/amo/account/`, {
        method: 'GET',
        headers: withAuthPUSHSMS(),
    });

    if (response.ok) {
        dispatch({
            type: GET_ACCOUNT_SUCCESS,
            payload: await response.json()
        });
    } else {
        dispatch({
            type: GET_ACCOUNT_FAILURE,
            payload: `${response.status} ${response.statusText}`
        });
    }
}

export const deliveryMessage = (data) => async dispatch => {
    dispatch({ type: DELIVERY_MESSAGE_FETCH });

    const response = await fetch(`https://api.pushsms.ru/api/amo/delivery/`, {
        method: 'POST',
        headers: withAuthPUSHSMS(
            { 'Content-Type': 'application/json' }
        ),
        body: JSON.stringify(data)
    });

    if (response.ok) {
        dispatch({
            type: DELIVERY_MESSAGE_SUCCESS,
            payload: await response.json()
        });
    } else {
        dispatch({
            type: DELIVERY_MESSAGE_FAILURE,
            payload: await response.json()
        });
    }
}

export const getStatusMessage = id => async dispatch => {
    dispatch({ type: GET_STATUS_FETCH });

    const response = await fetch(`https://api.pushsms.ru/api/amo/delivery/${id}`, {
        method: 'GET',
        headers: withAuthPUSHSMS(),
    });

    if (response.ok) {
        dispatch({
            type: GET_STATUS_SUCCESS,
            payload: await response.json()
        });
    } else {
        dispatch({
            type: GET_STATUS_FAILURE,
            payload: await response.json()
        });
    }
}