import React from "react";
import { connect } from "react-redux";
import { FlatButton } from "material-ui";
import {DatePicker} from 'redux-form-material-ui';
import { Field,  FieldArray, reduxForm, formValueSelector } from "redux-form/immutable";
import moment from 'moment';

import ExerciseFieldArray from "./../components/exercies_field_array";
const h = [moment('02-01-2017','DD-MM-YYYY').valueOf(), moment('01-01-2017','DD-MM-YYYY').valueOf()];
//TODO: need an api endpoint which is able to get all the dattes woith workout logs
class WorkoutLogContainer extends React.Component {
  _isDateProvided = () => this.props.forCurrent;
  //did moint otherwise render will pass down empty props
  componentDidMount() {
    this.props.change("exercises", this.props.exercisesF);
    this.props.change("date", moment().toDate());
  }

  _disableThese = disabledDates => (date) => _.find(disabledDates, sd => moment(sd).isSame(date, 'day')) ? true: false;

  render() {
    console.log('ITHAS', this.props.match.params.id ? true :  false);
    let { change, handleSubmit, handlerR } = this.props;
    return (
      <div>
        <form
          onSubmit={handleSubmit(formprops => {
            // let date = this.props.match.params.date ? moment(this.props.match.params.date) : moment();

            // console.log(date);
            handlerR({exercises: formprops.exercises});
            //TODO: if this.props.match.params.id hit the put endpoint insetad of post
            console.log("submitted", formprops);
          })}
        >
          Create workout log
          <div>
            {!this._isDateProvided() ?
              <div>
              <Field
                name="date"
                component={input =>
                  <DatePicker
                    maxDate={moment().toDate()}
                    minDate={moment().subtract(110, "years").toDate()}
                    {...input}
                    formatDate={value => moment(value).format("DD-MM-YYYY")}
                    shouldDisableDate ={this._disableThese(h)}
                  />}
              /> </div>
            :null
          }

            <FieldArray
              name="exercises"
              component={ExerciseFieldArray}
              values={this.props.formValues }
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
