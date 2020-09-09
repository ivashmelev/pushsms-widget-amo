import { GET_ACCOUNT_FETCH, GET_ACCOUNT_SUCCESS, GET_ACCOUNT_FAILURE } from "./types";
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