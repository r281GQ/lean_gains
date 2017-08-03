import React from 'react';
import PropTypes from 'prop-types';
import { FlatButton } from 'material-ui';

const SubmitButton = ({ label }) => <FlatButton type="submit" label={label} />;

SubmitButton.propTypes = {
  label: PropTypes.string.isRequired
};

export default SubmitButton;
