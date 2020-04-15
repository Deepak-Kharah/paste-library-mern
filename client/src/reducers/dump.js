import { GET_DUMPS, DUMP_ERROR, CLEAR_DUMPS, CREATE_DUMP } from '../actions/types';

const initialState = {
    dumps: [],
    dump: null,
    loading: true,
    error: {}
};

export default (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case GET_DUMPS:
            return {
                ...state,
                dumps: payload,
                loading: false
            };
        case DUMP_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            };
        case CLEAR_DUMPS:
            return {
                ...state,
                dumps: null,
                loading: false
            };
        case CREATE_DUMP:
            return {
                ...state,
                dumps: [ payload, ...state.dumps ],
                loading: false
            };
        default:
            return state;
    }
};
