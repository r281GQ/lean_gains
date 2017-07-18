import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Route } from "react-router-dom";
import {
  List,
  ListItem,
  FlatButton,
  DropDownMenu,
  MenuItem,
  Card,
  CardHeader,
  CardText,
  FloatingActionButton,
  Dialog
} from "material-ui";
import ContentAdd from "material-ui/svg-icons/content/add";
import * as _ from "lodash";
import moment from "moment";

import { getWorkoutLogDates } from "./../../store/actionCreators/user_details_action_creators";
import {
  selectMonth,
  openWorkoutModal,
  closeWorkoutModal,
  setSelectedWorkoutLog
} from "./../../store/actionCreators/app_action_creators";
import {
  getWorkoutLogsForMonth,
  deleteWorkoutLog
} from "./../../store/actionCreators/workout_log_action_creators";
import monthsWithWorkoutLogs from "./../../store/selectors/month_workout_log";
import workoutLogsForMonth from "./../../store/selectors/monhtworkoutselecelt";
import isTodaysLogExists from "./../../store/selectors/today_log";

class WorkoutLogsMainContainer extends Component {
  componentWillMount() {
    this.props.getWorkoutLogDates();
    this.props.getWorkoutLogsForMonth(moment().format("MM-YYYY"));
    this.props.selectMonth(this.props.monthsWithWorkoutLogs.last());
  }

  componentWillReceiveProps(nextProps, nextState) {
    this.props.monthsWithWorkoutLogs.isEmpty()
      ? this.props.selectMonth(nextProps.monthsWithWorkoutLogs.last())
      : null;
  }

  _disableIfTodaysLogAlreadyExists = event =>
    this.props.isTodaysLogExists ? event.preventDefault() : null;

  render() {
    return (
      <div>
        <DropDownMenu
          value={this.props.selectedMonth}
          onChange={(event, key, value) => {
            this.props.getWorkoutLogsForMonth(value);
            this.props.selectMonth(value);
            this.props.getWorkoutLogDates();
          }}
        >
          {_.map(this.props.monthsWithWorkoutLogs.toJS(), month => {
            return <MenuItem key={month} value={month} primaryText={month} />;
          })}
        </DropDownMenu>
        <Dialog
          title="Sure you want to delete this log?"
          modal={true}
          open={this.props.isWorkoutLogModalOpen}
          actions={[
            <FlatButton
              label="cancel"
              onTouchTap={() => this.props.closeWorkoutModal()}
            />,
            <FlatButton
              label="delete"
              onTouchTap={() => {
                this.props.closeWorkoutModal();
                this.props.deleteWorkoutLog(this.props.selectedWorkoutLog);
                // this.props.getWorkoutLogDates();
                this.props.getWorkoutLogsForMonth(this.props.selectedMonth);
              }}
            />
          ]}
        />
        <List>
          {_.map(this.props.workoutLogsForMonth.toJS(), log =>
            <ListItem key={log._id} disabled={true}>
              <Card>
                <CardHeader
                  title={moment(log.date).format("DD-MM-YYYY")}
                  actAsExpander={false}
                  showExpandableButton={true}
                />
                <CardText expandable={true}>
                  {_.map(log.exercises, exercise => {
                    return (
                      <div
                        key={`${log._id}.${log.exercises.indexOf(exercise)}`}
                      >
                        Exercise: {exercise.name}
                        <br />
                        Sets:
                        {_.map(exercise.sets, set => {
                          return (
                            <div
                              key={`${log._id}.${log.exercises.indexOf(
                                exercise
                              )}.${exercise.sets.indexOf(set)}`}
                            >
                              Repetitions: {set.reps} Weight: {set.weight}
                            </div>
                          );
                        })}
                      </div>
                    );
                  })}
                </CardText>
                <Link to={`/workoutlogs/edit/${log._id}`}>
                  <FlatButton label={`Modify`} />
                </Link>
                <FlatButton
                  label={`Delete`}
                  onTouchTap={() => {
                    this.props.setSelectedWorkoutLog(log._id);
                    this.props.openWorkoutModal();
                  }}
                />
              </Card>
            </ListItem>
          )}
        </List>

        <div>
          <Link to="/workoutlogs/create/before">
            <FloatingActionButton
              mini={true}
              style={{
                position: "fixed",
                bottom: 20,
                right: 100
              }}
            >
              <ContentAdd />
            </FloatingActionButton>
          </Link>
          <Link
            to="/workoutlogs/create"
            onClick={this._disableIfTodaysLogAlreadyExists}
          >
            <FloatingActionButton
              disabled={this.props.isTodaysLogExists}
              style={{
                position: "fixed",
                bottom: 20,
                right: 20
              }}
            >
              <ContentAdd />
            </FloatingActionButton>
          </Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  monthsWithWorkoutLogs: monthsWithWorkoutLogs(state),
  isTodaysLogExists: isTodaysLogExists(state),
  workoutLogsForMonth: workoutLogsForMonth(state),
  datesWithWorkoutLogs: state.getIn(["userDetails", "workoutLogDates"]),
  selectedMonth: state.getIn(["app", "selectedMonthForWorkoutLogs"]),
  isWorkoutLogModalOpen: state.getIn(["app", "isWorkoutLogModalOpen"]),
  selectedWorkoutLog: state.getIn(["app", "selectedWorkoutLog"])
});

const mapDispatchToProps = dispatch => ({
  getWorkoutLogsForMonth: month => dispatch(getWorkoutLogsForMonth(month)),
  getWorkoutLogDates: () => dispatch(getWorkoutLogDates()),
  selectMonth: month => dispatch(selectMonth(month)),
  deleteWorkoutLog: _id => dispatch(deleteWorkoutLog(_id)),
  openWorkoutModal: () => dispatch(openWorkoutModal()),
  closeWorkoutModal: () => dispatch(closeWorkoutModal()),
  setSelectedWorkoutLog: _id => dispatch(setSelectedWorkoutLog(_id))
});

export default connect(mapStateToProps, mapDispatchToProps)(WorkoutLogsMainContainer);
