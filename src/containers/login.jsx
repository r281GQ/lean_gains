import React from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form/immutable';
import { Redirect } from 'react-router-dom';

import LoginComponent from './../components/auth/login';
import { logIn } from './../store/actionCreators/auth_action_creators';

//TODO: validateEmail function
const LoginContainer = props =>
  props.isAuthenticated
    ? <Redirect to="/app" />
    : <LoginComponent
        {...props}
        validateEmail={value => value}
        handleSubmit={props.handleSubmit(({ email, password }) => {
          props.logIn({ password, email });
          props.reset();
        })}
      />;

const mapStateToProps = state => {
  return {
    isAuthenticated: state.getIn(['auth', 'authenticated'])
  };
};

const mapDispatchToProps = dispatch => ({
  logIn: userInfo => dispatch(logIn(userInfo))
});

export default connect(mapStateToProps, mapDispatchToProps)(
  reduxForm({ form: 'login' })(LoginContainer)
);
