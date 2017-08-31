import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Snackbar } from 'material-ui';

import {
  openMessageBar,
  closeMessageBar
} from './../../store/actionCreators/app_action_creators';

const withMessageBar = WrappedComponent => {
  const MessageBar = props =>
    <div>
      <WrappedComponent {...props} />
      <Snackbar
        open={props.isMessageBarOpen}
        message={props.message}
        onRequestClose={props.closeMessageBar}
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
      message: state.getIn(['app', 'message']).first()
    };
  };

  return connect(mapStateToProps, { closeMessageBar, openMessageBar })(
    MessageBar
  );
};

export default withMessageBar;
