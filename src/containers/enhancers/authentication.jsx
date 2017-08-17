import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { whoAmI } from './../../store/actionCreators/auth_action_creators';

const withAuthentication = WrappedComponent => {
  class AuthenticationContainer extends PureComponent {
    componentDidMount() {
      this.props.whoAmI();
      // if (!this.props.isAuthenticated) this.props.whoAmI();
    }

    render() {
      return this.props.isAuthenticated
        ? <WrappedComponent />
        : <Redirect to="/login" />;
    }
  }

  AuthenticationContainer.propTypes = {
    isAuthenticated: PropTypes.bool,
    whoAmI: PropTypes.func.isRequired
  };

  const mapStateToProps = state => {
    return {
      isAuthenticated: state.getIn(['auth', 'authenticated'])
    };
  };

  return connect(mapStateToProps, { whoAmI })(AuthenticationContainer);
};

export default withAuthentication;
