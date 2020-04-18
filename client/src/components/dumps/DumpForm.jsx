import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CopyToClipboard from 'react-copy-to-clipboard';

import { createDump, clearDump } from '../../actions/dump';

class DumpForm extends Component {
    state = {
        title: '',
        text: '',
        password: '',
        access: 'UNL',
        expiration_date: ''
    };

    static propTypes = {
        createDump: PropTypes.func.isRequired,
        clearDump: PropTypes.func.isRequired,
        dump: PropTypes.object.isRequired,
        auth: PropTypes.object.isRequired
    };

    componentDidMount() {
        this.props.clearDump();
    }

    onSubmit = (e) => {
        const { title, text, password, access, expiration_date } = this.state;
        e.preventDefault();
        this.props.createDump({ title, text, password, access, expiration_date });
    };

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    render() {
        const { title, text, access, expiration_date } = this.state;
        const { isAuthenticated, isLoading } = this.props.auth;
        const { loading, newDump } = this.props.dump;
        const isDisabled = isLoading || !isAuthenticated;
        return (
            <div id="createDumpForm">
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
                                required
                            />
                        </div>
                        <div className="form-row">
                            <div className="form-group col-sm">
                                <label>access</label>
                                <select className="form-control" name="access" onChange={this.onChange} value={access}>
                                    <option value="UNL">Unlisted</option>
                                    <option value="PVT" disabled={isDisabled}>
                                        Private {isDisabled ? '(for logged in users)' : ''}
                                    </option>
                                </select>
                            </div>
                            <div className="form-group col-sm">
                                <label>
                                    Expiration{' '}
                                    {isDisabled && <small className="font-italic">(for logged in users)</small>}
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
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary">
                                Post {!isAuthenticated && 'Anonymously'}
                            </button>
                        </div>
                        {loading || !newDump ? (
                            ''
                        ) : (
                            <CopyToClipboard
                                data-toggle="tooltip"
                                data-html="true"
                                title="Click to Copy"
                                text={`${window
                                    ? window.location.protocol + '//' + window.location.host
                                    : ''}/d/${newDump.slug}`}
                            >
                                <div
                                    className="input-group"
                                    data-toggle="tooltip"
                                    data-html="true"
                                    title="Click to Copy"
                                >
                                    <div className="input-group-prepend">
                                        <div className="input-group-text text-primary bg-white">
                                            <i className="far fa-link" />
                                        </div>
                                    </div>
                                    <div className="form-control bg-white" value>
                                        {
                                            <span className="text-muted font-weight-light">
                                                {window ? (
                                                    window.location.protocol.toString() +
                                                    '//' +
                                                    window.location.host.toString()
                                                ) : (
                                                    ''
                                                )}/d/
                                            </span>
                                        }
                                        <span className="text-primary font-weight-bold">{newDump.slug}</span>
                                    </div>
                                </div>
                            </CopyToClipboard>
                        )}
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    dump: state.dump
});

export default connect(mapStateToProps, { createDump, clearDump })(DumpForm);
