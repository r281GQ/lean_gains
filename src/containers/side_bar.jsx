import React from "react";

import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Drawer, MenuItem, FlatButton } from "material-ui";

import { closeSideBar } from "./../store/actionCreators/app_action_creators";

const SideBarContainer = ({ isSideBarOpen, closeSideBar }) => {
  return (
    <Drawer
      open={isSideBarOpen}
      docked={false}
      onRequestChange={() => closeSideBar()}
    >
      <MenuItem onClick={() => closeSideBar()}>Close</MenuItem>

      <Link
        to="/workoutlogs"
        style={{ textDecoration: "none" }}
        onClick={() => closeSideBar()}
      >
        <MenuItem>Workout logs</MenuItem>
      </Link>
      <Link
        to="/KcalLog"
        style={{ textDecoration: "none" }}
        onClick={() => closeSideBar()}
      >
        <MenuItem>kolrialog</MenuItem>
      </Link>
      <Link
        to="/dailylogs"
        style={{ textDecoration: "none" }}
        onClick={() => closeSideBar()}
      >
        <MenuItem>
          <span>Daily logs</span>
        </MenuItem>
      </Link>

      <Link
        to="/workouttargets"
        style={{ textDecoration: "none" }}
        onClick={() => closeSideBar()}
      >
        <MenuItem>
          {" "}<span>workouttarget</span>
        </MenuItem>
      </Link>
      <Link
        to="/userdetails"
        style={{ textDecoration: "none" }}
        onClick={() => closeSideBar()}
      >
        <MenuItem>
          {" "}<span>userdetails</span>
        </MenuItem>
      </Link>
      <Link
        to="/kcaltracker"
        style={{ textDecoration: "none" }}
        onClick={() => closeSideBar()}
      >
        <MenuItem>
          {" "}<span>kl</span>
        </MenuItem>
      </Link>
    </Drawer>
  );
};

const mapStateToProps = state => ({
  isSideBarOpen: state.getIn(["app", "isSideBarOpen"])
});

const mapDispatchToProps = dispatch => ({
  closeSideBar: () => dispatch(closeSideBar())
});

export default connect(mapStateToProps, mapDispatchToProps)(SideBarContainer);
