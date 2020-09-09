import { GET_ACCOUNT_SUCCESS } from "./types";

const initialState = {
    totalAmount: 0,
    senderNames: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_ACCOUNT_SUCCESS: {

            const totalAmount = action.payload.account.total_amount;
            const senderNames = action.payload.account.sender_names;

            return {
                ...state,
                totalAmount,
                senderNames
            }
        }
        default: return state;
    }
}