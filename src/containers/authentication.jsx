import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import {Redirect} from 'react-router-dom'

export default function(WrappedComponent) {
  const mapStateToProps = state => {
    return {
      isAuthenticated: state.getIn(['auth', 'authenticated'])
    };
  };

  class AuthenticationContainer extends PureComponent {
    // componentWillMount = () =>
    //   !this.props.isAuthenticated ? this.props.push('/login') : null;
    // 
    // componentWillReceiveProps = nextProps =>
    //   !nextProps.isAuthenticated ? this.props.push('/login') : null;

    render = () => {
      return this.props.isAuthenticated ?  <WrappedComponent {...this.props} /> : <Redirect to='/login'/>;
    };
  }

  return connect(mapStateToProps, { push })(AuthenticationContainer);
}
