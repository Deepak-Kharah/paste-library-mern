import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class Register extends Component {
    state = {
        username: '',
        email: '',
        password: '',
        password2: ''
    };

    onSubmit = (e) => {
        const { password, password2 } = this.state;
        e.preventDefault();
        if (password !== password2) {
            console.error('wrong password');
        } else {
            console.log('submit');
        }
    };

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    render() {
        const { username, email, password, password2 } = this.state;
        return (
            <div className="col-md-6 m-auto">
                <div className="card card-body mt-5">
                    <h2 className="text-center">Register</h2>
                    <form onSubmit={this.onSubmit}>
                        <small className="text-danger">*every field is required</small> <br />
                        <div className="form-group">
                            <label>Username</label>
                            <input
                                type="text"
                                className="form-control"
                                name="username"
                                onChange={this.onChange}
                                value={username}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="email"
                                name="email"
                                className="form-control"
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
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary">
                                Register
                            </button>
                        </div>
                        <p>
                            Already have an account? <Link to="/login">Login</Link>
                        </p>
                    </form>
                </div>
            </div>
        );
    }
}

export default Register;
