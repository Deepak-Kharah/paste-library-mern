import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import CopyToClipboard from 'react-copy-to-clipboard';

import { getDump } from '../../actions/dump';
import Loading from '../layout/Loading';
import './Dump.css';

class Dump extends Component {
    static propTypes = {
        getDump: PropTypes.func.isRequired,
        dump: PropTypes.object.isRequired
    };

    componentDidMount() {
        console.log(this.props.match.params.slug);
        this.props.getDump(this.props.match.params.slug);
    }

    render() {
        const { dump, loading } = this.props.dump;
        console.log(dump, loading);
        return loading ? (
            <Loading />
        ) : (
            <Fragment>
                <div className="card col-md-7 mx-auto  mt-5">
                    <div className="card-body">
                        <h1 className="card-title">{dump.title || 'Unknown title'}</h1>
                        <div className="card-subtitle small text-muted">
                            <span>
                                <i className="far fa-clock small" /> created <Moment fromNow>{dump.createdAt}</Moment>
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
                        <br />
                        <p className="card-text text-justify">{dump.text}</p>
                    </div>
                </div>
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
    dump: state.dump
});

export default connect(mapStateToProps, { getDump })(Dump);
