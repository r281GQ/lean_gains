import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form/immutable";

import SignUpComponent from "./../components/signup";
import { signUp } from "./../store/actionCreators/auth_action_creators";

class SignUpContainer extends PureComponent {
  render() {
    return (
      <div>
        <SignUpComponent
          signUpHandler={this.props.handleSubmit(
            ({ name, username, email, password }) => {
              this.props.signUp({ name, username, email, password });
              this.props.reset();
            }
          )}
        />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    signUp: userInfo => dispatch(signUp(userInfo))
  };
};

export default connect(null, mapDispatchToProps)(
  reduxForm({ form: "signup" })(SignUpContainer)
);
