import React from 'react';
import ContentAdd from 'material-ui/svg-icons/content/add';
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

export default CreateButton;
