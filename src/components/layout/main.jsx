import React from 'react';
import PropTypes from 'prop-types';
import { IconButton, ToolbarGroup } from 'material-ui';
import Menu from 'material-ui/svg-icons/navigation/menu';

const Main = ({ openSideBar }) =>
  <ToolbarGroup firstChild={true}>
    <IconButton tooltip="Main menu" onTouchTap={openSideBar}>
      <Menu color="white" />
    </IconButton>
  </ToolbarGroup>;

Main.propTypes = {
  openSideBar: PropTypes.func.isRequired
};

export default Main;
