 import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Drawer, MenuItem, Divider, FontIcon } from 'material-ui';
import PropTypes from 'prop-types';
import { closeSideBar } from './../../store/actionCreators/app_action_creators';
import { logOut } from './../../store/actionCreators/auth_action_creators';

import styled from 'styled-components';
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';

const LinkWithoutUnderLine = styled(Link)`
  text-decoration: none;
`;

//TODO: implement help sidebar
const SideBarContainer = ({ isSideBarOpen, closeSideBar, logOut, links }) => {
  return (
    <Drawer
      open={isSideBarOpen}
      docked={false}
      onRequestChange={() => closeSideBar()}
    >
      <MenuItem
        onClick={() => closeSideBar()}
        primaryText="Close"
        rightIcon={<ArrowBack />}
      />
      <Divider />
      <LinkWithoutUnderLine
        to="/app/kcaltracker"
        onClick={() => closeSideBar()}
      >
        <MenuItem
          primaryText="Track calories"
          rightIcon={<FontIcon className="fa fa-pencil-square-o" />}
        />
      </LinkWithoutUnderLine>
      <LinkWithoutUnderLine
        to="/app/workoutlogs"
        onClick={() => closeSideBar()}
      >
        <MenuItem
          primaryText="Workout logs"
          rightIcon={<FontIcon className="fa fa-pencil" />}
        />
      </LinkWithoutUnderLine>
      <LinkWithoutUnderLine to="/app/dailylogs" onClick={() => closeSideBar()}>
        <MenuItem
          primaryText="Daily logs"
          rightIcon={<FontIcon className="fa fa-pencil-square" />}
        />
      </LinkWithoutUnderLine>
      <LinkWithoutUnderLine to="/app/kcaltarget" onClick={() => closeSideBar()}>
        <MenuItem
          primaryText="Set calorie target"
          rightIcon={<FontIcon className="fa fa-dot-circle-o" />}
        />
      </LinkWithoutUnderLine>

      <LinkWithoutUnderLine
        to="/app/workouttargets"
        onClick={() => closeSideBar()}
      >
        <MenuItem
          primaryText="Set workout target"
          rightIcon={<FontIcon className="fa fa-bullseye" />}
        />
      </LinkWithoutUnderLine>

      <LinkWithoutUnderLine
        to="/app/userdetails"
        onClick={() => closeSideBar()}
      >
        <MenuItem
          primaryText="Change user details"
          rightIcon={<FontIcon className="fa fa-user" />}
        />
      </LinkWithoutUnderLine>
      <Divider />
      <LinkWithoutUnderLine to="/app/about" onClick={() => closeSideBar()}>
        <MenuItem
          primaryText="About"
          rightIcon={<FontIcon className="fa fa-info" />}
        />
      </LinkWithoutUnderLine>

      <Divider />
      <MenuItem
        onClick={() => logOut()}
        primaryText="Log out"
        rightIcon={<FontIcon className="fa fa-sign-out" />}
      />
    </Drawer>
  );
};

const mapStateToProps = state => ({
  isSideBarOpen: state.getIn(['app', 'isSideBarOpen'])
});

export default connect(mapStateToProps, { closeSideBar, logOut })(
  SideBarContainer
);
