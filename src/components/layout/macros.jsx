import React from 'react';
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

export default Macros;
