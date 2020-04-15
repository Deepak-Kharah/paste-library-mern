import React from 'react';
import DumpForm from '../dumps/DumpForm';

function Home() {
    return (
        <div className="container">
            <br />
            <h1>Create a new dump</h1>
            <div className="col-md-5 m-auto">
                <DumpForm />
            </div>
        </div>
    );
}

export default Home;
