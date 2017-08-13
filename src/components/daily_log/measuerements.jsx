import React from 'react';
import { TextField } from 'redux-form-material-ui';
import { Field } from 'redux-form/immutable';
import { Paper, FlatButton } from 'material-ui';

const Measurements = props =>
  <Paper className="parent-paper">
    <div className="row">
      <FlatButton disabled label="Measurements" />
      <div className="clear" />
    </div>
    <div>
      <Paper>
        <div className="row">
          <div className="col col-6">
            <Field
              min={0}
              name="weight"
              label="Weight"
              component={TextField}
              type="number"
              floatingLabelText="your current weight"
            />
          </div>
          <div className="col col-6">
            <Field
              min={0}
              name="height"
              label="height"
              component={TextField}
              type="number"
              floatingLabelText="your height"
            />
          </div>
          <div className="clear" />
        </div>
      </Paper>
      <Paper>
        <div className="row">
          <div className="col col-6">
            <Field
              min={0}
              name="neck"
              label="neck"
              component={TextField}
              type="number"
              floatingLabelText="neck widest point"
            />
          </div>
          <div className="col col-6">
            <Field
              min={0}
              name="chest"
              label="Chest"
              component={TextField}
              type="number"
              floatingLabelText="check widest point"
            />
          </div>
          <div className="clear" />
        </div>
      </Paper>
      <Paper>
        <div className="row">
          <div className="col col-6">
            <Field
              min={0}
              name="rightArm"
              label="Right arm"
              component={TextField}
              type="number"
              floatingLabelText="flexed right biceps"
            />
          </div>
          <div className="col col-6">
            <Field
              min={0}
              name="leftArm"
              label="Left arm"
              component={TextField}
              type="number"
              floatingLabelText="flexed left biceps"
            />
          </div>
          <div className="clear" />
        </div>
      </Paper>
      <Paper>
        <div className="row">
          <div className="col col-4">
            <Field
              min={0}
              name="aboveBelly"
              label="Above belly"
              component={TextField}
              type="number"
              floatingLabelText="above belly"
            />
          </div>
          <div className="col col-4">
            <Field
              min={0}
              name="belly"
              label="Belly"
              component={TextField}
              type="number"
              floatingLabelText="belly"
            />
          </div>
          <div className="col col-4">
            <Field
              min={0}
              name="belowBelly"
              label="Below belly"
              component={TextField}
              type="number"
              floatingLabelText="below belly"
            />
          </div>
          <div className="clear" />
        </div>
      </Paper>
      <Paper>
        <div className="row">
          <div className="col col-6">
            <Field
              min={0}
              name="waist"
              label="Waist"
              component={TextField}
              type="number"
              floatingLabelText="waist"
            />
          </div>
          <div className="col col-6">
            <Field
              min={0}
              name="hips"
              label="Hips"
              component={TextField}
              type="number"
              floatingLabelText="hip"
            />
          </div>
          <div className="clear" />
        </div>
      </Paper>
      <Paper>
        <div className="row">
          <div className="col col-6">
            <Field
              min={0}
              name="leftThigh"
              label="Left thigh"
              component={TextField}
              type="number"
              floatingLabelText="left thigh"
            />
          </div>
          <div className="col col-6">
            <Field
              min={0}
              name="rightThigh"
              label="Right thigh"
              component={TextField}
              type="number"
              floatingLabelText="right thigh"
            />
          </div>
          <div className="clear" />
        </div>
      </Paper>
    </div>
  </Paper>;

export default Measurements;
