import {
    ADD_PHONE,
    REMOVE_PHONE,
    INITIAL_PHONES
} from "./types"

export const initialPhones = phones => dispatch => {
    dispatch({
        type: INITIAL_PHONES,
        payload: phones
    });
}

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