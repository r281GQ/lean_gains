import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form/immutable';
import { TextField } from 'redux-form-material-ui';
import { FlatButton, Paper, RaisedButton } from 'material-ui';

const SignUpComponent = ({
  signUpHandler,
  invalid,
  submitting,
  validateEmail,
  validatePasswordAgain,
  required
}) =>
  <div className="sign-up-container">
    <Paper className="sign-up-paper">
      <FlatButton disabled label="Sign up" />
      <form onSubmit={signUpHandler}>
        <div>
          <Field
            name="userName"
            validate={required('Username is required!')}
            component={TextField}
            floatingLabelText="Username"
          />
        </div>
        <div>
          <Field
            name="email"
            type="email"
            component={TextField}
            validate={[validateEmail, required('Email is required!')]}
            floatingLabelText="Email address"
          />
        </div>
        <div>
          <Field
            name="password"
            type="password"
            validate={required('Password is required!')}
            component={TextField}
            floatingLabelText="Password"
          />
        </div>
        <div>
          <Field
            name="passwordAgain"
            type="password"
            component={TextField}
            floatingLabelText="Password once more"
            validate={validatePasswordAgain}
          />
        </div>
        <div className="sign-up-button-container">
          <RaisedButton
            primary
            fullWidth
            type="submit"
            label="Sign Up"
            disabled={invalid || submitting}
          />
        </div>
      </form>
    </Paper>
  </div>;

SignUpComponent.propTypes = {
  required: PropTypes.func.isRequired,
  signUpHandler: PropTypes.func.isRequired,
  validateEmail: PropTypes.func.isRequired,
  validatePasswordAgain: PropTypes.func.isRequired
};

export default SignUpComponent;
