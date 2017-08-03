import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form/immutable';
import { TextField } from 'redux-form-material-ui';
import { FlatButton } from 'material-ui';

const SignUpComponent = ({
  signUpHandler,
  invalid,
  submitting,
  validateEmail,
  validatePasswordAgain
}) =>
  <form onSubmit={signUpHandler}>
    <br />
    <Field name="userName" component={TextField} floatingLabelText="username" />
    <br />
    <Field
      name="email"
      type="email"
      component={TextField}
      validate={validateEmail}
      floatingLabelText="email address"
    />
    <br />
    <Field
      name="password"
      type="password"
      component={TextField}
      floatingLabelText="password"
    />
    <br />
    <Field
      name="passwordAgain"
      type="password"
      component={TextField}
      floatingLabelText="password"
      validate={validatePasswordAgain}
    />
    <br />
    <FlatButton
      type="submit"
      label={'Sign Up'}
      disabled={invalid || submitting}
    />
  </form>;

  SignUpComponent.propTypes = {
    signUpHandler: PropTypes.func.isRequired,
    validateEmail: PropTypes.func.isRequired,
    validatePasswordAgain: PropTypes.func.isRequired
  }

export default SignUpComponent;
