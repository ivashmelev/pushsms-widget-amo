import { GET_ACCESS_TOKEN_FETCH, GET_ACCESS_TOKEN_SUCCESS, GET_ACCESS_TOKEN_FAILURE, REFRESH_ACCESS_TOKEN_FETCH, REFRESH_ACCESS_TOKEN_SUCCESS, REFRESH_ACCESS_TOKEN_FAILURE } from "./types"
import { PORTAL_URL, REDIRECT_URI } from "..";

export const getAccesToken = () => async (dispatch) => {
    dispatch({ type: GET_ACCESS_TOKEN_FETCH });

    const response = await fetch(`${PORTAL_URL}/oauth2/access_token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            code: window.AMOWIDGET.params.code,
            client_secret: window.AMOWIDGET.params.clientSecret,
            client_id: window.AMOWIDGET.params.oauth_client_uuid,
            grant_type: 'authorization_code',
            redirect_uri: REDIRECT_URI
        })
    });

    if (response.ok) {
        dispatch({
            type: GET_ACCESS_TOKEN_SUCCESS,
            payload: await response.json()
        });
    } else {
        dispatch({
            type: GET_ACCESS_TOKEN_FAILURE,
            payload: `${response.status} ${response.statusText}`
        });
    }
}

export const refreshAccessToken = (refreshToken) => async (dispatch) => {
    dispatch({ type: REFRESH_ACCESS_TOKEN_FETCH });

    const response = await fetch(`${PORTAL_URL}/oauth2/access_token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            refresh_token: refreshToken,
            client_secret: window.AMOWIDGET.params.clientSecret,
            client_id: window.AMOWIDGET.params.oauth_client_uuid,
            grant_type: 'refresh_token',
            redirect_uri: REDIRECT_URI
        })
    });

    if (response.ok) {
        dispatch({
            type: REFRESH_ACCESS_TOKEN_SUCCESS,
            payload: await response.json()
        });
    } else {
        dispatch({
            type: REFRESH_ACCESS_TOKEN_FAILURE,
            payload: `${response.status} ${response.statusText}`
        });
    }
}