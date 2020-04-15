import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { createDump } from '../../actions/dump';

class DumpForm extends Component {
    state = {
        title: '',
        text: '',
        password: '',
        access: 'UNL',
        expiration_date: ''
    };

    static propTypes = {
        createDump: PropTypes.func.isRequired
    };

    onSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);
    };

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    render() {
        const { title, text, access, expiration_date } = this.state;
        const { isAuthenticated, isLoading } = this.props.auth;
        const isDisabled = isLoading || !isAuthenticated;
        return (
            <div>
                <div className="card card-body">
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label>title</label>
                            <input
                                type="text"
                                className="form-control"
                                name="title"
                                onChange={this.onChange}
                                value={title}
                            />
                        </div>
                        <div className="form-group">
                            <label>
                                description <span className="text-danger">*</span>
                            </label>
                            <textarea
                                className="form-control"
                                name="text"
                                onChange={this.onChange}
                                value={text}
                                autoFocus
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>access</label>
                            <select className="form-control" name="access" onChange={this.onChange} value={access}>
                                <option value="UNL">Unlisted</option>
                                <option value="PVT" disabled={isDisabled}>
                                    Private {isDisabled ? '(for logged in users)' : ''}
                                </option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>
                                Expiration {isDisabled && <small className="font-italic">(for logged in users)</small>}
                            </label>
                            <input
                                type="date"
                                className="form-control"
                                name="expiration_date"
                                onChange={this.onChange}
                                value={expiration_date}
                                disabled={isDisabled}
                            />
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary">
                                Post
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps, { createDump })(DumpForm);
