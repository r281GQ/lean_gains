import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import { Drawer, MenuItem, Divider, FontIcon } from 'material-ui';

import { closeSideBar } from './../../store/actionCreators/app_action_creators';
import { logOut } from './../../store/actionCreators/auth_action_creators';

class SideBarContainer extends PureComponent {
  constructor(props) {
    super(props);
    this._handleCloseSideBar = this._handleCloseSideBar.bind(this);
    this._handleLogOut = this._handleLogOut.bind(this);
  }

  _handleCloseSideBar() {
    this.props.closeSideBar();
  }

  _handleLogOut() {
    this.props.logOut();
  }

  render() {
    const { isSideBarOpen } = this.props;
    return (
      <Drawer
        open={isSideBarOpen}
        docked={false}
        onRequestChange={this._handleCloseSideBar}
      >
        <MenuItem
          onClick={this._handleCloseSideBar}
          primaryText="Close"
          rightIcon={<ArrowBack />}
        />
        <Divider />
        <Link
          className="link-no-underline"
          to="/app/kcaltracker"
          onClick={this._handleCloseSideBar}
        >
          <MenuItem
            primaryText="Track calories"
            rightIcon={<FontIcon className="fa fa-pencil-square-o" />}
          />
        </Link>
        <Link
          className="link-no-underline"
          to="/app/workoutlogs"
          onClick={this._handleCloseSideBar}
        >
          <MenuItem
            primaryText="Workout logs"
            rightIcon={<FontIcon className="fa fa-pencil" />}
          />
        </Link>
        <Link
          className="link-no-underline"
          to="/app/dailylogs"
          onClick={this._handleCloseSideBar}
        >
          <MenuItem
            primaryText="Daily logs"
            rightIcon={<FontIcon className="fa fa-pencil-square" />}
          />
        </Link>
        <Link
          className="link-no-underline"
          to="/app/kcaltarget"
          onClick={this._handleCloseSideBar}
        >
          <MenuItem
            primaryText="Set calorie target"
            rightIcon={<FontIcon className="fa fa-dot-circle-o" />}
          />
        </Link>
        <Link
          className="link-no-underline"
          to="/app/workouttargets"
          onClick={this._handleCloseSideBar}
        >
          <MenuItem
            primaryText="Set workout target"
            rightIcon={<FontIcon className="fa fa-bullseye" />}
          />
        </Link>
        <Link
          className="link-no-underline"
          to="/app/userdetails"
          onClick={this._handleCloseSideBar}
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
          onClick={this._handleCloseSideBar}
        >
          <MenuItem
            primaryText="About"
            rightIcon={<FontIcon className="fa fa-info" />}
          />
        </Link>
        <Divider />
        <MenuItem
          onClick={this._handleLogOut}
          primaryText="Log out"
          rightIcon={<FontIcon className="fa fa-sign-out" />}
        />
      </Drawer>
    );
  }
}

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

export { SideBarContainer as PureSideBarContainer };
