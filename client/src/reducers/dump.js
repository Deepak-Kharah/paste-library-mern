import {
    GET_DUMPS,
    DUMP_ERROR,
    CLEAR_DUMPS,
    CREATE_DUMP,
    GET_DUMP,
    CLEAR_DUMP,
    CLEAR_DUMP_ERROR,
    DELETE_DUMP
} from '../actions/types';

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
                dump: null,
                newDump: null,
                loading: true,
                error: {}
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
        case CLEAR_DUMP_ERROR:
            return {
                ...state,
                loading: true,
                error: []
            };
        case GET_DUMP:
            return {
                ...state,
                dump: payload,
                loading: false
            };
        case DELETE_DUMP:
            return {
                ...state,
                loading: false,
                dumps: state.dumps.filter((dump) => dump._id !== payload),
                dump: null
            };
        default:
            return state;
    }
};
