import React from "react";
import { Field } from "redux-form/immutable";
import {TextField} from 'redux-form-material-ui';

const DailyLogForm = ({ createLogHandler }) => {
  return (
    <form onSubmit={createLogHandler}>
      <div>
        Macros
        <Field
          name="protein"
          label="Protein"
          component={TextField}
          type="number"
          placeholder="proteing"
        />
        <Field
          name="carbohydrate"
          label="Carbohydrate"
          component={TextField}
          type="number"
          placeholder="carbohydrate"
        />
        <Field
          name="fat"
          label="Fat"
          component={TextField}
          type="number"
          placeholder="fat"
        />
        <Field
          name="fibre"
          label="Fibre"
          component={TextField}
          type="number"
          placeholder="fibre"
        />
      </div>
      <div>
        Issues
        <Field
          name="sleepIssues"
          label="Sleeping issues"
          component={TextField}
          type="number"
          placeholder="sleeping issues"
        />
        <Field
          name="stressIssues"
          label="Stress issues"
          component={TextField}
          type="number"
          placeholder="stress issues"
        />
        <Field
          name="hungerIssues"
          label="Hunger issues"
          component={TextField}
          type="number"
          placeholder="hunger issues"
        />
        <Field
          name="fatigueLethargy"
          label="Fatigue and lethargy issues"
          component={TextField}
          type="number"
          placeholder="fatigue and lethargy"
          min={1}
          max={5}
        />
      </div>
      <div>
        Measurements
        <Field
          name="weight"
          label="Weight"
          component={TextField}
          type="number"
          placeholder="weight"
        />
        <Field
          name="chest"
          label="Chest"
          component={TextField}
          type="number"
          placeholder="chest"
        />
        <Field
          name="rightArm"
          label="Right arm"
          component={TextField}
          type="number"
          placeholder="right arm"
        />
        <Field
          name="leftArm"
          label="Left arm"
          component={TextField}
          type="number"
          placeholder="left arm"
        />
        <Field
          name="aboveBelly"
          label="Above belly"
          component={TextField}
          type="number"
          placeholder="above belly"
        />
        <Field
          name="belly"
          label="Belly"
          component={TextField}
          type="number"
          placeholder="belly"
        />
        <Field
          name="belowBelly"
          label="Below belly"
          component={TextField}
          type="number"
          placeholder="below belly"
        />
        <Field
          name="hips"
          label="Hips"
          component={TextField}
          type="number"
          placeholder="hip"
        />
        <Field
          name="leftThigh"
          label="Left thigh"
          component={TextField}
          type="number"
          placeholder="left thigh"
        />
        <Field
          name="rightThigh"
          label="Right thigh"
          component={TextField}
          type="number"
          placeholder="right thigh"
        />
      </div>
      <button type="submit">Create</button>
    </form>
  );
};

export default DailyLogForm;
