import axios from 'axios';

import { GET_DUMPS, DUMP_ERROR } from './types';

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
