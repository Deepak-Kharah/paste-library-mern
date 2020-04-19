import React, { Fragment } from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Footer = ({ auth: { isAuthenticated, isLoading } }) => {
    const authLinks = (
        <Fragment>
            <li>
                <Link to="/profile">Profile</Link>
            </li>
            <li>
                <Link to="/dashboard">dashboard</Link>
            </li>
        </Fragment>
    );

    const guestLinks = (
        <Fragment>
            <li>
                <Link to="/register">Sign up</Link>
            </li>
            <li>
                <Link to="/login">Log in</Link>
            </li>
        </Fragment>
    );
    return (
        <footer className="site-footer mt-5">
            <div className="container">
                <div className="row">
                    <div className="col-sm-12 col-md-6">
                        <Link to="/">
                            <h5>Paste Library</h5>
                        </Link>
                        <p className="text-justify">
                            The goal here is to learn MERN stack by creating a paste-bin like service that client can
                            use to save and share text data by just using a slug url. This service will be leaning
                            towards more and more privacy in upcoming releases.
                        </p>
                    </div>

                    <div className="col-xs-6 col-md-3">
                        <h6>Quick Links</h6>
                        <ul className="footer-links">
                            <li>
                                <Link to="/">Home Page</Link>
                            </li>
                            <li>
                                <Link to="/#createDumpForm">Create Dump</Link>
                            </li>
                            <li>
                                <Link to="/#getDumpForm">Fetch Dump</Link>
                            </li>

                            {!isLoading && isAuthenticated ? (
                                <Fragment>{authLinks}</Fragment>
                            ) : (
                                <Fragment>{guestLinks}</Fragment>
                            )}
                        </ul>
                    </div>

                    <div className="col-xs-6 col-md-3">
                        <h6>Additional Links</h6>
                        <ul className="footer-links">
                            {/* <li>
                                <Link to="/about">About</Link>
                            </li>
                            <li>
                                <Link to="/contact-us">Contact Us</Link>
                            </li>
                            <li>
                                <a href="#!">Contribute</a>
                            </li> */}
                            <li>
                                <Link to="/cookie-policy">Cookie Policy</Link>
                            </li>
                            <li>
                                <Link to="/privacy-policy">Privacy Policy</Link>
                            </li>
                            <li>
                                <Link to="/terms-and-condition">Terms and Conditions</Link>
                            </li>
                            <li>
                                <a href="#!">Sitemap</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <hr />
            <div className="container">
                <div className="row">
                    <div className="col-md-8 col-sm-6 col-xs-12">
                        <p className="copyright-text">
                            Copyright &copy; 2020 All Rights Reserved by {' '}
                            <a href="https://github.com/Deepak-Kharah/">Deepak Kharah</a>.
                        </p>
                    </div>

                    <div className="col-md-4 col-sm-6 col-xs-12">
                        <ul className="social-icons">
                            <li>
                                <a
                                    className="github"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href="https://github.com/Deepak-Kharah/"
                                >
                                    <i className="fab fa-github" />
                                </a>
                            </li>
                            <li>
                                <a
                                    className="linkedin"
                                    rel="noopener noreferrer"
                                    target="_blank"
                                    href="https://www.linkedin.com/in/deepakkharah/"
                                >
                                    <i className="fab fa-linkedin" />
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
};

Footer.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps)(Footer);
