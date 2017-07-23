import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

const withAuthentication = WrappedComponent => {
  const AuthenticationContainer = ({ isAuthenticated }) =>
    isAuthenticated ? <WrappedComponent /> : <Redirect to="/login" />;

  const mapStateToProps = state => {
    return {
      isAuthenticated: state.getIn(['auth', 'authenticated'])
    };
  };
  
  return connect(mapStateToProps)(AuthenticationContainer);
};

export default withAuthentication;
