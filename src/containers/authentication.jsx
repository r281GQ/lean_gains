import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { whoAmI } from './../store/actionCreators/auth_action_creators';

// const withAuthentication = WrappedComponent => {
//   const AuthenticationContainer = ({ isAuthenticated }) =>
//     isAuthenticated ? <WrappedComponent /> : <Redirect to="/login" />;
//
//   const mapStateToProps = state => {
//     return {
//       isAuthenticated: state.getIn(['auth', 'authenticated'])
//     };
//   };
//
//   return connect(mapStateToProps)(AuthenticationContainer);
// };

const withAuthentication = WrappedComponent => {
  class AuthenticationContainer extends React.PureComponent {
    componentDidMount() {
      if(!this.props.isAuthenticated)this.props.whoAmI();
    }
    render() {
      console.log(this.props.isAuthenticated)
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

  const mapDispatchToProps = dispatch => {
    return {
      whoAmI: () => dispatch(whoAmI())
    };
  };

  return connect(mapStateToProps, mapDispatchToProps)(AuthenticationContainer);
};

export default withAuthentication;
