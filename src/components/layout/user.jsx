import React from 'react';
import { ToolbarGroup, ToolbarTitle, Avatar } from 'material-ui';
import { Link } from 'react-router-dom';

const User = ({ userName, photo }) =>
  <ToolbarGroup>
    <ToolbarTitle style={{ color: '#EEEEEE' }} text={`Welcome ${userName} `} />
    <Link to="/app/userdetails">
      <Avatar className="underline" src={photo} />
    </Link>
  </ToolbarGroup>;

export default User;
