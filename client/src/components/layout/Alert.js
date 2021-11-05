import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './Alert.scss';

const Alert = ({ alerts }) =>
  alerts.map((alert) => (
    <div key={alert.id} className={`alert alert-${alert.alertType}`}>
      <p>{alert.msg}</p>
    </div>
  ));

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps)(Alert);
