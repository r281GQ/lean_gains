import React from 'react';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { FloatingActionButton } from 'material-ui';
import { Link } from 'react-router-dom';

const CreateButtonMinified = ({ link }) =>
  <Link to={link}>
    <FloatingActionButton className="fixed-floating-button-mini" mini>
      <ContentAdd />
    </FloatingActionButton>
  </Link>;

export default CreateButtonMinified;
