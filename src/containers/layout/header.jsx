import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { goBack, goForward } from 'react-router-redux';

import { openSideBar } from './../../store/actionCreators/app_action_creators';
import currentWeightSelector from './../../store/selectors/current_weight';
import isTrainingDay from './../../store/selectors/exercises';
import todayMacros from './../../store/selectors/current_macros';
import UnauthanticatedHeader from './../../components/layout/unauth_header';
import AuthanticatedHeader from './../../components/layout/authenticated_header';

const HeaderContainer = ({
  location: { pathname },
  exercises,
  todaysMacros,
  openSideBar,
  isLoading,
  userName,
  photo,
  isAuthenticated,
  isFetching,
  goBack,
  goForward
}) =>
  !isAuthenticated
    ? <UnauthanticatedHeader pathname={pathname} />
    : <AuthanticatedHeader
        openSideBar={() => openSideBar()}
        todaysMacros={todaysMacros.toJS()}
        exercises={exercises}
        isFetching={isFetching}
        isLoading={isLoading}
        userName={userName}
        photo={photo}
        goBack={goBack}
        goForward={goForward}
      />;

const mapStateToProps = state => ({
  isAuthenticated: state.getIn(['auth', 'authenticated']),
  isLoading: state.getIn(['app', 'isLoading']),
  isFetching: state.getIn(['app', 'isFetching']),
  exercises: isTrainingDay('main')(state).toJS(),
  todaysMacros: todayMacros(state),
  userName: state.getIn(['userDetails', 'userName']),
  photo: state.getIn(['userDetails', 'picture'])
});

export default connect(mapStateToProps, { openSideBar, goBack, goForward })(
  withRouter(HeaderContainer)
);
