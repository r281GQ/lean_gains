import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form/immutable';
import { Redirect } from 'react-router-dom';

import LoginComponent from './../../components/auth/login';
import { logIn } from './../../store/actionCreators/auth_action_creators';
import { validateEmail } from './../../services/validators';

//TODO: validateEmail function
const LoginContainer = props =>
  props.isAuthenticated
    ? <Redirect to="/app" />
    : <LoginComponent
        {...props}
        validateEmail={validateEmail}
        handleSubmit={props.handleSubmit(formProps => {
          props.logIn({
            password: formProps.get('password'),
            email: formProps.get('email')
          });
          props.reset();
        })}
      />;

LoginContainer.propTypes = {
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.getIn(['auth', 'authenticated'])
  };
};

export default connect(mapStateToProps, { logIn })(
  reduxForm({ form: 'login' })(LoginContainer)
);
