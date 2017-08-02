import React from 'react';
import { FlatButton } from 'material-ui';
import { List, ListItem } from 'material-ui';
import { fromJS } from 'immutable';

import WeightField from './../components/weight_field';
import RepsField from './../components/reps_field';

const SetsFieldArray = ({ fields: { map, remove, length, insert } }) =>
  <List>
    <ListItem disabled={true}>
      <FlatButton
        onTouchTap={() => {
          insert(length, fromJS({}));
        }}
        label={`Add set`}
      />
    </ListItem>
    {map((item, index) =>
      <ListItem key={index} disabled={true}>
        <WeightField item={item} />
        <RepsField item={item} />
        <FlatButton onTouchTap={() => remove(index)} label={`Remove set`} />
      </ListItem>
    )}
  </List>;

export default SetsFieldArray;
