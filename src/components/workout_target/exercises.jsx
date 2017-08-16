import React from 'react';
import { Field, FieldArray } from 'redux-form/immutable';
import { TextField } from 'redux-form-material-ui';
import { FlatButton, Paper } from 'material-ui';

const Exercises = () =>
  <div>
    <Paper className="workout-target-paper">
      <FieldArray
        name="exercises"
        component={({ fields: { map, remove, insert, length } }) => {
          return (
            <div>
              <FlatButton
                fullWidth
                onTouchTap={() => insert(length, '')}
                label="Add exercise"
              />
              {map((exec, index) =>
                <div key={index}>
                  <Field
                    name={exec}
                    floatingLabelText="Provide an exercise"
                    hintText="exercise name"
                    component={TextField}
                    type="text"
                    fullWidth={true}
                    value=""
                  />
                  <FlatButton
                    fullWidth
                    onTouchTap={() => remove(index)}
                    label="Remove exercise"
                  />
                </div>,
              )}
            </div>
          );
        }}
      />
    </Paper>
  </div>;

export default Exercises;
