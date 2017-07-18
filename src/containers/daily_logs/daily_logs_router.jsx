import React from "react";
import { Route } from "react-router-dom";
import {connect} from 'react-redux';

import DailyLogsMainContainer from "./daily_logs_main";
import DailyLogFormContainer from './daily_log_form';

const DailyLogsRouter = ({dailyLogs}) => {
  return (
    <div>
      <Route exact path={`/dailylogs`} component={DailyLogsMainContainer} />
      <Route exact path={`/dailylogs/create`} component={DailyLogFormContainer} />
      <Route exact path={`/dailylogs/create/before`} render={props => {

            return <DailyLogFormContainer {...props} renderDatepicker={true} />
        }} />
      <Route exact path={`/dailylogs/edit/:id`} render={props => {

          const toEdit = dailyLogs.find((value, key) => key === props.match.params.id);

          console.log(toEdit.toJS());

          return <DailyLogFormContainer {...props} defaultValue={toEdit} type={'edit'} />
        }
      } />
    </div>
  );
};

const mapStateToProps = state => {
  return {
    dailyLogs: state.getIn(['dailyLog', 'data'])
  };
}

export default connect(mapStateToProps) (DailyLogsRouter);
