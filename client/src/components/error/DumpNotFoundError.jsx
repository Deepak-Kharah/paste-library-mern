import React from 'react';
import './DumpNotFoundError.css';
import { Link } from 'react-router-dom';

const DumpNotFoundError = () => {
    return (
        <div id="notfound">
            <div className="notfound">
                <div className="notfound-404">
                    <h1>Oops!</h1>
                    <h2>We could not found the dump.</h2>
                </div>

                <div id="resolutions">
                    <h2>What should you do?</h2>
                    <ul>
                        <li>
                            Make sure you have{' '}
                            <span className="mark font-weight-bold font-italic text-primary">correct</span> dump url or
                            slug code.
                        </li>
                        <li>
                            If you are sure about code, try {' '}
                            <span className="mark font-weight-bold font-italic text-primary">logging in</span>
                            . If you have made the dump private to access.
                        </li>
                    </ul>
                </div>
                <Link className="btn btn-primary" to="/">
                    Return to Homepage
                </Link>
            </div>
        </div>
    );
};

export default DumpNotFoundError;
