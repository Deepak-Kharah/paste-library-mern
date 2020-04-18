import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import CopyToClipboard from 'react-copy-to-clipboard';

import { getDump } from '../../actions/dump';
import Loading from '../layout/Loading';
import DumpNotFoundError from '../error/DumpNotFoundError';
import './Dump.css';

import DeleteModal from './DeleteModal';

class Dump extends Component {
    static propTypes = {
        getDump: PropTypes.func.isRequired,
        dump: PropTypes.object.isRequired,
        auth: PropTypes.object.isRequired
    };

    componentDidMount() {
        this.props.getDump(this.props.match.params.slug);
    }

    render() {
        const { dump, loading, error: { status: error_status } } = this.props.dump;
        const { isAuthenticated, isLoading, user } = this.props.auth;

        if (error_status === 404) {
            return <DumpNotFoundError />;
        } else if (loading || !dump) {
            return <Loading />;
        } else {
            return (
                <Fragment>
                    <div className="card col-md-7 mx-auto  mt-5">
                        <div className="card-body">
                            <h1 className="card-title">{dump.title || 'Unknown title'}</h1>
                            <div className="card-subtitle small text-muted">
                                <span>
                                    <i className="far fa-clock small" /> created{' '}
                                    <Moment fromNow>{dump.createdAt}</Moment>
                                </span>
                                <span>
                                    <i className="far fa-ban small" /> expires{' '}
                                    <Moment fromNow>{dump.expiration_date}</Moment>
                                </span>
                                <span>
                                    <i
                                        className={`fa-user${dump.user.username === 'anonymous_user'
                                            ? '-secret fal'
                                            : ' small far'}`}
                                    />{' '}
                                    {dump.user.username}
                                </span>
                                <span
                                    id="access-method"
                                    data-toggle="tooltip"
                                    data-html="true"
                                    title="Access method"
                                    className={`access-method${dump.access === 'UNL' ? '-unlisted' : '-private'}`}
                                >
                                    {dump.access === 'UNL' ? (
                                        <Fragment>
                                            <i className="far fa-lock-open small" /> unlisted
                                        </Fragment>
                                    ) : (
                                        <Fragment>
                                            <i className="far fa-lock small" /> private
                                        </Fragment>
                                    )}
                                </span>
                            </div>
                            <CopyToClipboard text={`${dump.title ? dump.title.toString() + '\n' : ''}${dump.text}`}>
                                <button className="btn btn-outline-primary btn-sm my-2  card-subtitle">
                                    <i className="far fa-copy" /> copy
                                </button>
                            </CopyToClipboard>

                            {!isLoading && isAuthenticated && dump.user.id === user.id ? (
                                <div className="btn-group ml-3" role="group">
                                    {/* <button className="btn btn-sm btn-outline-primary">
                                        <i className="far fa-edit" /> Edit
                                    </button> */}
                                    <button
                                        className="btn btn-sm btn-outline-danger"
                                        data-toggle="modal"
                                        data-target="#deleteModal"
                                    >
                                        <i className="far fa-trash-alt" /> Delete
                                    </button>
                                </div>
                            ) : (
                                <Fragment />
                            )}
                            <hr />
                            <p className="card-text text-justify">{dump.text}</p>
                            <DeleteModal deleteId={dump._id} />
                        </div>
                    </div>
                </Fragment>
            );
        }
    }
}

const mapStateToProps = (state) => ({
    dump: state.dump,
    auth: state.auth
});

export default connect(mapStateToProps, { getDump })(Dump);
