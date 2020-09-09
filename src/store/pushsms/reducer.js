import { GET_ACCOUNT_SUCCESS } from "./types";

const initialState = {
    totalAmount: 0
}

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_ACCOUNT_SUCCESS: {

            const totalAmount = action.payload.account.total_amount;

            return {
                ...state,
                totalAmount
            }
        }
        default: return state;
    }
}