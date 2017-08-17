import React from 'react';
import ContentAdd from 'material-ui/svg-icons/content/add';
import PropTypes from 'prop-types';
import { FloatingActionButton } from 'material-ui';
import { Link } from 'react-router-dom';

const CreateButton = ({ link, disabled }) =>
  <Link to={link} onClick={event => (disabled ? event.preventDefault() : null)}>
    <FloatingActionButton
      className="fixed-floating-button"
      disabled={disabled ? disabled : false}
    >
      <ContentAdd />
    </FloatingActionButton>
  </Link>;

CreateButton.propTypes = {
  link: PropTypes.string,
  disabled: PropTypes.bool
};

export default CreateButton;
