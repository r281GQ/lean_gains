import React from 'react';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { FloatingActionButton } from 'material-ui';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const FixedFloatingButton = styled(FloatingActionButton)`
    position: fixed;
    bottom: 50;
    right: 20;
`;

const CreateButton = ({ link, disabled }) =>
  <Link to={link} onClick={event => (disabled ? event.preventDefault() : null)}>
    <FixedFloatingButton disabled={disabled ? disabled : false}>
      <ContentAdd />
    </FixedFloatingButton>
  </Link>;

export default CreateButton;
