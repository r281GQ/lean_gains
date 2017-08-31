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
    this._handleOpenErrorModal();
  }

  constructor(props) {
    super(props);

  }

  _handleOpenErrorModal() {
    this.props.setMessages(this.props.errors);
    this.props.openErrorModal();
  }

  render() {
    return <Redirect to="/app" />;
  }
}

CalorieTargetError.propTypes = {
  errors: PropTypes.arrayOf(PropTypes.string),
  openErrorModal: PropTypes.func.isRequired,
  setMessages: PropTypes.func.isRequired
};

export default connect(null, { openErrorModal, setMessages })(
  CalorieTargetError
);

export { CalorieTargetError as PureCalorieTargetError };
