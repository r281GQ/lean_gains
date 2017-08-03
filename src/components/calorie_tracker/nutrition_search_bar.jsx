import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from 'material-ui';

const NutritionSearchBar = ({ onKeyPressHandler }) =>
  <TextField
    fullWidth={true}
    name="search"
    floatingLabelText="search for nutritions"
    onKeyPress={onKeyPressHandler}
  />;

NutritionSearchBar.propTypes = {
  onKeyPressHandler: PropTypes.func.isRequired
};

export default NutritionSearchBar;
