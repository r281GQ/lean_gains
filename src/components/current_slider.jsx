import React from 'react';
import { Slider } from 'redux-form-material-ui';
import { FlatButton } from 'material-ui';
import * as _ from 'lodash';

const CurrentSlider = props =>
  <div>
    <Slider {...props} />
    <div className="current-slider">
      <FlatButton
        disabled={true}
        label={`${_.isNaN(props.input.value) ? 0 : props.input.value}`}
      />
    </div>
  </div>;

export default CurrentSlider;
