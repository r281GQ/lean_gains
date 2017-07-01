import React from "react";
import { Field } from "redux-form";
import { TextField } from "redux-form-material-ui";
import FlatButton from "material-ui/FlatButton";
import { Link } from "react-router-dom";

const SignUpComponent = ({signUpHandler}) => {
  return (
    <div>
      <form onSubmit={signUpHandler}>
        <Field name="name" type="text" component={TextField} floatingLabelText="full name"/>
        <br />
        <Field name="username" type="text" component={TextField} floatingLabelText="username"/>
        <br />
        <Field name="email" type="text" component={TextField} floatingLabelText="email address" />
        <br />
        <Field name="password" type="password" component={TextField} floatingLabelText="password." />
        <br/>
        <FlatButton type='submit' label='Sign Up'/>
        <Link to='/login'><FlatButton label='Click here if you already have an account'/></Link>
      </form>
    </div>
  );
};

export default SignUpComponent;
