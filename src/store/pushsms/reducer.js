import { GET_ACCOUNT_SUCCESS, DELIVERY_MESSAGE_FETCH, DELIVERY_MESSAGE_SUCCESS, DELIVERY_MESSAGE_FAILURE, GET_STATUS_SUCCESS, GET_STATUS_FAILURE } from "./types";

const initialState = {
    totalAmount: 0,
    senderNames: [],
    messageId: null,
    sum: null,
    isMessageSend: false,
    error: null,
    success: null
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
        case DELIVERY_MESSAGE_FETCH: {
            return {
                ...state,
                isMessageSend: true,
                sum: null,
                error: null,
                success: null
            }
        }
        case DELIVERY_MESSAGE_SUCCESS: {
            return {
                ...state,
                messageId: action.payload.delivery.id
            }
        }
        case DELIVERY_MESSAGE_FAILURE:
        case GET_STATUS_FAILURE: {

            const error = Object.values(action.payload.meta.errors).join('\n');

            return {
                ...state,
                error,
                isMessageSend: false
            }
        }
        case GET_STATUS_SUCCESS: {
            return {
                ...state,
                success: action.payload.delivery.status.description,
                sum: action.payload.delivery.sum,
                isMessageSend: false
            }
        }
        default: return state;
    }
}