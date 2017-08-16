import React from 'react';
import PropTypes from 'prop-types';
import { FlatButton } from 'material-ui';

const DeleteButton = ({ setSelectedItem, onModalStateChange }) =>
  <FlatButton
    onTouchTap={() => {
      setSelectedItem();
      onModalStateChange();
    }}
    label="Delete"
  />;
  
DeleteButton.propTypes = {
  setSelectedItem: PropTypes.func.isRequired,
  onModalStateChange: PropTypes.func.isRequired,
};

export default DeleteButton;
