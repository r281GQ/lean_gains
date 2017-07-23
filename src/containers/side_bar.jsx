import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Drawer, MenuItem, FlatButton } from 'material-ui';

import { closeSideBar } from './../store/actionCreators/app_action_creators';
import { logout } from './../store/actionCreators/auth_action_creators';

import styled from 'styled-components';

const LinkWithoutUnderLine = styled(Link)`
  text-decoration: none;
`;

const SideBarContainer = ({ isSideBarOpen, closeSideBar, logout, links }) => {
  return (
    <Drawer
      open={isSideBarOpen}
      docked={false}
      onRequestChange={() => closeSideBar()}
    >
      <MenuItem onClick={() => closeSideBar()} primaryText="Close" />

      <LinkWithoutUnderLine
        to="/app/workoutlogs"
        onClick={() => closeSideBar()}
      >
        <MenuItem primaryText="Workout logs" />
      </LinkWithoutUnderLine>
      <LinkWithoutUnderLine to="/app/kcaltarget" onClick={() => closeSideBar()}>
        <MenuItem primaryText="Set calorie target" />
      </LinkWithoutUnderLine>
      <LinkWithoutUnderLine to="/app/dailylogs" onClick={() => closeSideBar()}>
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

      <MenuItem onClick={() => logout()} primaryText="Log out" />
    </Drawer>
  );
};

const mapStateToProps = state => ({
  isSideBarOpen: state.getIn(['app', 'isSideBarOpen'])
});

const mapDispatchToProps = dispatch => ({
  closeSideBar: () => dispatch(closeSideBar()),
  logout: () => dispatch(logout())
});

export default connect(mapStateToProps, mapDispatchToProps)(SideBarContainer);
