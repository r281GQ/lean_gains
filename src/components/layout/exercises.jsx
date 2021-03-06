import React from 'react';
import PropTypes from 'prop-types';
import * as _ from 'lodash';
import {
  IconButton,
  ToolbarGroup,
  ToolbarTitle,
  MenuItem,
  IconMenu
} from 'material-ui';
import ContentFilter from 'material-ui/svg-icons/navigation/arrow-downward';

const Exercises = ({ exercises }) =>
  <ToolbarGroup>
    <ToolbarTitle style={{ color: '#EEEEEE' }} text="Exercies for today" />
    <IconMenu
      value="0"
      iconButtonElement={
        <IconButton>
          <ContentFilter color="white" />
        </IconButton>
      }
    >
      {!_.isEmpty(exercises)
        ? _.map(exercises, exec =>
            <MenuItem
              key={exercises.indexOf(exec)}
              value={exercises.indexOf(exec)}
              primaryText={exec.toUpperCase()}
            />
          )
        : <MenuItem key={0} value={0} primaryText="NO EXERCISE FOR TODAY" />}
    </IconMenu>
  </ToolbarGroup>;

Exercises.propTypes = {
  exercises: PropTypes.arrayOf(PropTypes.string)
};

export default Exercises;
