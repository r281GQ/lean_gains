import React from 'react';
import { FieldArray } from 'redux-form/immutable';

import Nutritions from './nutritions';

const FoodFieldArray = ({ values }) =>
  <FieldArray name="foods" component={Nutritions} values={values} />;

export default FoodFieldArray;
