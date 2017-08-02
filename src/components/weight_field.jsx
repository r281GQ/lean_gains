import React from "react";
import { Field } from "redux-form/immutable";
import { TextField, Slider } from "redux-form-material-ui";

const WeightField = ({ item }) =>
  <div>
    <Field
      name={`${item}.weight`}
      type="number"
      placeholder="weight"
      component={Slider}
      defaultValue={1}
      format={(value, name) => (value === "" ? 0 : Number.parseFloat(value))}
      min={0}
      step={0.5}
      max={300}
    />


  </div>;

export default WeightField;


  // {currentValue || 0} KG
