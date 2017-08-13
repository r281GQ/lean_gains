import React from 'react';
import { List, ListItem, FlatButton } from 'material-ui';
import { fromJS } from 'immutable';

import Exercise from './exercise';

const ExerciseFieldArray = props =>
  <div>
    <List>
      {props.fields.map((item, index) =>
        <Exercise
          {...props}
          key={index}
          index={index}
          item={item}
          passedMarker={props.passedMarkerList.get(index)}
        />
      )}
    </List>
    <FlatButton
      onTouchTap={() => {
        props.fields.insert(props.fields.length, fromJS({ marker: false }));
      }}
      label={`Add exercise`}
    />
  </div>;

export default ExerciseFieldArray;
