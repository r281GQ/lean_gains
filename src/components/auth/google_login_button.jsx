import React from 'react';
import PropTypes from 'prop-types';
import { FlatButton } from 'material-ui';

const GoogleLoginButton = ({ googleLoginHandler }) =>
  <FlatButton onClick={googleLoginHandler} label="Log in with Google" />;

GoogleLoginButton.propTypes = {
  googleLoginHandler: PropTypes.func.isRequired
};

export default GoogleLoginButton;
