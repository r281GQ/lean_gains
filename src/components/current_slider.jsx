import React from 'react';
import { Slider } from 'redux-form-material-ui';
import { FlatButton } from 'material-ui';

const CurrentSlider = props =>
  <div>
    <Slider {...props} />
    <div style={{ textAlign: 'center' }}>
      <FlatButton
        disabled={true}
        label={`${props.input.name}  ${props.input.value}`}
      />
    </div>
  </div>;

export default CurrentSlider;
