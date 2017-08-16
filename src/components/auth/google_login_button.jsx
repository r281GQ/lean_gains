import React from 'react';
import { RaisedButton, FontIcon } from 'material-ui';

const GoogleLoginButton = () =>
  <RaisedButton
    href="/api/auth/google"
    label="Log in with Google"
    labelPosition="before"
    icon={<FontIcon className="fa fa-google" />}
  />;

export default GoogleLoginButton;
