import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import Home from './components/layout/Home';
import Navbar from './components/layout/Navbar';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import About from './components/promotion/About';
import ContactUs from './components/promotion/ContactUs';

import store from './store';

const App = () => (
    <Provider store={store}>
        <Router>
            <Navbar />
            <div className="container">
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

export default App;
