import React from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form/immutable';
import { Redirect } from 'react-router-dom';
import LoginComponent from './../components/auth/login';
import GoogleLoginButton from './../components/auth/google_login_button'
import { logIn, googleLogin, whoAmI } from './../store/actionCreators/auth_action_creators';

const LoginContainer = props =>
  props.isAuthenticated ? <Redirect to="/app"/> :
  <div>
    <LoginComponent
      {...props}
      validateEmail = {value => value}
      google={props.googleLogIn}
      handleSubmit={props.handleSubmit(({ email, password }) => {
        props.logIn({ password, email });
        props.reset();
      })}
    />
    {/* <GoogleLoginButton googleLoginHandler = {props.googleLogIn} /> */}
  </div>;

  const mapStateToProps = state => {
    return {
      isAuthenticated: state.getIn(['auth', 'authenticated'])
    };
  };

  // <a href="/api/auth/google">login</a>
  // <button onClick={props.whoAmI}>whoAmI</button>
const mapDispatchToProps = dispatch => ({
  logIn: userInfo => dispatch(logIn(userInfo)),
  googleLogIn: () => dispatch(googleLogin()),
  whoAmI: () => dispatch(whoAmI())
});

export default connect(mapStateToProps, mapDispatchToProps)(
  reduxForm({ form: 'login' })(LoginContainer)
);
