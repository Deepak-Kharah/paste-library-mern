import React, { Component } from 'react';

import Dumps from '../dumps/Dumps';
import DumpForm from '../dumps/DumpForm';

class Dashboard extends Component {
    render() {
        return (
            <div>
                <h1>Dashboard</h1>
                <br />
                <h2 className="title">Create new dump</h2>
                <div className="md-04">
                    <DumpForm />
                </div>
                <h2 className="title">My Dumps</h2>
                <Dumps />
            </div>
        );
    }
}

export default Dashboard;
