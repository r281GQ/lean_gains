import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import DailyLogsMainContainer from './daily_logs_main';
import DailyLogFormContainer from './daily_log_form';

const DailyLogsRouter = ({ dailyLogs }) =>
  <div>
    <Route exact path={`/dailylogs`} component={DailyLogsMainContainer} />
    
    <Route exact path={`/dailylogs/create`} component={DailyLogFormContainer} />

    <Route
      exact
      path={`/dailylogs/create/before`}
      render={props => {
        return <DailyLogFormContainer {...props} renderDatepicker={true} />;
      }}
    />

    <Route
      exact
      path={`/dailylogs/edit/:id`}
      render={props => {
        const defaultValue = dailyLogs.find(
          (value, key) => key === props.match.params.id
        );

        return (
          <DailyLogFormContainer
            {...props}
            defaultValue={defaultValue}
            type={'edit'}
          />
        );
      }}
    />
  </div>;

export default connect(state => ({
  dailyLogs: state.getIn(['dailyLogs', 'data'])
}))(DailyLogsRouter);
