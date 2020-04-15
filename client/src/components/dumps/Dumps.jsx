import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';
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
        ) : (
            <div>
                <h1 className="title">My Dumps</h1>
                <div className="table-responsive-sm">
                    <table className="table table-hover table-striped" style={{}}>
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">Title</th>
                                <th scope="col">Description</th>
                                <th scope="col">URL</th>
                                <th scope="col">Last updated</th>
                                <th scope="col">Expires</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dumps.map((dump) => (
                                <tr key={dump._id}>
                                    <th scopr="row">{dump.title || '-'}</th>
                                    <td>{dump.text.length > 50 ? dump.text.slice(0, 50) + '...' : dump.text}</td>
                                    <td className="slug">
                                        <CopyToClipboard text={<Link to="/profile" />}>
                                            <span
                                                type="button"
                                                data-toggle="tooltip"
                                                data-html="true"
                                                title="Click to Copy"
                                            >
                                                {dump.slug}
                                            </span>
                                        </CopyToClipboard>
                                    </td>
                                    <td className="text-muted small">
                                        <Moment fromNow>{dump.updatedAt}</Moment>
                                    </td>
                                    <td className="text-muted small">
                                        <Moment fromNow>{dump.expiration_date}</Moment>
                                    </td>
                                </tr>
                            ))}
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
