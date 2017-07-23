import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import DailyLogsMainContainer from './daily_logs_main';
import DailyLogFormContainer from './daily_log_form';
import withConfirmDeleteModal from './../confirm_delete_modal';

const DailyLogsRouter = ({ dailyLogs }) =>
  <div>
    <Route exact path={`/app/dailylogs`} component={withConfirmDeleteModal(DailyLogsMainContainer, 'geci', 'dailyLog')} />

    <Route exact path={`/app/dailylogs/create`} component={DailyLogFormContainer} />

    <Route
      exact
      path={`/app/dailylogs/create/before`}
      render={props => {
        return <DailyLogFormContainer {...props} renderDatepicker={true} />;
      }}
    />

    <Route
      exact
      path={`/app/dailylogs/edit/:id`}
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
