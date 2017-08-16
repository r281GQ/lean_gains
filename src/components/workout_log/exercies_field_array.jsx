import React from 'react';
import PropTypes from 'prop-types';
import { List, RaisedButton, Paper } from 'material-ui';
import { fromJS } from 'immutable';

import Exercise from './exercise';

//TODO: imm or not imm
const ExerciseFieldArray = props =>
  <div>
    <RaisedButton
      fullWidth
      onTouchTap={() =>
        props.fields.insert(props.fields.length, fromJS({ marker: false }))}
      label={`Add exercise`}
    />
    <List>
      {props.fields.map((item, index) =>
        <Paper key={index}>
          <Exercise
            {...props}
            index={index}
            item={item}
            passedMarker={props.passedMarkerList.get(index)}
          />
        </Paper>,
      )}
    </List>
  </div>;

ExerciseFieldArray.propTypes = {
  passedMarkerList: PropTypes.object,
};

export default ExerciseFieldArray;
