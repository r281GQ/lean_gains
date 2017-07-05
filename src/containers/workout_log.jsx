import React from "react";
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import { FlatButton } from "material-ui";
import { Field, FieldArray, reduxForm } from "redux-form/immutable";
import * as _ from "lodash";

class WorkoutLogContainer extends React.PureComponent {
  render() {
    let { handleSubmit } = this.props;
    return (
      <div>
        <form
          onSubmit={handleSubmit(formprops =>
            console.log("submitted", formprops)
          )}
        >
          Create workout log
          <div key={this.props.exercises[0].name}>
            <span>{this.props.exercises[0].name}</span>
            <Field name="exercise" type="text" component="input" placeholder='exercise'/>
            <Field name="notes" type="text" component="input" placeholder='notes' />
            <FieldArray
              name="sets"
              component={sets => {
                let d = sets.fields.getAll();
                return (
                  <div>
                    <ul>
                      <li>
                        <FlatButton
                          onTouchTap={() => {
                            console.log("clicked");
                            sets.fields.push({});
                          }}
                          label="add"
                        />
                      </li>
                      {sets.fields.map((item, index) =>
                        <li key={index}>
                          <Field
                            name={`${item}.weight`}
                            type="number"
                            placeholder="weight"
                            component="input"
                          />
                          <Field
                            name={`${item}.reps`}
                            type="number"
                            placeholder="reps"
                            component="input"
                          />
                          {item.weight}
                        </li>
                      )}
                    </ul>
                  </div>
                );
              }}
            />
            <button type="submit">add</button>
          </div>
        </form>
      </div>
    );
  }
}

export default connect()(reduxForm({ form: "wrokt" })(WorkoutLogContainer));
