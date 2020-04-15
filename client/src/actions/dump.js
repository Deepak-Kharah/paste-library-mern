import axios from 'axios';

import { GET_DUMPS, DUMP_ERROR, CREATE_DUMP } from './types';
import { setAlert } from './alert';

// Get user dumps
export const getDumps = () => async (dispatch) => {
    try {
        const res = await axios.get('/api/d');

        dispatch({
            type: GET_DUMPS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: DUMP_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

// Create dump
export const createDump = (formData) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    try {
        const res = await axios.post('/api/d', formData, config);

        dispatch({
            type: CREATE_DUMP,
            payload: res.data
        });

        dispatch(setAlert('New paste dump created', 'success'));
    } catch (err) {
        dispatch({
            type: DUMP_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};
