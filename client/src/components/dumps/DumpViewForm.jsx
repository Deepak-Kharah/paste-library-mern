import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import { setAlert } from '../../actions/alert';
import { getDump } from '../../actions/dump';

export class DumpViewForm extends Component {
    state = {
        url: '',
        slug: ''
    };
    static propTypes = {
        setAlert: PropTypes.func.isRequired,
        getDump: PropTypes.func.isRequired
    };

    onSubmit = async (e) => {
        let { url } = this.state;
        e.preventDefault();
        if (!url) {
            this.props.setAlert('url is required.', 'danger');
        } else {
            if (url.endsWith('/')) {
                url = url.slice(0, -1);
            }
            const urlArray = url.split('/');

            const slug = urlArray[urlArray.length - 1];

            this.setState({ slug });
        }
    };

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    render() {
        const { url, slug } = this.state;
        if (slug) {
            return <Redirect push to={`/d/${slug}`} target="_blank" />;
        }
        return (
            <div id="getDumpForm" className="mt-3">
                <form onSubmit={this.onSubmit}>
                    <div className="form-row">
                        <div className="form-group col">
                            <label htmlFor="url" className="sr-only" />
                            <input
                                type="text"
                                className="form-control"
                                name="url"
                                onChange={this.onChange}
                                value={url}
                                required
                            />
                        </div>
                        <div className="col-2">
                            <button type="submit" className="btn btn-primary form-col">
                                fetch
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default connect(null, { setAlert, getDump })(DumpViewForm);
