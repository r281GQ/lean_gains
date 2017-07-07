import React from "react";
import { Field } from "redux-form/immutable";
import { TextField } from "redux-form-material-ui";

const NameField = ({ item }) =>
  <Field
    name={`${item}.name`}
    type="text"
    placeholder="name"
    component={TextField}
  />;

export default NameField;
