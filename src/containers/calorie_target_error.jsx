import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {
  openErrorModal,
  setMessages
} from './../store/actionCreators/app_action_creators';

class CalorieTargetError extends React.PureComponent {
  componentDidMount() {
    this.props.setMessages(this.props.errors), this.props.openErrorModal();
  }

  render() {
    return <Redirect to="/app" />;
  }
}

CalorieTargetError.propTypes = {
  errors: PropTypes.any,
  openErrorModal: PropTypes.func,
  setMessages: PropTypes.func
};

export default connect(null, { openErrorModal, setMessages })(
  CalorieTargetError
);

export { CalorieTargetError as PureCalorieTargetError };
