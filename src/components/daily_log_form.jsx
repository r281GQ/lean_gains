import React from "react";
import { Field } from "redux-form";

const DailyLogForm = ({ createLogHandler }) => {
  return (
    <form onSubmit={createLogHandler}>
      <div>
        Macros
        <Field
          name="protein"
          label="Protein"
          component="input"
          type="number"
          placeholder="proteing"
        />
        <Field
          name="carbohydrate"
          label="Carbohydrate"
          component="input"
          type="number"
          placeholder="carbohydrate"
        />
        <Field
          name="fat"
          label="Fat"
          component="input"
          type="number"
          placeholder="fat"
        />
        <Field
          name="fibre"
          label="Fibre"
          component="input"
          type="number"
          placeholder="fibre"
        />
      </div>
      <div>
        Issues
        <Field
          name="sleepIssues"
          label="Sleeping issues"
          component="input"
          type="number"
          placeholder="sleeping issues"
        />
        <Field
          name="stressIssues"
          label="Stress issues"
          component="input"
          type="number"
          placeholder="stress issues"
        />
        <Field
          name="hungerIssues"
          label="Hunger issues"
          component="input"
          type="number"
          placeholder="hunger issues"
        />
        <Field
          name="fatigueLethargy"
          label="Fatigue and lethargy issues"
          component="input"
          type="number"
          placeholder="fatigue and lethargy"
        />
      </div>
      <div>
        Measurements
        <Field
          name="weight"
          label="Weight"
          component="input"
          type="number"
          placeholder="weight"
        />
        <Field
          name="chest"
          label="Chest"
          component="input"
          type="number"
          placeholder="chest"
        />
        <Field
          name="rightArm"
          label="Right arm"
          component="input"
          type="number"
          placeholder="right arm"
        />
        <Field
          name="leftArm"
          label="Left arm"
          component="input"
          type="number"
          placeholder="left arm"
        />
        <Field
          name="aboveBelly"
          label="Above belly"
          component="input"
          type="number"
          placeholder="above belly"
        />
        <Field
          name="belly"
          label="Belly"
          component="input"
          type="number"
          placeholder="belly"
        />
        <Field
          name="belowBelly"
          label="Below belly"
          component="input"
          type="number"
          placeholder="below belly"
        />
        <Field
          name="hips"
          label="Hips"
          component="input"
          type="number"
          placeholder="hip"
        />
        <Field
          name="leftThigh"
          label="Left thigh"
          component="input"
          type="number"
          placeholder="left thigh"
        />
        <Field
          name="rightThigh"
          label="Right thigh"
          component="input"
          type="number"
          placeholder="right thigh"
        />
      </div>
      <button type="submit">Create</button>
    </form>
  );
};

export default DailyLogForm;
