import React from 'react';
import DumpForm from '../dumps/DumpForm';
import DumpViewForm from '../dumps/DumpViewForm';

function Home() {
    return (
        <div className="container">
            <h1 className="text-center title mt-5">Create a new dump</h1>
            <br />
            <div className="col-md-5 mx-auto">
                <DumpForm />
            </div>
            <br />
            <h4 className="text-center title mt-5">Have an url? or dump code? paste it here.</h4>
            <div className="col-md-5 mx-auto">
                <DumpViewForm />
            </div>
        </div>
    );
}

export default Home;
