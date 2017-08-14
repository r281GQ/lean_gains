import React from 'react';
import { Field } from 'redux-form/immutable';
import { TextField, DatePicker } from 'redux-form-material-ui';

const CycledTraining = ({ isCycledTraining, formatDate }) =>
  isCycledTraining === 'cycle'
    ? <div>
        <Field
          name="startDayofTraining"
          component={DatePicker}
          floatingLabelText="Starting date of the training"
          fullWidth={true}
          format={formatDate}
        />
        <Field
          name="onEveryxDay"
          type="number"
          component={TextField}
          fullWidth={true}
          min={1}
          hintText="Happens on every X days"
        />
      </div>
    : null;

export default CycledTraining;
