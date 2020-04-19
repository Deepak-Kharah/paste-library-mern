import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import CookieConsent from 'react-cookie-consent';
import { Provider } from 'react-redux';

import { loadUser } from './actions/auth';

import Alert from './components/layout/Alert';
import Footer from './components/layout/Footer';
import Home from './components/layout/Home';
import Navbar from './components/layout/Navbar';

import Login from './components/auth/Login';
import Register from './components/auth/Register';

import Dashboard from './components/dashboard/Dashboard';
import Dump from './components/dumps/Dump';
import Profile from './components/profile/Profile';
import NotFound from './components/error/NotFound';

import About from './components/promotion/About';
import ContactUs from './components/promotion/ContactUs';
import CookiePolicy from './components/promotion/CookiePolicy';
import PrivacyPolicy from './components/promotion/PrivacyPolicy';
import TermsAndCondition from './components/promotion/TermsAndCondition';

import './App.css';
import PrivateRoute from './components/routing/PrivateRoute';
import setAuthToken from './utils/setAuthToken';
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
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <Route exact path="/login" component={Login} />
                            <Route exact path="/register" component={Register} />
                            <Route exact path="/contact-us" component={ContactUs} />
                            <Route exact path="/about" component={About} />
                            <Route exact path="/privacy-policy" component={PrivacyPolicy} />
                            <Route exact path="/cookie-policy" component={CookiePolicy} />
                            <Route exact path="/terms-and-condition" component={TermsAndCondition} />
                            {/* <Route exact path="/test" component={Loading} /> */}
                            <Route exact path="/d/:slug" component={Dump} />
                            <PrivateRoute exact path="/profile" component={Profile} />
                            <PrivateRoute exact path="/dashboard" component={Dashboard} />
                            <Route component={NotFound} />
                        </Switch>
                    </div>
                    <CookieConsent buttonClasses="btn btn-primary">
                        This website uses cookies to enhance the user experience. You can review our{' '}
                        <Link to="cookie-policy">Cookie policy</Link>
                    </CookieConsent>

                    <Footer />
                </Router>
            </Provider>
        );
    }
}

export default App;
