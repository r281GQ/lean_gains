import React from 'react';
import { Slider } from 'redux-form-material-ui';
import { FlatButton } from 'material-ui';

const CurrentSlider = props =>
  <div>
    <Slider {...props} />
    <FlatButton disabled={true} label={props.input.value} />
    {props.input.value === 40 ? <div>geci</div>: null}
  </div>;

export default CurrentSlider;
