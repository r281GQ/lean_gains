import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { TextField } from 'redux-form-material-ui';
import { FlatButton, Paper } from 'material-ui';
import { Link } from 'react-router-dom';

import GoogleLoginButton from './google_login_button';

import './../../index.css';

const LoginComponent = ({ handleSubmit, validateEmail }) =>
  <div className="login-container-upper">
    <div className="login-container-middle">
      <div className="login-container-inner">
    <Paper>
      <FlatButton disabled label="Log in" />
      <form onSubmit={handleSubmit}>
        <div>
          <Field
            name="email"
            type="text"
            hintText="Enter your email address"
            component={TextField}
          />
        </div>
        <div>
          <Field
            name="password"
            type="password"
            hintText="Enter your password"
            component={TextField}
          />
        </div>
        <FlatButton type="submit" label="Log in" />
        <Link to="/signup">
          <FlatButton label="Click here to sign up" />
        </Link>
        <div>
          <GoogleLoginButton />
        </div>
      </form>
    </Paper>
  </div>
    </div>
  </div>;

LoginComponent.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  validateEmail: PropTypes.func.isRequired
};

export default LoginComponent;
