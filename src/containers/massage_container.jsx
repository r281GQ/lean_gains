import React from 'react';
import { Snackbar } from 'material-ui';
import { connect } from 'react-redux';
import {
  openMessageBar,
  closeMessageBar
} from './../store/actionCreators/app_action_creators';

const withMessageBar = WrappedComponent => {
  const MessageBar = ({ isMessageBarOpen, closeMessageBar, message }) =>
    <div>
      <WrappedComponent />
      <Snackbar
        open={isMessageBarOpen}
        message={message}
        onRequestClose={closeMessageBar}
        autoHideDuration={5000}
      />
    </div>;
  return connect(
    state => ({
      isMessageBarOpen: state.getIn(['app', 'isMessageBarOpen']),
      message: state.getIn(['app', 'message'])
    }),
    { closeMessageBar, openMessageBar }
  )(MessageBar);
};

export default withMessageBar;
