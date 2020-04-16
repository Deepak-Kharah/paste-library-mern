import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import CopyToClipboard from 'react-copy-to-clipboard';

import Loading from '../layout/Loading';
import { getDumps } from '../../actions/dump';
import setAuthToken from '../../utils/setAuthToken';
import './Dumps.css';

class Dumps extends Component {
    componentDidMount() {
        if (localStorage.token) {
            setAuthToken(localStorage.token);
        }
        this.props.getDumps();
    }

    static propTypes = {
        dump: PropTypes.object.isRequired,
        getDumps: PropTypes.func.isRequired
    };

    render() {
        const { dump: { dumps, loading } } = this.props;
        return loading ? (
            <Loading />
        ) : dumps.length === 0 ? (
            <div className="text-center text-small">You do not have any paste dump yet</div>
        ) : (
            <div>
                <div className="table-responsive-sm">
                    <table className="table table-hover table-striped">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">Title</th>
                                <th scope="col">Description</th>
                                <th scope="col" className="text-center">
                                    URL
                                </th>
                                <th scope="col" className="text-center">
                                    Last updated
                                </th>
                                <th scope="col" className="text-center">
                                    Expires
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {dumps.map((dump) => {
                                return (
                                    <tr key={dump._id}>
                                        <th scope="row">
                                            <Link className="text-reset link-unstyled" to={`/d/${dump.slug}`}>
                                                {dump.title || '-'}
                                            </Link>
                                        </th>
                                        <td>
                                            <Link className="text-reset link-unstyled" to={`/d/${dump.slug}`}>
                                                {dump.text.length > 50 ? dump.text.slice(0, 50) + '...' : dump.text}
                                            </Link>
                                        </td>
                                        <td className="slug text-center">
                                            <CopyToClipboard
                                                text={`${window
                                                    ? window.location.protocol + '//' + window.location.host
                                                    : ''}/d/${dump.slug}`}
                                            >
                                                <span data-toggle="tooltip" data-html="true" title="Click to Copy">
                                                    {dump.slug}
                                                </span>
                                            </CopyToClipboard>
                                        </td>
                                        <td className="text-muted small text-center">
                                            <Moment fromNow>{dump.updatedAt}</Moment>
                                        </td>
                                        <td className="text-muted small text-center">
                                            <Moment fromNow>{dump.expiration_date}</Moment>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    dump: state.dump
});

export default connect(mapStateToProps, { getDumps })(Dumps);
