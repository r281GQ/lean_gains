import React from "react";
import { reduxForm, Field } from "redux-form/immutable";
import { connect } from "react-redux";
import {
  DatePicker,
  TextField,
  RadioButtonGroup
} from "redux-form-material-ui";
import { RadioButton, FlatButton } from "material-ui";

const UserDetailsContainer = ({ userDetails, submitHandler, handleSubmit }) => {
  console.log(userDetails);
  return (
    <div>
      <form onSubmit={handleSubmit((submitHandler)=>console.log())}>
        <Field
          name="dob"
          component={DatePicker}
          format={(value, name) => (value === "" ? 0 : value)}
          hintText="date of birth"
        />
        <Field name="username" component={TextField} hintText="username" />
        <Field name="gender" component={RadioButtonGroup}>
          <RadioButton value="male" label="Male" />
          <RadioButton value="female" label="Female" />
        </Field>
        <Field name="name" component={TextField} hintText="name" />
        <FlatButton type="submit" label={`update`} />
      </form>
    </div>
  );
};

export default connect()(
  reduxForm({
    form: "userdetails"
  })(UserDetailsContainer)
);
