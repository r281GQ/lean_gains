import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form/immutable';
import { FlatButton } from 'material-ui';
import { Link } from 'react-router-dom';

import SignUpComponent from './../components/auth/signup';
import { signUp } from './../store/actionCreators/auth_action_creators';

const passwordAgainValidate = (password, allValue) =>
  allValue.get('password') === allValue.get('passwordAgain')
    ? undefined
    : `passwords don't match`;

const validateEmail = email =>
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  )
    ? undefined
    : 'email is not valid';

const asyncValidate = values =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, 2000);
  }).then(() => ({
    email: 'ffff'
  }));

const SignUpContainer = props =>
  <div>
    <SignUpComponent
      {...props}
      validateEmail={validateEmail}
      validatePasswordAgain={passwordAgainValidate}
      signUpHandler={props.handleSubmit(
        ({ name, username, email, password }) => {
          props.signUp({ name, username, email, password });
          props.reset();
        }
      )}
    />
    <Link to="/login">
      <FlatButton label="Click here if you already have an account" />
    </Link>
    <Link to="/google">
      <FlatButton label="Click here if you wish to log in with google" />
    </Link>
  </div>;

const mapDispatchToProps = dispatch => {
  return {
    signUp: userInfo => dispatch(signUp(userInfo))
  };
};

export default connect(null, mapDispatchToProps)(
  reduxForm({ form: 'signup', asyncValidate })(SignUpContainer)
);
