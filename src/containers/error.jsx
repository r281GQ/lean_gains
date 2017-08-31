import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { Dialog, FlatButton } from 'material-ui';
import {
  closeErrorModal,
  unSetMessages
} from './../store/actionCreators/app_action_creators';

class Error extends PureComponent {
  constructor(props) {
    super(props);
    this._handleModalClose = this._handleModalClose.bind(this);
  }

  _handleModalClose() {
    this.props.closeErrorModal();
    this.props.unSetMessages();
  }

  render() {
    const { errorMessages, isErrorModalOpen } = this.props;
    return (
      <Dialog
        title="The following nformations are missing! You can update them at the daily logs or user details!"
        open={isErrorModalOpen}
        actions={[
          <FlatButton key="ok" label="ok" onClick={this._handleModalClose} />
        ]}
      >
        {errorMessages.map(value => <div key={value}>{value}</div>)}
      </Dialog>
    );
  }
}

Error.propTypes = {
  errorMessages: ImmutablePropTypes.listOf(PropTypes.string),
  isErrorModalOpen: PropTypes.bool.isRequired,
  closeErrorModal: PropTypes.func.isRequired,
  unSetMessages: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    isErrorModalOpen: state.getIn(['app', 'isErrorModalOpen']),
    errorMessages: state.getIn(['app', 'message'])
  };
};

export default connect(mapStateToProps, { closeErrorModal, unSetMessages })(
  Error
);

export { Error as PureError };
