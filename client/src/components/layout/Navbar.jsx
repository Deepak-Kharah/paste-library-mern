import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { logout } from '../../actions/auth';

const Navbar = ({ auth: { isAuthenticated, loading, user }, logout }) => {
    const authLinks = (
        <Fragment>
            <li className="nav-item">
                <Link to="/dashboard" className="btn btn-primary">
                    <i className="far fa-tachometer-alt-fast" />&nbsp;&nbsp;Dashboard
                </Link>
            </li>
            <li className="nav-item dropdown">
                <a
                    className="nav-link dropdown-toggle"
                    href="#!"
                    id="navbarDropdown"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                >
                    Welcome, {user && user.username}
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <Link className="dropdown-item" to="/profile">
                        <i className="far fa-user" />
                        &nbsp;&nbsp;Profile
                    </Link>
                    <div className="dropdown-divider" />
                    <a onClick={logout} className="dropdown-item text-danger" href="#!">
                        <i className="far fa-power-off" />
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
