import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form/immutable';
import { Checkbox } from 'redux-form-material-ui';

const FixedTraining = ({ isCycledTraining }) =>
  isCycledTraining === 'fix'
    ? <div className="row">
        <Field
          name="monday"
          label="Monday"
          component={Checkbox}
          style={{ float: 'left', width: '15%' }}
        />
        <Field
          name="tuesday"
          label="Tuesday"
          component={Checkbox}
          style={{ float: 'left', width: '15%' }}
        />
        <Field
          name="wednesday"
          label="Wednesday"
          component={Checkbox}
          style={{ float: 'left', width: '15%' }}
        />
        <Field
          name="thursday"
          label="Thursday"
          component={Checkbox}
          style={{ float: 'left', width: '15%' }}
        />
        <Field
          name="friday"
          label="Friday"
          component={Checkbox}
          style={{ float: 'left', width: '15%' }}
        />
        <Field
          name="saturday"
          label="Saturday"
          component={Checkbox}
          style={{ float: 'left', width: '15%' }}
        />
        <Field
          name="sunday"
          label="Sunday"
          component={Checkbox}
          style={{ float: 'right', width: '10%' }}
        />
        <div className="cl" />
      </div>
    : null;

FixedTraining.propTypes = {
isCycledTraining: PropTypes.oneOf(['fix' , 'cycle'])
};

export default FixedTraining;
