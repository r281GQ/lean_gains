import React from 'react';
import PropTypes from 'prop-types';
import { FlatButton } from 'material-ui';

const CalorieTargetLabel = ({ value }) =>
  value
    ? <FlatButton disabled label={value} />
    : <FlatButton disabled label="0" />;

CalorieTargetLabel.propTypes = {
  value: PropTypes.number
};

export default CalorieTargetLabel;
