import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { logout } from '../../actions/auth';

const Navbar = ({ auth: { isAuthenticated, loading, user }, logout }) => {
    const authLinks = (
        <Fragment>
            <li className="nav-item">
                <a href="/dashboard" className="btn btn-primary">
                    <i class="far fa-tachometer-alt-fast" />&nbsp;&nbsp;Dashboard
                </a>
            </li>
            <li class="nav-item dropdown">
                <a
                    class="nav-link dropdown-toggle"
                    href="#!"
                    id="navbarDropdown"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                >
                    Welcome, {user ? user.username : 'Anonymous user'}
                </a>
                <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                    <a class="dropdown-item" href="#!">
                        <i class="far fa-user" />
                        &nbsp;&nbsp;Profile
                    </a>
                    <div class="dropdown-divider" />
                    <a onClick={logout} class="dropdown-item text-danger" href="#!">
                        <i class="far fa-power-off" />
                        &nbsp;&nbsp;Logout
                    </a>
                </div>
            </li>
        </Fragment>
    );
    const guestLinks = (
        <Fragment>
            <li className="nav-item">
                <Link className="btn btn-primary" to="/register">
                    Sign up
                </Link>
            </li>
            <li>
                <Link className="nav-link" to="/login">
                    Login
                </Link>
            </li>
        </Fragment>
    );
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container">
                <Link className="navbar-brand" to="/">
                    <span style={{ fontWeight: 'bold' }}>Paste</span>
                    <span className="text-info">library</span>
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#  "
                    aria-controls="navbarColor01"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon" />
                </button>

                <div className="collapse navbar-collapse" id="navbarColor01">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/about">
                                About
                            </Link>
                        </li>
                        <li>
                            <Link className="nav-link" to="/contact-us">
                                Contact us
                            </Link>
                        </li>
                    </ul>

                    <ul className="navbar-nav ml-auto">
                        {!loading && <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

Navbar.prototype = {
    auth: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired
};
const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps, { logout })(Navbar);
