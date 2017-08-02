import React from 'react';
import { Field } from 'redux-form/immutable';
import { FlatButton } from 'material-ui';

import { TextField, DatePicker } from 'redux-form-material-ui';

const DailyLogForm = ({
  handleSubmit,
  createDailyLogHandler,
  label,
  renderDatepicker,
  shouldDisableDate
}) => {
  return (
    <form onSubmit={handleSubmit(createDailyLogHandler)}>
      <div>
        {renderDatepicker
          ? <Field
              name="date"
              component={DatePicker}
              shouldDisableDate={shouldDisableDate}
            />
          : null}
        Macros
        <Field
          fullWidth
          name="protein"
          label="Protein"
          component={TextField}
          type="number"
          min={0}
          floatingLabelText="enter consumed protein"
        />
        <Field
          fullWidth
          name="carbohydrate"
          label="Carbohydrate"
          component={TextField}
          min={0}
          type="number"
          floatingLabelText="enter consumed carbohydrate"
        />
        <Field
          name="fat"
          min={0}
          fullWidth
          label="Fat"
          component={TextField}
          type="number"
          floatingLabelText="enter consumed fat"
        />
      </div>
      <div>
        Issues
        <Field
          fullWidth
          name="sleepIssues"
          min={0}
          max={5}
          label="Sleeping issues"
          component={TextField}
          type="number"
          floatingLabelText="sleeping issues from 1-5"
        />
        <Field
          fullWidth
          name="stressIssues"
          min={0}
          max={5}
          label="Stress issues"
          component={TextField}
          type="number"
          floatingLabelText="stress issues from 1-5"
        />
        <Field
          fullWidth
          name="hungerIssues"
          min={0}
          max={5}
          label="Hunger issues"
          component={TextField}
          type="number"
          floatingLabelText="hunger issues from 1-5"
        />
        <Field
          name="fatigueLethargy"
          fullWidth
          min={0}
          max={5}
          label="Fatigue and lethargy issues"
          component={TextField}
          type="number"
          floatingLabelText="fatigue and lethargy issues from 1-5"
        />
      </div>
      <div>
        Measurements
        <Field
          fullWidth
          min={0}
          name="weight"
          label="Weight"
          component={TextField}
          type="number"
          floatingLabelText="your current weight"
        />
        <Field
          fullWidth
          min={0}
          name="height"
          label="height"
          component={TextField}
          type="number"
          floatingLabelText="your height"
        />
        <Field
          fullWidth
          min={0}
          name="neck"
          label="neck"
          component={TextField}
          type="number"
          floatingLabelText="neck widest point"
        />
        <Field
          fullWidth
          min={0}
          name="chest"
          label="Chest"
          component={TextField}
          type="number"
          floatingLabelText="check widest point"
        />
        <Field
          fullWidth
          min={0}
          name="rightArm"
          label="Right arm"
          component={TextField}
          type="number"
          floatingLabelText="flexed right biceps"
        />
        <Field
          fullWidth
          min={0}
          name="leftArm"
          label="Left arm"
          component={TextField}
          type="number"
          floatingLabelText="flexed left biceps"
        />
        <Field
          fullWidth
          min={0}
          name="aboveBelly"
          label="Above belly"
          component={TextField}
          type="number"
          floatingLabelText="above belly"
        />
        <Field
          fullWidth
          min={0}
          name="belly"
          label="Belly"
          component={TextField}
          type="number"
          floatingLabelText="belly"
        />
        <Field
          fullWidth
          min={0}
          name="belowBelly"
          label="Below belly"
          component={TextField}
          type="number"
          floatingLabelText="below belly"
        />
        <Field
          fullWidth
          min={0}
          name="waist"
          label="Waist"
          component={TextField}
          type="number"
          floatingLabelText="waist"
        />
        <Field
          fullWidth
          min={0}
          name="hips"
          label="Hips"
          component={TextField}
          type="number"
          floatingLabelText="hip"
        />
        <Field
          fullWidth
          min={0}
          name="leftThigh"
          label="Left thigh"
          component={TextField}
          type="number"
          floatingLabelText="left thigh"
        />
        <Field
          fullWidth
          min={0}
          name="rightThigh"
          label="Right thigh"
          component={TextField}
          type="number"
          floatingLabelText="right thigh"
        />
      </div>
      <FlatButton label={label} type="submit" />
    </form>
  );
};

export default DailyLogForm;
