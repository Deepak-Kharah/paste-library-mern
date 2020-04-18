import React, { Fragment } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { logout } from '../../actions/auth';

const Navbar = ({ auth: { isAuthenticated, loading, user }, logout }) => {
    const authLinks = (
        <Fragment>
            <li className="nav-item">
                <NavLink activeClassName="active" to="/dashboard" className="btn btn-primary">
                    <i className="far fa-tachometer-alt-fast" />&nbsp;&nbsp;Dashboard
                </NavLink>
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
                    <NavLink activeClassName="active" className="dropdown-item" to="/profile">
                        <i className="far fa-user" />
                        &nbsp;&nbsp;Profile
                    </NavLink>
                    <div className="dropdown-divider" />
                    <Link to="/" onClick={logout} className="dropdown-item text-danger" href="#!">
                        <i className="far fa-power-off" />
                        &nbsp;&nbsp;Logout
                    </Link>
                </div>
            </li>
        </Fragment>
    );
    const guestLinks = (
        <Fragment>
            <li className="nav-item">
                <NavLink activeClassName="active" className="btn btn-outline-success" to="/register">
                    Sign up
                </NavLink>
            </li>
            <li>
                <NavLink activeClassName="active" className="nav-link" to="/login">
                    Login
                </NavLink>
            </li>
        </Fragment>
    );
    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-primary mb-5">
            <div className="container">
                <Link className="navbar-brand" to="/">
                    <span style={{ fontWeight: 'bold' }}>Paste</span>
                    <span className="text-info">library</span>
                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon" />
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    {/* <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <NavLink activeClassName="active" className="nav-link" to="/about">
                                About
                            </NavLink>
                        </li>
                        <li>
                            <NavLink activeClassName="active" className="nav-link" to="/contact-us">
                                Contact us
                            </NavLink>
                        </li>
                    </ul> */}

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
