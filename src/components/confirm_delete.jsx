import React from 'react';
import { Dialog, FlatButton } from 'material-ui';

const ConfirmDelete = ({ isOpen, close, deleteActions, title }) =>
  <Dialog
    title={title}
    modal={true}
    open={isOpen}
    actions={[
      <FlatButton label="Cancel" onTouchTap={() => close()} />,
      <FlatButton
        label="Delete"
        onTouchTap={() => {
          close();
          deleteActions.forEach(fn => fn());
        }}
      />
    ]}
  />;

export default ConfirmDelete;
