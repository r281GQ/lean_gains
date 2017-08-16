import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  RaisedButton,
  Toolbar,
  ToolbarGroup,
  ToolbarSeparator,
} from 'material-ui';

import GoogleLoginButton from './../auth/google_login_button';

const UnauthanticatedHeader = ({ pathname }) =>
  <Toolbar style={{ backgroundColor: '#757575', color: '#EEEEEE' }}>
    <ToolbarGroup />
    <ToolbarGroup>
      {pathname === '/login'
        ? <Link to="/signup">
            <RaisedButton label="Sign up" />
          </Link>
        : <Link to="/login">
            <RaisedButton label="Log in" />
          </Link>}
      <ToolbarSeparator />
      <GoogleLoginButton />
    </ToolbarGroup>
  </Toolbar>;

UnauthanticatedHeader.propTypes = {
  pathname: PropTypes.string,
};

export default UnauthanticatedHeader;
