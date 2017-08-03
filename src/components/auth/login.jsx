import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { TextField } from 'redux-form-material-ui';
import FlatButton from 'material-ui/FlatButton';
import { Link } from 'react-router-dom';

const LoginComponent = ({ handleSubmit, validateEmail }) =>
  <div>
    <form onSubmit={handleSubmit}>
      <Field
        name="email"
        type="text"
        hintText="Enter your email address"
        component={TextField}
      />
      <Field
        name="password"
        type="password"
        hintText="Enter your password"
        component={TextField}
      />
      <FlatButton type="submit" label="Log in" />
      <Link to="/signup">
        <FlatButton label="Click here to sign up" />
      </Link>
    </form>
  </div>;

LoginComponent.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  validateEmail: PropTypes.func.isRequired
};

export default LoginComponent;
