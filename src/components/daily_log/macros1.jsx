import React from 'react';
import { TextField } from 'redux-form-material-ui';
import { Field } from 'redux-form/immutable';
import { Paper, FlatButton } from 'material-ui';


const Macros = () =>
  <Paper>
    <div className="row">
        <FlatButton disabled label="Macros" />
    </div>
    <div className="row">
      <div className="col col-4">
        <Field
          name="protein"
          label="Protein"
          component={TextField}
          type="number"
          min={0}
          floatingLabelText="Enter consumed protein"
        />
      </div>
      <div className="col col-4">
        <Field
          name="carbohydrate"
          label="Carbohydrate"
          component={TextField}
          min={0}
          type="number"
          floatingLabelText="Enter consumed carbohydrate"
        />
      </div>
      <div className="col col-4">
        <Field
          name="fat"
          min={0}
          label="Fat"
          component={TextField}
          type="number"
          floatingLabelText="Enter consumed fat"
        />
      </div>
      <div className="clear" />
    </div>
  </Paper>;

export default Macros;
