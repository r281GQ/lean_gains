import React from "react";
import { Field } from "redux-form";
import { TextField } from "redux-form-material-ui";
import FlatButton from "material-ui/FlatButton";
import { Link } from "react-router-dom";

const SignUpComponent = ({signUpHandler, invalid}) => {
  console.log(invalid);
  return (
    <div>
      <form onSubmit={signUpHandler}>
        <br />
        <Field name="userName" type="text" component={TextField} floatingLabelText="username"/>
        <br />
        <Field name="email" type="text" component={TextField} floatingLabelText="email address" />
        <br />
        <Field name="password" type="password" component={TextField} floatingLabelText="password" />
          <br/>
        <Field name="passwordAgain" type="password" component={TextField} floatingLabelText="password" validate={(v, a) => {

          console.log( a);
          return a.password === a.passwordAgain ? undefined : 'geci';}} />
        <br/>
        <FlatButton type='submit' label={invalid ? 'geci' :'Sign Up'} disabled={invalid}/>
        <Link to='/login'><FlatButton label='Click here if you already have an account'/></Link>
      </form>
    </div>
  );
};

export default SignUpComponent;
