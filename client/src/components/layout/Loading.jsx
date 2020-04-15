import React from 'react';
import { ReactComponent as LoadingSvg } from '../../static/loading.svg';

const Loading = () => {
    return <div>{<LoadingSvg /> || <p>Loading...</p>}</div>;
};

export default Loading;
