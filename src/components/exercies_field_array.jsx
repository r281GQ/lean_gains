import React from 'react';
import { FlatButton } from 'material-ui';
import { List, ListItem } from 'material-ui';
import { fromJS } from 'immutable';

import Exercise from './exercise';

const ExerciseFieldArray = props =>
  <List>
    <ListItem disabled={true}>
      <FlatButton
        onTouchTap={() => {
          props.fields.insert(props.fields.length, fromJS({ marker: false }));
        }}
        label={`Add exercise`}
      />
    </ListItem>
    {props.fields.map((item, index) =>
      <Exercise
        {...props}
        key={index}
        index={index}
        item={item}
        passedMarker={props.passedMarkerList.get(index)}
      />
    )}
  </List>;

export default ExerciseFieldArray;
