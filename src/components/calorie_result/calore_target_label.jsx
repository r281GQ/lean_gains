import React from 'react';
import { FlatButton } from 'material-ui';

const CalorieTargetLabel = ({ value }) =>
  <FlatButton disabled label={value || 0} />;

export default CalorieTargetLabel;
