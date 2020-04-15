import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';

import { getDump } from '../../actions/dump';
import Loading from '../layout/Loading';
import './Dump.css';

class Dump extends Component {
    static propTypes = {
        getDump: PropTypes.func.isRequired,
        dump: PropTypes.object.isRequired
    };

    componentDidMount() {
        this.props.getDump(this.props.match.params.slug);
        console.log('i was run');
    }

    render() {
        const { dump: { dump, loading } } = this.props;
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
