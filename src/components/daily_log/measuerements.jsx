import React from 'react';
import { TextField } from 'redux-form-material-ui';
import { Field } from 'redux-form/immutable';
import { Paper, FlatButton } from 'material-ui';
const Measurements = props =>
  <div>
    <Paper>
    <div className="row">
      <div  className="col col-6">
        <Field
          min={0}
          name="weight"
          label="Weight"
          component={TextField}
          type="number"
          floatingLabelText="your current weight"
        />
      </div>
      <div  className="col col-6">
        <Field
          min={0}
          name="height"
          label="height"
          component={TextField}
          type="number"
          floatingLabelText="your height"
        />
      </div>
    </div>
    </Paper>
    <Field
      min={0}
      name="neck"
      label="neck"
      component={TextField}
      type="number"
      floatingLabelText="neck widest point"
    />
    <Field
      min={0}
      name="chest"
      label="Chest"
      component={TextField}
      type="number"
      floatingLabelText="check widest point"
    />
    <Field
      min={0}
      name="rightArm"
      label="Right arm"
      component={TextField}
      type="number"
      floatingLabelText="flexed right biceps"
    />
    <Field
      min={0}
      name="leftArm"
      label="Left arm"
      component={TextField}
      type="number"
      floatingLabelText="flexed left biceps"
    />
    <Field
      min={0}
      name="aboveBelly"
      label="Above belly"
      component={TextField}
      type="number"
      floatingLabelText="above belly"
    />
    <Field
      min={0}
      name="belly"
      label="Belly"
      component={TextField}
      type="number"
      floatingLabelText="belly"
    />
    <Field
      min={0}
      name="belowBelly"
      label="Below belly"
      component={TextField}
      type="number"
      floatingLabelText="below belly"
    />
    <Field
      min={0}
      name="waist"
      label="Waist"
      component={TextField}
      type="number"
      floatingLabelText="waist"
    />
    <Field
      min={0}
      name="hips"
      label="Hips"
      component={TextField}
      type="number"
      floatingLabelText="hip"
    />
    <Field
      min={0}
      name="leftThigh"
      label="Left thigh"
      component={TextField}
      type="number"
      floatingLabelText="left thigh"
    />
    <Field
      min={0}
      name="rightThigh"
      label="Right thigh"
      component={TextField}
      type="number"
      floatingLabelText="right thigh"
    />
  </div>;

export default Measurements;
