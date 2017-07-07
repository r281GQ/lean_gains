import React from "react";
import { Field } from "redux-form/immutable";
import { TextField } from "redux-form-material-ui";

const NoteField = ({ item }) =>
  <Field
    name={`${item}.note`}
    type="text"
    placeholder="note"
    component={TextField}
  />;

export default NoteField;
