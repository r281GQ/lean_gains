import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import ImmutablePropTypes from 'react-immutable-proptypes';

import DailyLogsMainContainer from './daily_logs_main';
import DailyLogFormContainer from './daily_log_form';

const DailyLogsRouter = ({ dailyLogs }) => (
  <div>
    <Route exact path={`/app/dailylogs`} component={DailyLogsMainContainer} />

    <Route
      exact
      path={`/app/dailylogs/create`}
      component={DailyLogFormContainer}
    />

    <Route
      exact
      path={`/app/dailylogs/create/before`}
      render={props => <DailyLogFormContainer {...props} renderDatepicker />}
    />

    <Route
      exact
      path={`/app/dailylogs/edit/:id`}
      render={props => (
        <DailyLogFormContainer
          {...props}
          defaultValue={dailyLogs.find(
            (value, key) => key === props.match.params.id
          )}
        />
      )}
    />
  </div>
);

DailyLogsRouter.propTypes = {
  dailyLogs: ImmutablePropTypes.map
};

export default connect(state => ({
  dailyLogs: state.getIn(['dailyLogs', 'data'])
}))(DailyLogsRouter);
