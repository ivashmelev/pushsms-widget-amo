import { GET_ACCOUNT_SUCCESS, DELIVERY_MESSAGE_FETCH, DELIVERY_MESSAGE_SUCCESS, DELIVERY_MESSAGE_FAILURE, GET_STATUS_SUCCESS, GET_STATUS_FAILURE, CALCULATE_BULK_DELIVERY_FETCH, CALCULATE_BULK_DELIVERY_SUCCESS, CALCULATE_BULK_DELIVERY_FAILURE, DELIVERY_BULK_SUCCESS, DELIVERY_BULK_FAILURE } from "./types";

const initialState = {
    totalAmount: 0,
    senderNames: [],
    messageId: null,
    sum: null,
    isMessageSend: false,
    isCalcBulk: false,
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
        case CALCULATE_BULK_DELIVERY_FETCH: {
            return {
                ...state,
                isCalcBulk: true
            }
        }
        case CALCULATE_BULK_DELIVERY_SUCCESS: {

            const {
                enough_money,
                sms_per_delivery_count,
                approved_numbers_count,
                final_sum
            } = action.payload.calculate_result;

            let success = null;
            let error = null;
            // console.log(action.payload);

            if (enough_money) {
                success = `Будет отправлено: ${sms_per_delivery_count} смс.\n Всего номеров: ${approved_numbers_count}.\n Стоимость: ${final_sum} руб.`;
            } else {
                error = `Недостаточно средств`;
            }

            return {
                ...state,
                success,
                error,
                isCalcBulk: false
            }
        }
        case CALCULATE_BULK_DELIVERY_FAILURE: {
            return {
                ...state,
                isCalcBulk: false
            }
        }
        case DELIVERY_BULK_SUCCESS: {
            return {
                ...state,
                success: 'Доставлено.'
            }
        }
        case DELIVERY_BULK_FAILURE: {
            return {
                ...state,
                error: 'Произошла ошибка.'
            }
        }
        default: return state;
    }
}