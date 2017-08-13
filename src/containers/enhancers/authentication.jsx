import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { whoAmI } from './../../store/actionCreators/auth_action_creators';

const withAuthentication = WrappedComponent => {
  class AuthenticationContainer extends PureComponent {
    componentDidMount() {
      if (!this.props.isAuthenticated) this.props.whoAmI();
    }

    render() {
      return this.props.isAuthenticated
        ? <WrappedComponent />
        : <Redirect to="/login" />;
    }
  }

  const mapStateToProps = state => {
    return {
      isAuthenticated: state.getIn(['auth', 'authenticated'])
    };
  };

  return connect(mapStateToProps, { whoAmI })(AuthenticationContainer);
};

export default withAuthentication;
