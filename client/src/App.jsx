import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';

import About from './components/promotion/About';
import Alert from './components/layout/Alert';
import ContactUs from './components/promotion/ContactUs';
import Home from './components/layout/Home';
import Login from './components/auth/Login';
import Navbar from './components/layout/Navbar';
import Register from './components/auth/Register';
import setAuthToken from './utils/setAuthToken';
import { loadUser } from './actions/auth';

import store from './store';

if (localStorage.token) {
    setAuthToken(localStorage.token);
}

class App extends Component {
    componentDidMount() {
        store.dispatch(loadUser());
        console.log('i am used');
    }
    static propTypes = {
        loadUser: PropTypes.func.isRequired
    };

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
                        </Switch>
                    </div>
                </Router>
            </Provider>
        );
    }
}

export default App;
