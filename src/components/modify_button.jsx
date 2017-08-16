import React from 'react';
import PropTypes from 'prop-types';
import { FlatButton } from 'material-ui';
import { Link } from 'react-router-dom';

const ModifyButton = ({ link }) =>
  <Link to={link}>
    <FlatButton label="Modify" />
  </Link>;

ModifyButton.propTypes = {
  link: PropTypes.string.isRequired,
};

export default ModifyButton;
