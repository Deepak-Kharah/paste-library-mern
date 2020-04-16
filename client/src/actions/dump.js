import axios from 'axios';

import { GET_DUMPS, DUMP_ERROR, CREATE_DUMP, GET_DUMP, CLEAR_DUMP } from './types';
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
        console.error(err);

        dispatch({
            type: DUMP_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

// Get dump by slug
export const getDump = (slug) => async (dispatch) => {
    try {
        const res = await axios.get(`/api/d/${slug}`);

        dispatch({
            type: GET_DUMP,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: DUMP_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

// Clear dump
export const clearDump = () => async (dispatch) => dispatch({ type: CLEAR_DUMP });
