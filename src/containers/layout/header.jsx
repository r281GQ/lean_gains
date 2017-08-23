import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { goBack, goForward } from 'react-router-redux';
import Helmet from 'react-helmet';

import { openSideBar } from './../../store/actionCreators/app_action_creators';
import isTrainingDay from './../../store/selectors/exercises';
import todayMacros from './../../store/selectors/current_macros';
import UnauthanticatedHeader from './../../components/layout/unauth_header';
import AuthanticatedHeader from './../../components/layout/authenticated_header';
// import withDataCheck from './../enhancers/with_data_check';



const HeaderContainer = ({
  location: { pathname },
  exercises,
  todaysMacros,
  openSideBar,
  isLoading,
  userName,
  photo,
  isAuthenticated,
  goBack,
  goForward
}) =>
  <div>
    <Helmet>
      <meta charSet="utf-8" />
      <title>LeanGains</title>
      <link
        rel="icon"
        href="https://d30y9cdsu7xlg0.cloudfront.net/png/61493-200.png"
      />
      <link rel="canonical" href="http://mysite.com/example" />
    </Helmet>
    {!isAuthenticated
      ? <UnauthanticatedHeader pathname={pathname} />
      : <AuthanticatedHeader
          openSideBar={() => openSideBar()}
          todaysMacros={todaysMacros.toJS()}
          exercises={exercises.toJS()}
          isLoading={isLoading}
          userName={userName}
          photo={photo}
          goBack={goBack}
          goForward={goForward}
        />}
  </div>;

HeaderContainer.propTypes = {
  exercises: ImmutablePropTypes.list,
  todaysMacros: ImmutablePropTypes.map,
  openSideBar: PropTypes.func,
  isLoading: PropTypes.bool,
  userName: PropTypes.string,
  photo: PropTypes.string,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.getIn(['auth', 'authenticated']),
  isLoading: state.getIn(['app', 'isLoading']),
  exercises: isTrainingDay('main')(state),
  todaysMacros: todayMacros(state),
  userName: state.getIn(['userDetails', 'userName']),
  photo: state.getIn(['userDetails', 'picture'])
});

export default connect(mapStateToProps, { openSideBar, goBack, goForward })(
  withRouter(HeaderContainer)
);
