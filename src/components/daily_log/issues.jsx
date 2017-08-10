import React from 'react';
import { TextField } from 'redux-form-material-ui';
import { Field } from 'redux-form/immutable';
import { Paper, FlatButton } from 'material-ui';
const Issues = () =>
<Paper>
  <div className="row"><FlatButton disabled label="Issues" /></div>
  <div className="row">
    <div className="col col-3">
      <Field
        fullWidth
        name="sleepIssues"
        min={0}
        max={5}
        label="Sleeping issues"
        component={TextField}
        type="number"
        floatingLabelText="sleeping issues from 1-5"
      />
    </div>
    <div className="col col-3">
      <Field
        fullWidth
        name="stressIssues"
        min={0}
        max={5}
        label="Stress issues"
        component={TextField}
        type="number"
        floatingLabelText="stress issues from 1-5"
      />
    </div>
    <div className="col col-3">
      <Field
        fullWidth
        name="hungerIssues"
        min={0}
        max={5}
        label="Hunger issues"
        component={TextField}
        type="number"
        floatingLabelText="hunger issues from 1-5"
      />
    </div>{' '}
    <div className="col col-3">
      <Field
        name="fatigueLethargy"
        fullWidth
        min={0}
        max={5}
        label="Fatigue and lethargy issues"
        component={TextField}
        type="number"
        floatingLabelText="fatigue and lethargy issues from 1-5"
      />
    </div>
    <div className="clear" />
  </div></Paper>;

export default Issues;
