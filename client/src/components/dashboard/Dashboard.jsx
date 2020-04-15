import React, { Component } from 'react';

import Dumps from '../dumps/Dumps';
import DumpForm from '../dumps/DumpForm';

class Dashboard extends Component {
    render() {
        return (
            <div>
                <br />
                <h1>Dashboard</h1>
                <div className="mt-5">
                    <h2 className="title">Create new dump</h2>
                    <br />
                    <DumpForm />
                </div>
                <div className="mt-5">
                    <h2 className="title">My Dumps</h2>
                    <br />
                    <Dumps />
                </div>
            </div>
        );
    }
}

export default Dashboard;
