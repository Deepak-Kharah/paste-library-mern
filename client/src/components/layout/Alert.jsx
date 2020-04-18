import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Alert = ({ alerts }) =>
    alerts !== null &&
    alerts.length > 0 &&
    alerts.map((alert) => (
        <div key={alert.id} className={`alert alert-${alert.alertType}`}>
            <i
                className={
                    alert.alertType === 'danger' ? (
                        'fas fa-exclamation'
                    ) : alert.alertType === 'warning' ? (
                        'far fa-regular'
                    ) : alert.alertType === 'info' ? (
                        'fas fa-info'
                    ) : (
                        'far fa-check'
                    )
                }
            />
            <span className="ml-2">{alert.msg}</span>
        </div>
    ));

Alert.propTypes = {
    alerts: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
    alerts: state.alert
});

export default connect(mapStateToProps)(Alert);
