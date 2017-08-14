import React from 'react';
import { List, ListItem, RaisedButton, FlatButton } from 'material-ui';
import { fromJS } from 'immutable';

import WeightField from './weight_field';
import RepsField from './reps_field';

const SetsFieldArray = ({ fields: { map, remove, length, insert } }) =>
  <List>
    <ListItem disabled={true}>
      <RaisedButton
        fullWidth
        onTouchTap={() => {
          insert(length, fromJS({}));
        }}
        label={`Add set`}
      />
    </ListItem>
    {map((item, index) =>
      <ListItem key={index} disabled={true}>
        <WeightField item={item} />
        <div className="row">
          <div className="col col-6">
            <RepsField item={item} />
          </div>
          <div className="col col-6">
            <FlatButton onTouchTap={() => remove(index)} label={`Remove set`} />
          </div>
          <div className="clear" />
        </div>
      </ListItem>
    )}
  </List>;

export default SetsFieldArray;
