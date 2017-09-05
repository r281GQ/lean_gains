import React from 'react';
import PropTypes from 'prop-types';
import { Dialog, FlatButton } from 'material-ui';

const ConfirmDelete = ({ isOpen, close, deleteActions, title }) =>
  <Dialog
    title={title}
    modal={true}
    open={isOpen}
    actions={[
      <FlatButton key={1} label="Cancel" onTouchTap={() => close()} />,
      <FlatButton
        key={2}
        label="Delete"
        onTouchTap={() => {
          close();
          deleteActions.forEach(fn => fn());
        }}
      />
    ]}
  />;

ConfirmDelete.propTypes = {
  isOpen: PropTypes.bool,
  close: PropTypes.func,
  deleteActions: PropTypes.arrayOf(PropTypes.func),
  title: PropTypes.string
};

export default ConfirmDelete;
