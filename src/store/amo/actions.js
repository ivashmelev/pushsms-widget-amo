import {
    ADD_PHONE,
    REMOVE_PHONE,
    GET_LEAD_FETCH,
    GET_LEAD_SUCCESS,
    GET_LEAD_FAILURE
} from "./types"
import { PORTAL_URL } from "..";
import { withAuthAmo } from "../reducers";

export const addPhone = phone => dispatch => {
    dispatch({
        type: ADD_PHONE,
        payload: phone
    });
}

export const removePhone = index => dispatch => {
    dispatch({
        type: REMOVE_PHONE,
        payload: index
    });
}

export const getLead = id => async dispatch => {
    dispatch({ type: GET_LEAD_FETCH });

    const response = await fetch(`${PORTAL_URL}/api/v4/leads/${id}`, {
        method: 'GET',
        headers: withAuthAmo(),
    });

    if (response.ok) {
        dispatch({
            type: GET_LEAD_SUCCESS,
            payload: await response.json()
        });
    } else {
        dispatch({
            type: GET_LEAD_FAILURE,
            payload: await response.json()
        });
    }
}