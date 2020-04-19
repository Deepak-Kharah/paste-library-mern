import React from 'react';
import './NotFound.css';

const NotFound = () => {
    return (
        <div id="notfound-generic">
            <div className="notfound-generic">
                <div className="notfound-generic-404">
                    <h3>Oops! Page not found</h3>
                    <h1>
                        <span>4</span>
                        <span>0</span>
                        <span>4</span>
                    </h1>
                </div>
                <h2>
                    So, you are exploring the site. <span className="font-weight-bold">Great</span>. But there
                    isn&apos;t anything here worth the time looking.
                </h2>
                <br />
                <h2>
                    If you got here by clicking something in the UI, blame{' '}
                    <span className="font-weight-bold">Deepak Kharah</span>. He is responsible for everything
                    here.¯\_(ツ)_/¯
                </h2>
            </div>
        </div>
    );
};

export default NotFound;
