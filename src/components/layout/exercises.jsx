import React from 'react';
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
      value={`0`}
      iconButtonElement={
        <IconButton>
          <ContentFilter color="white" />
        </IconButton>
      }
    >
      {_.map(exercises, exec =>
        <MenuItem
          key={exercises.indexOf(exec)}
          value={exercises.indexOf(exec)}
          primaryText={exec.toUpperCase()}
        />
      )}
    </IconMenu>
  </ToolbarGroup>;

export default Exercises;
