import React from 'react';
import PropTypes from 'prop-types';
import { FlatButton } from 'material-ui';

const GoogleLoginButton = () =>
  <a href="/api/auth/google">
    <FlatButton label="Log in with Google" />
  </a>;

export default GoogleLoginButton;
