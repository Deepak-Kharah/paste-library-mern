import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';

export class Register extends Component {
    state = {
        username: '',
        email: '',
        password: '',
        password2: '',
        consent: false
    };
    static propTypes = {
        setAlert: PropTypes.func.isRequired,
        register: PropTypes.func.isRequired,
        isAuthenticated: PropTypes.bool
    };

    onSubmit = async (e) => {
        const { username, email, password, password2, consent } = this.state;
        e.preventDefault();
        if (!password || !password2) {
            this.props.setAlert('Password is required.');
        } else if (password !== password2) {
            this.props.setAlert('Password does not match', 'danger');
            this.setState({ password: '', password2: '' });
        } else if (!consent) {
            this.props.setAlert('You must agree to terms and condition', 'danger');
        } else {
            this.props.register({ username, email, password });
        }
    };

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    render() {
        if (this.props.isAuthenticated) {
            return <Redirect to="/dashboard" />;
        }
        const { username, email, password, password2, consent } = this.state;

        return (
            <div className="col-md-6 m-auto">
                <div className="card card-body mt-5">
                    <h2 className="text-center">Register</h2>
                    <form className="mt-2" onSubmit={this.onSubmit}>
                        <small className="text-danger">*every field is required</small> <br />
                        <div className="form-group">
                            <label>Username</label>
                            <input
                                type="text"
                                className="form-control"
                                name="username"
                                onChange={this.onChange}
                                value={username}
                                placeholder="anonymous_user"
                                autoFocus
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="email"
                                className="form-control"
                                name="email"
                                placeholder="anonymoususer@example.com"
                                onChange={this.onChange}
                                value={email}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input
                                type="password"
                                name="password"
                                className="form-control"
                                onChange={this.onChange}
                                value={password}
                                minLength="6"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Confirm Password</label>
                            <input
                                type="password"
                                name="password2"
                                className="form-control"
                                onChange={this.onChange}
                                value={password2}
                                required
                            />
                            <small id="passwordHelpBlock" class="form-text text-muted">
                                Your password must be more than <span className="font-weight-bold">6 characters </span>
                                long.
                            </small>
                        </div>
                        <div className="form-group">
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    checked={consent}
                                    onChange={() => this.setState({ consent: !consent })}
                                    // required
                                />
                                <label className="form-check-label text-justify">
                                    I have read and agreed to{' '}
                                    <Link to="/terms-and-condition">Terms and Conditions</Link> and{' '}
                                    <Link to="/privacy-policy">Privacy policy</Link>.
                                </label>
                            </div>
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary">
                                Register
                            </button>
                        </div>
                        <p>
                            Already have an account? <Link to="/login">Login</Link>.
                        </p>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { setAlert, register })(Register);
