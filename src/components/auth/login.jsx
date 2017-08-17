import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { TextField } from 'redux-form-material-ui';
import { FlatButton, Paper, RaisedButton } from 'material-ui';

const LoginComponent = ({ handleSubmit, validateEmail }) =>
  <div className="login__container">
    <Paper className="login__paper">
      <FlatButton disabled label="Log in" />
      <form onSubmit={handleSubmit}>
        <div>
          <Field
            name="email"
            type="text"
            hintText="Emai"
            validate={validateEmail}
            component={TextField}
          />
        </div>
        <div>
          <Field
            name="password"
            type="password"
            hintText="Password"
            component={TextField}
          />
        </div>
        <div>
          <RaisedButton primary fullWidth type="submit" label="Log in" />
        </div>
      </form>
    </Paper>
  </div>;

LoginComponent.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  validateEmail: PropTypes.func.isRequired,
};

export default LoginComponent;
