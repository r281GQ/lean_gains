import React from 'react';
import { Link } from 'react-router-dom';
import { Drawer, MenuItem, FlatButton, Divider, Menu } from 'material-ui';
import styled from 'styled-components';

import { closeSideBar } from './../store/actionCreators/app_action_creators';
import { logOut } from './../store/actionCreators/auth_action_creators';

const LinkWithoutUnderLine = styled(Link)`
  text-decoration: none;
`;

const SideBarComponent = () => {
  return (
    <Drawer
      open={isSideBarOpen}
      docked={false}
      onRequestChange={() => closeSideBar()}
    >
      <Menu desktop={true}>
        <MenuItem onClick={() => closeSideBar()} primaryText="Close" />

        <LinkWithoutUnderLine
          to="/app/workoutlogs"
          onClick={() => closeSideBar()}
        >
          <MenuItem primaryText="Workout logs" />
        </LinkWithoutUnderLine>
        <LinkWithoutUnderLine
          to="/app/kcaltarget"
          onClick={() => closeSideBar()}
        >
          <MenuItem primaryText="Set calorie target" />
        </LinkWithoutUnderLine>
        <LinkWithoutUnderLine
          to="/app/dailylogs"
          onClick={() => closeSideBar()}
        >
          <MenuItem primaryText="Daily logs" />
        </LinkWithoutUnderLine>

        <LinkWithoutUnderLine
          to="/app/workouttargets"
          onClick={() => closeSideBar()}
        >
          <MenuItem primaryText="Set workout target" />
        </LinkWithoutUnderLine>
        <LinkWithoutUnderLine
          to="/app/userdetails"
          onClick={() => closeSideBar()}
        >
          <MenuItem primaryText="Change user details" />
        </LinkWithoutUnderLine>
        <LinkWithoutUnderLine
          to="/app/kcaltracker"
          onClick={() => closeSideBar()}
        >
          <MenuItem primaryText="Track calories" />
        </LinkWithoutUnderLine>
        <Divider />
        <MenuItem onClick={() => logOut()} primaryText="Log out" />
      </Menu>
    </Drawer>
  );
};

export default SideBarComponent;
