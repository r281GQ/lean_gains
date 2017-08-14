import React from 'react';
import { IconButton, ToolbarGroup, ToolbarTitle } from 'material-ui';
import Menu from 'material-ui/svg-icons/navigation/menu';

const Main = ({ openSideBar }) =>
  <ToolbarGroup firstChild={true}>
    <IconButton tooltip="Main menu" onTouchTap={openSideBar}>
      <Menu color="white" />
    </IconButton>
  </ToolbarGroup>;

export default Main;
