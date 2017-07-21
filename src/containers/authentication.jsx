import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

export default function(WrappedComponent) {
  const mapStateToProps = state => {
    return {
      isAuthenticated: state.getIn(['auth', 'authenticated'])
    };
  };

  class AuthenticationContainer extends PureComponent {
    componentWillMount = () =>
      !this.props.isAuthenticated ? this.props.push('/login') : null;

    componentWillReceiveProps = nextState =>
      !this.props.isAuthenticated ? this.props.push('/login') : null;

    render = () => {
      return <WrappedComponent {...this.props} />;
    };
  }

  return connect(mapStateToProps, { push })(AuthenticationContainer);
}
