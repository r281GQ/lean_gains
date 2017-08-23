import React from 'react';
import PropTypes from 'prop-types';
import { Toolbar } from 'material-ui';

import RouterNavigation from './router_navigation';
import Main from './main';
import Exercises from './exercises';
import User from './user';
import Macros from './macros';
import SaveIndicator from './save_indicator';



const AuthenticatedHeader = ({
  openSideBar,
  exercises,
  isLoading,
  userName,
  photo,
  todaysMacros,
  goBack,
  goForward
}) =>
  <Toolbar style={{ backgroundColor: '#757575', color: '#EEEEEE' }}>
    <Main openSideBar={openSideBar} />
    <RouterNavigation goBack={goBack} goForward={goForward} />
    <Exercises exercises={exercises} />
    <Macros todaysMacros={todaysMacros} isFetching={isLoading} />
    <SaveIndicator isLoading={isLoading} />
    <User userName={userName} photo={photo} />
  </Toolbar>;

AuthenticatedHeader.propTypes = {
  openSideBar: PropTypes.func,
  exercises: PropTypes.arrayOf(PropTypes.string),
  isLoading: PropTypes.bool,
  userName: PropTypes.string,
  photo: PropTypes.string,
  todaysMacros: PropTypes.object
};

export default AuthenticatedHeader;
