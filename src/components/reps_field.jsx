import React from "react";
import { Field } from "redux-form/immutable";
import { TextField } from "redux-form-material-ui";

const RepsField = ({ item }) =>
  <Field
    name={`${item}.reps`}
    type="number"
    placeholder="reps"
    component={TextField}
  />;

export default RepsField;
