import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form/immutable';
import { Redirect } from 'react-router-dom';

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
  props.isAuthenticated
    ? <Redirect to="/app" />
    : <SignUpComponent
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

SignUpContainer.propTypes = {
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.getIn(['auth', 'authenticated'])
  };
};

export default connect(mapStateToProps, { signUp })(
  reduxForm({ form: 'signup', asyncValidate })(SignUpContainer)
);
