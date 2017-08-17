import React from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form/immutable';

import SignUpComponent from './../../components/auth/signup';
import { signUp } from './../../store/actionCreators/auth_action_creators';
import {
  validateEmail,
  validatePasswordAgain,
  required,
  validateIsEmailUnique as asyncValidate
} from './../../services/validators';

//TODO: submit validation
const SignUpContainer = props =>
  <SignUpComponent
    {...props}
    required={required}
    validateEmail={validateEmail}
    validatePasswordAgain={validatePasswordAgain}
    signUpHandler={props.handleSubmit(formProps => {
      props.signUp({
        userName: formProps.get('userName'),
        email: formProps.get('email'),
        password: formProps.get('password')
      });
      props.reset();
    })}
  />;

export default connect(null, { signUp })(
  reduxForm({ form: 'signup', asyncValidate })(SignUpContainer)
);
