import React from 'react';
import PropTypes from 'prop-types';
import { ToolbarGroup, ToolbarTitle, Avatar } from 'material-ui';
import { Link } from 'react-router-dom';

const User = ({ userName, photo }) =>
  <ToolbarGroup>
    <ToolbarTitle style={{ color: '#EEEEEE' }} text={`Welcome ${userName} `} />
    <Link to="/app/userdetails">
      <Avatar className="underline" src={photo} />
    </Link>
  </ToolbarGroup>;

User.propTypes = {
  userName: PropTypes.string,
  photo: PropTypes.string
};

export default User;
