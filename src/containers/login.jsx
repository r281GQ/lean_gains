import React from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form/immutable';

import LoginComponent from './../components/auth/login';
import { logIn } from './../store/actionCreators/auth_action_creators';

const LoginContainer = props =>
  <div>
    <LoginComponent
      {...props}
      handleSubmit={props.handleSubmit(({ email, password }) => {
        props.logIn({ password, email });
        props.reset();
      })}
    />
  </div>;

const mapDispatchToProps = dispatch => ({
  logIn: userInfo => dispatch(logIn(userInfo))
});

export default connect(null, mapDispatchToProps)(
  reduxForm({ form: 'login' })(LoginContainer)
);
