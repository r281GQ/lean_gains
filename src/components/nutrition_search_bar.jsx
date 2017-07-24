import React from 'react';
import { TextField } from 'material-ui';

const NutritionSearchBar = ({ onKeyPressHandler }) =>
  <TextField
    fullWidth={true}
    name="search"
    floatingLabelText="search for nutritions"
    onKeyPress={onKeyPressHandler}
  />;

export default NutritionSearchBar;
