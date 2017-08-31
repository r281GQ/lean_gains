import React, { PureComponent } from 'react';
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
import Logo from './../../../assets/icon.png';

class HeaderContainer extends PureComponent {
  constructor(props) {
    super(props);
    this._handleOpenSideBar = this._handleOpenSideBar.bind(this);
  }

  _handleOpenSideBar() {
    this.props.openSideBar();
  }

  render() {
    const {
      location: { pathname },
      exercises,
      todaysMacros,
      isLoading,
      userName,
      photo,
      isAuthenticated,
      goBack,
      goForward
    } = this.props;
    return (
      <div>
        <Helmet>
          <meta charSet="utf-8" />
          <title>LeanGains</title>
          <link rel="icon" href={`${Logo}`} />
        </Helmet>
        {!isAuthenticated ? (
          <UnauthanticatedHeader pathname={pathname} />
        ) : (
          <AuthanticatedHeader
            openSideBar={this._handleOpenSideBar}
            todaysMacros={todaysMacros.toJS()}
            exercises={exercises.toJS()}
            isLoading={isLoading}
            userName={userName}
            photo={photo}
            goBack={goBack}
            goForward={goForward}
          />
        )}
      </div>
    );
  }
}

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

export default withRouter(
  connect(mapStateToProps, { openSideBar, goBack, goForward })(HeaderContainer)
);

export { HeaderContainer as PureHeaderContainer };
