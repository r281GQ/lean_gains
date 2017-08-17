import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Drawer, MenuItem, Divider, FontIcon } from 'material-ui';
import PropTypes from 'prop-types';
import { closeSideBar } from './../../store/actionCreators/app_action_creators';
import { logOut } from './../../store/actionCreators/auth_action_creators';

import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';

//TODO: implement help sidebar
const SideBarContainer = ({ isSideBarOpen, closeSideBar, logOut }) => {
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
      <Link
        className="link-no-underline"
        to="/app/kcaltracker"
        onClick={() => closeSideBar()}
      >
        <MenuItem
          primaryText="Track calories"
          rightIcon={<FontIcon className="fa fa-pencil-square-o" />}
        />
      </Link>
      <Link
        className="link-no-underline"
        to="/app/workoutlogs"
        onClick={() => closeSideBar()}
      >
        <MenuItem
          primaryText="Workout logs"
          rightIcon={<FontIcon className="fa fa-pencil" />}
        />
      </Link>
      <Link
        className="link-no-underline"
        to="/app/dailylogs"
        onClick={() => closeSideBar()}
      >
        <MenuItem
          primaryText="Daily logs"
          rightIcon={<FontIcon className="fa fa-pencil-square" />}
        />
      </Link>
      <Link
        className="link-no-underline"
        to="/app/kcaltarget"
        onClick={() => closeSideBar()}
      >
        <MenuItem
          primaryText="Set calorie target"
          rightIcon={<FontIcon className="fa fa-dot-circle-o" />}
        />
      </Link>

      <Link
        className="link-no-underline"
        to="/app/workouttargets"
        onClick={() => closeSideBar()}
      >
        <MenuItem
          primaryText="Set workout target"
          rightIcon={<FontIcon className="fa fa-bullseye" />}
        />
      </Link>

      <Link
        className="link-no-underline"
        to="/app/userdetails"
        onClick={() => closeSideBar()}
      >
        <MenuItem
          primaryText="Change user details"
          rightIcon={<FontIcon className="fa fa-user" />}
        />
      </Link>
      <Divider />
      <Link
        className="link-no-underline"
        to="/app/about"
        onClick={() => closeSideBar()}
      >
        <MenuItem
          primaryText="About"
          rightIcon={<FontIcon className="fa fa-info" />}
        />
      </Link>

      <Divider />
      <MenuItem
        onClick={() => logOut()}
        primaryText="Log out"
        rightIcon={<FontIcon className="fa fa-sign-out" />}
      />
    </Drawer>
  );
};

SideBarContainer.propTypes = {
  isSideBarOpen: PropTypes.bool,
  closeSideBar: PropTypes.func.isRequired,
  logOut: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isSideBarOpen: state.getIn(['app', 'isSideBarOpen'])
});

export default connect(mapStateToProps, { closeSideBar, logOut })(
  SideBarContainer
);
