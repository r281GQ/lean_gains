import React from 'react';
import Immutable from 'immutable';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as _ from 'lodash';
import { FlatButton, RaisedButton, IconButton, FontIcon } from 'material-ui';
import {
  Toolbar,
  ToolbarGroup,
  ToolbarSeparator,
  ToolbarTitle,
  DropDownMenu,
  MenuItem,
  IconMenu,
  Avatar,
  CircularProgress,
  LinearProgress
} from 'material-ui';

import { withRouter } from 'react-router';

import ActionHome from 'material-ui/svg-icons/action/home';
import Done from 'material-ui/svg-icons/action/done';
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import ArrowForward from 'material-ui/svg-icons/navigation/arrow-forward';
import ContentFilter from 'material-ui/svg-icons/navigation/arrow-downward';
import Menu from 'material-ui/svg-icons/navigation/menu';
import { goBack } from 'react-router-redux';
// import { Link } from 'react-router-dom';
import currentWeightSelector from './../store/selectors/current_weight';
import isTrainingDay from './../store/selectors/exercises';
import { openSideBar } from './../store/actionCreators/app_action_creators';
import todayMacros from './../store/selectors/current_macros';
import GoogleLoginButton from './../components/auth/google_login_button';
import RouterNavigation from './router_navigation';

//TODO: navigation button
const HeaderContainer = ({
  match,
  location: { pathname },
  exercises,
  todaysMacros,
  openSideBar,
  isLoading,
  userName,
  goBack,
  photo,
  isAuthenticated,
  isFetching
}) => {
  return !isAuthenticated
    ? <Toolbar style={{ backgroundColor: '#757575', color: '#EEEEEE' }}>
        <ToolbarGroup />
        <ToolbarGroup>
          {pathname === '/login'
            ? <Link to="/signup">
                <RaisedButton label="Sign up" />
              </Link>
            : <Link to="/login">
                <RaisedButton label="Log in" />
              </Link>}
          <ToolbarSeparator />
          <GoogleLoginButton />
        </ToolbarGroup>
      </Toolbar>
    : <Toolbar style={{ backgroundColor: '#757575', color: '#EEEEEE' }}>
        <ToolbarGroup firstChild={true}>
          <IconButton tooltip="Main menu" onTouchTap={() => openSideBar()}>
            <Menu color="white" />
          </IconButton>
        </ToolbarGroup>
        <ToolbarGroup>
          <RouterNavigation />
          <ToolbarGroup>
            <ToolbarTitle
              style={{ color: '#EEEEEE' }}
              text="Exercies for today"
            />
            <IconMenu
              value={`0`}
              onChange={() => console.log()}
              iconButtonElement={
                <IconButton>
                  <ContentFilter color="white" />
                </IconButton>
              }
            >
              {_.map(exercises, exec =>
                <MenuItem
                  key={exercises.indexOf(exec)}
                  value={exercises.indexOf(exec)}
                  primaryText={exec}
                />
              )}
            </IconMenu>
          </ToolbarGroup>
        </ToolbarGroup>

        <ToolbarGroup>
          {isFetching
            ? <CircularProgress />
            : <ToolbarTitle
                style={{ color: '#EEEEEE' }}
                text={`Macros: ${todaysMacros.calorie} P: ${todaysMacros.protein} C: ${todaysMacros.carbohydrate} F: ${todaysMacros.fat}`}
              />}{' '}
        </ToolbarGroup>

        <ToolbarGroup>
          {isLoading ? <CircularProgress /> : <Done color={'white'} />}
        </ToolbarGroup>

        <ToolbarGroup>
          <ToolbarTitle
            style={{ color: '#EEEEEE' }}
            text={`Welcome ${userName} `}
          />
          <Link to="/app/userdetails">
            <Avatar className="underline" src={`${photo}`} size={40} />
          </Link>
        </ToolbarGroup>
      </Toolbar>;
};

const mapStateToProps = state => ({
  isAuthenticated: state.getIn(['auth', 'authenticated']),
  isLoading: state.getIn(['app', 'isLoading']),
  isFetching: state.getIn(['app', 'isFetching']),
  exercises: isTrainingDay('main')(state).toJS(),
  todaysMacros: todayMacros(state).toJS(),
  userName: state.getIn(['userDetails', 'userName']),
  photo: state.getIn(['userDetails', 'picture'])
});

export default connect(mapStateToProps, { openSideBar })(
  withRouter(HeaderContainer)
);
