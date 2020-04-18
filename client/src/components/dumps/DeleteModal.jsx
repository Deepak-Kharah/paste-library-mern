import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteDump } from '../../actions/dump';
import { Redirect } from 'react-router-dom';

class DeleteModal extends Component {
    state = {
        deleted: false
    };

    static propTypes = {
        deleteDump: PropTypes.func.isRequired
    };

    render() {
        const { deleteId, deleteDump } = this.props;
        if (this.state.deleted) {
            return <Redirect to="/dashboard" />;
        }
        return (
            <div
                className="modal fade"
                tabIndex="-1"
                role="dialog"
                aria-labelledby="deleteModal"
                aria-hidden="true"
                id="deleteModal"
            >
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Delete dump?</h5>
                        </div>
                        <div className="modal-body">
                            <p>
                                Are you sure you want to <span className="text-danger font-weight-bold">
                                    delete
                                </span>{' '}
                                the dump?
                            </p>
                            <p>
                                this step is <span className="text-danger font-weight-bold">ireversible</span>.
                            </p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" data-dismiss="modal">
                                <i className="far fa-times" /> Cancel
                            </button>
                            <button
                                onClick={() => {
                                    deleteDump(deleteId);
                                    this.setState({ deleted: true });
                                }}
                                data-dismiss="modal"
                                type="button"
                                className="btn btn-outline-danger"
                            >
                                <i className="far fa-trash-alt" /> Confirm delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(null, { deleteDump })(DeleteModal);
