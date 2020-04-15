import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import About from './components/promotion/About';
import Alert from './components/layout/Alert';
import ContactUs from './components/promotion/ContactUs';
import Home from './components/layout/Home';
import Login from './components/auth/Login';
import Navbar from './components/layout/Navbar';
import Register from './components/auth/Register';
import Dashboard from './components/dashboard/Dashboard';
import Profile from './components/profile/Profile';
import PrivateRoute from './components/routing/PrivateRoute';
import Dump from './components/dumps/Dump';
import setAuthToken from './utils/setAuthToken';
import { loadUser } from './actions/auth';

import store from './store';

if (localStorage.token) {
    setAuthToken(localStorage.token);
}

class App extends Component {
    componentDidMount() {
        store.dispatch(loadUser());
    }

    render() {
        return (
            <Provider store={store}>
                <Router>
                    <Navbar />
                    <div className="container">
                        <Alert />
                        <Route exact path="/" component={Home} />
                        <Switch>
                            <Route exact path="/login" component={Login} />
                            <Route exact path="/register" component={Register} />
                            <Route exact path="/contact-us" component={ContactUs} />
                            <Route exact path="/about" component={About} />
                            {/* <Route exact path="/test" component={Loading} /> */}
                            <Route exact path="/d/:slug" component={Dump} />
                            <PrivateRoute exact path="/profile" component={Profile} />
                            <PrivateRoute exact path="/dashboard" component={Dashboard} />
                        </Switch>
                    </div>
                </Router>
            </Provider>
        );
    }
}

export default App;
