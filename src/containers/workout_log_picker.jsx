import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { Link } from "react-router-dom";
import {
  List,
  ListItem,
  FlatButton,
  DropDownMenu,
  MenuItem,
  Card,
  CardHeader,
  CardText
} from "material-ui";
import { FloatingActionButton } from "material-ui";
import ContentAdd from "material-ui/svg-icons/content/add";
import * as _ from "lodash";
import moment from "moment";

//TODO: needs to know whats is the earliest workout log (it needs to be provided by the backend)
//TODO: dynamic routing should be provided here
class WorkoutLogPicker extends Component {
  componentWillMount() {
    //TODO: code to fetch current months logs
    this.props.handler(moment().format("MM-YYYY"));
  }
  _disableIfTodayLogAlreadyExists = event =>

    !_.isEmpty(this.props.todaysLog) ? event.preventDefault() : null;

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <DropDownMenu value={this.props.selected} onChange={this.props.handler}>
          {_.map(this.props.months, month => {
            return (
              <MenuItem
                key={moment(month).format("MM-YYYY")}
                value={moment(month).format("MM-YYYY")}
                primaryText={moment(month).format("MM-YYYY")}
              />
            );
          })}
        </DropDownMenu>
        <List>
          {_.map(this.props.logs, log =>
            <ListItem key={log._id} disabled={true}>
              <Card>
                <CardHeader
                  title={moment(log.date).format("DD-MM-YYYY")}
                  subtitle="Subtitle"
                  actAsExpander={false}
                  showExpandableButton={true}
                />
                <CardText expandable={true}>
                  {_.map(log.exercises, exercise => {
                    return (
                      <div key={`${log._id}.${exercise}`}>
                        {exercise.name}
                        {_.map(exercise.sets, set => {
                          return (
                            <div
                              key={`${log._id}.${exercise}${set}${Math.random()}`}
                            >
                              {set.weight} {set.reps}
                            </div>
                          );
                        })}
                      </div>
                    );
                  })}
                </CardText>
                <Link to={`/workoutlogs/edit/${log._id}`}>
                  <FlatButton label={`modify`} />
                </Link>
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
            onClick={this._disableIfTodayLogAlreadyExists}
          >
            <FloatingActionButton
              disabled={!_.isEmpty(this.props.todaysLog)}
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
  //todays workoutlog to determine if the floatingButtonshoudlbedisabled
  //TODO alldateandpoint exists so it doesnt nedede
  // todaysLog: undefined,
  datesWithWorkoutLogs: undefined,
  selectedMonth: undefined,
  monthsWithWorkoutLogs: undefined,
  workoutLogsForMonth: undefined,
});

const mapDispatchToProps = dispatch => ({
  //to change the monht
  onSelectMonth: month => dispatch()
});

export default connect(mapStateToProps, mapDispatchToProps)(WorkoutLogPicker);
