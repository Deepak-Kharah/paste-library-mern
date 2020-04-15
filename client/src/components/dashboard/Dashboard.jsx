import React, { Component } from 'react';

import Dumps from '../dumps/Dumps';

class Dashboard extends Component {
    render() {
        return (
            <div>
                <h1>Dashboard</h1>
                <Dumps />
            </div>
        );
    }
}

export default Dashboard;
