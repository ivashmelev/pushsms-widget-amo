import { ADD_PHONE, REMOVE_PHONE, INITIAL_PHONES } from './types';

const initialState = {
    phones: [],
};

export default (state = initialState, action) => {
    switch (action.type) {
    case INITIAL_PHONES: {
        return {
            ...state,
            phones: action.payload,
        };
    }
    case ADD_PHONE: {
        const phones = [...state.phones];

        phones.push(action.payload);

        return {
            ...state,
            phones,
        };
    }
    case REMOVE_PHONE: {
        const phones = [...state.phones];

        phones.splice(action.payload, 1);

        return {
            ...state,
            phones,
        };
    }
    default: return state;
    }
};
