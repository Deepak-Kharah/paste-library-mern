import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Loading from '../layout/Loading';

class Profile extends Component {
    static propTypes = {
        auth: PropTypes.object.isRequired
    };

    render() {
        const { isLoading, user: { username, email } } = this.props.auth;
        return (
            <Fragment>
                <br />
                <br />
                <div className="card" style={{ maxWidth: '50rem', margin: '0 auto' }}>
                    <div className="card-body">
                        <h1 className="card-title">My profile</h1>
                        <hr />
                        <br />
                        {isLoading ? (
                            <Loading />
                        ) : (
                            <Fragment>
                                <p className="card-subtitle text-secondary">username</p>
                                <h3 className="card-title text-primary">{username}</h3>
                                <br />
                                <p className="card-subtitle text-secondary">email</p>
                                <h3 className="card-title text-primary">{email}</h3>
                            </Fragment>
                        )}
                    </div>
                </div>
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps)(Profile);
