import React from 'react';
import { FlatButton } from 'material-ui';
import { Link } from 'react-router-dom';

const ModifyButton = ({ link }) =>
  <Link to={`${link}`}>
    <FlatButton label="Modify" />
  </Link>;

export default ModifyButton;
