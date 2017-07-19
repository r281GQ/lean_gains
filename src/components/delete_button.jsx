import React from 'react';
import { FlatButton } from 'material-ui';

const DeleteButton = ({ setSelectedItem, onModalStateChange }) =>
  <FlatButton
    onTouchTap={() => {
      setSelectedItem();
      onModalStateChange();
    }}
    label="Delete"
  />;

export default DeleteButton;
