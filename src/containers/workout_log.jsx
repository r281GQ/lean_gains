import React from "react";
import { connect } from "react-redux";
import { FlatButton } from "material-ui";
import { FieldArray, reduxForm, formValueSelector } from "redux-form/immutable";

import ExerciseFieldArray from "./../components/exercies_field_array";

class WorkoutLogContainer extends React.Component {
  componentWillMount() {
    this.props.change("exercises", this.props.exercises);
  }

  render() {
    let { change, handleSubmit, handlerR } = this.props;
    return (
      <div>
        <form
          onSubmit={handleSubmit(formprops => {
            handlerR(formprops.exercises);
            console.log("submitted", formprops);
          })}
        >
          Create workout log
          <div>
            <FieldArray
              name="exercises"
              component={ExerciseFieldArray}
              values={this.props.formValues}
            />
            <FlatButton type="submit" label={`Create workout log`} />
          </div>
        </form>
      </div>
    );
  }
}
const selector = formValueSelector("workoutLog");

WorkoutLogContainer = connect(state => ({
  formValues: selector(state, "exercises")
}))(WorkoutLogContainer);

export default connect()(
  reduxForm({
    form: "workoutLog"
  })(WorkoutLogContainer)
);
