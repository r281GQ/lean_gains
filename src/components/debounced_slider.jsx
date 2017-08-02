import React from 'react';
import {Slider} from 'redux-form-material-ui';

import * as _ from 'lodash';

const DebouncedSlider = (input) => {

console.log(input);
  const deb = _.debounce(input.input.onChange, 1500, {'leading': true,
  'trailing': true});
  return (<div>
<Slider
  {...input}


/>
{input.input.value}
</div>
  );
}


export default DebouncedSlider;
