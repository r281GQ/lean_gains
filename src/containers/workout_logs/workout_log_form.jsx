import React, { Component } from "react";
import { connect } from "react-redux";
import { FlatButton } from "material-ui";
import { DatePicker } from "redux-form-material-ui";
import {
  Field,
  FieldArray,
  reduxForm,
  formValueSelector
} from "redux-form/immutable";
import moment from "moment";

import {
  createWorkoutLog,
  updateWorkoutLog
} from "./../../store/actionCreators/workout_log_action_creators";
import ExerciseFieldArray from "./../../components/exercies_field_array";

class WorkoutLogFormContainer extends Component {
  componentDidMount() {
    if (this.props.type !== "createBefore")
      this.props.change("exercises", this.props.defaultValue.toJS());
    this.props.change("date", moment().toDate());
  }

  _disableThese = disabledDates => date =>
    _.find(disabledDates, disabledDate =>
      moment(disabledDate).isSame(date, "day")
    )
      ? true
      : false;

  render() {
    let { createWorkoutLog, handleSubmit, updateWorkoutLog } = this.props;
    return (
      <div>
        <form
          onSubmit={handleSubmit(
            ({ date, exercises }) =>
              this.props.type === "edit"
                ? updateWorkoutLog({
                    exercises,
                    _id: this.props.match.params.id
                  })
                : createWorkoutLog({ exercises, date })
          )}
        >
          <div>
            {this.props.type === "createBefore"
              ? <div>
                  <Field
                    name="date"
                    component={input =>
                      <DatePicker
                        maxDate={moment().toDate()}
                        minDate={moment().subtract(110, "years").toDate()}
                        {...input}
                        formatDate={value => moment(value).format("DD-MM-YYYY")}
                        shouldDisableDate={this._disableThese(
                          this.props.datesWithWorkoutLogs.toJS()
                        )}
                      />}
                  />{" "}
                </div>
              : null}

            <FieldArray
              name="exercises"
              component={ExerciseFieldArray}
              values={this.props.exercises}
            />
            <FlatButton
              type="submit"
              label={this.props.match.params.id ? "modify" : "create"}
            />
          </div>
        </form>
      </div>
    );
  }
}

const selector = formValueSelector("workoutLog");

//TODO own props needs to be moved to the bottom connect
WorkoutLogFormContainer = connect(
  state => ({
    datesWithWorkoutLogs: state.getIn(["userDetails", "workoutLogDates"]),
    exercises: selector(state, "exercises")
  }),
  dispatch => ({
    createWorkoutLog: workoutLog => dispatch(createWorkoutLog(workoutLog)),
    updateWorkoutLog: workoutLog => dispatch(updateWorkoutLog(workoutLog))
  })
)(WorkoutLogFormContainer);

export default connect()(
  reduxForm({
    form: "workoutLog"
  })(WorkoutLogFormContainer)
);
