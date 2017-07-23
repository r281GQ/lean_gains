import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form/immutable';

import LoginComponent from './../components/login';
import { logIn } from './../store/actionCreators/auth_action_creators';

class LoginContainer extends PureComponent {
  render = () =>
    <div>
      <LoginComponent
        handleSubmit={this.props.handleSubmit(({ email, password }) => {
          this.props.logIn({ password, email });
          this.props.reset();
        })}
      />
    </div>;
}

const mapDispatchToProps = dispatch => ({
  logIn: userInfo => dispatch(logIn(userInfo))
});

export default connect(null, mapDispatchToProps)(
  reduxForm({ form: 'login' })(LoginContainer)
);
