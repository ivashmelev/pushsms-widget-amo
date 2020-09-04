import { GET_ACCESS_TOKEN_SUCCESS, REFRESH_ACCESS_TOKEN_SUCCESS } from "./types";
import Cookie from "../../helpers/Cookie";

const initialState = {
    accessToken: '',
    isAuth: false
}

export default (state = initialState, action) => {
    switch (action.type) {

        case GET_ACCESS_TOKEN_SUCCESS:
        case REFRESH_ACCESS_TOKEN_SUCCESS: {

            const accessToken = action.payload.access_token;
            const refershToken = action.payload.refresh_token;
            const expiresIn = action.payload.expires_in;
            const cookie = new Cookie();

            cookie.set('refresh-token', refershToken, { 'max-age': expiresIn });

            return {
                ...state,
                accessToken,
                isAuth: true
            }
        }

        default: return state;
    }
}