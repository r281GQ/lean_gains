import React from 'react';
import { FieldArray } from 'redux-form/immutable';

import Nutritions from './nutritions';

const FoodFieldArray = () => <FieldArray name="foods" component={Nutritions} />;

export default FoodFieldArray;
