import { GET_DUMPS, DUMP_ERROR, CLEAR_DUMPS, CREATE_DUMP, GET_DUMP, CLEAR_DUMP } from '../actions/types';

const initialState = {
    dumps: [],
    dump: null,
    newDump: null,
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
                dumps: [],
                loading: true,
                newDump: null,
                dump: null
            };
        case CREATE_DUMP:
            return {
                ...state,
                dumps: [ payload, ...state.dumps ],
                newDump: payload,
                loading: false
            };
        case CLEAR_DUMP:
            return {
                ...state,
                newDump: null,
                loading: false
            };

        case GET_DUMP:
            return {
                ...state,
                dump: payload,
                loading: false
            };
        default:
            return state;
    }
};
