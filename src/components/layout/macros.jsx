import React from 'react';
import PropTypes from 'prop-types';
import { ToolbarGroup, ToolbarTitle, CircularProgress } from 'material-ui';

const Macros = ({ todaysMacros, isFetching }) =>
  <ToolbarGroup>
    {isFetching
      ? <CircularProgress />
      : <ToolbarTitle
          style={{ color: '#EEEEEE' }}
          text={`Macros: ${todaysMacros.calorie} P: ${todaysMacros.protein} C: ${todaysMacros.carbohydrate} F: ${todaysMacros.fat}`}
        />}
  </ToolbarGroup>;

Macros.propTypes = {
  isFetching: PropTypes.bool,
  todaysMacros: PropTypes.shape({
    calorie: PropTypes.number,
    protein: PropTypes.number,
    carbohydrate: PropTypes.number,
    fat: PropTypes.number
  })
};

export default Macros;
