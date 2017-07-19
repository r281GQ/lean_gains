import React from 'react';
import styled from 'styled-components';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { FloatingActionButton } from 'material-ui';
import { Link } from 'react-router-dom';

const FixedFloatingButtonLeft = styled(FloatingActionButton)`
    position: fixed;
    bottom: 20;
    right: 100;
`;

const CreateButtonMinified = ({ link }) =>
  <Link to={link}>
    <FixedFloatingButtonLeft mini>
      <ContentAdd />
    </FixedFloatingButtonLeft>
  </Link>;

export default CreateButtonMinified;
