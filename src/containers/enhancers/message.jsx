import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Snackbar } from 'material-ui';

import {
  openMessageBar,
  closeMessageBar
} from './../../store/actionCreators/app_action_creators';

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

  MessageBar.propTypes = {
    isMessageBarOpen: PropTypes.bool,
    closeMessageBar: PropTypes.func.isRequired,
    message: PropTypes.string
  };

  const mapStateToProps = state => {
    return {
      isMessageBarOpen: state.getIn(['app', 'isMessageBarOpen']),
      message: state.getIn(['app', 'message'])
    };
  };

  return connect(mapStateToProps, { closeMessageBar, openMessageBar })(
    MessageBar
  );
};

export default withMessageBar;
