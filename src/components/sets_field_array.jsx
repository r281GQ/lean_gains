import React from "react";
import { Field } from "redux-form/immutable";
import { FlatButton } from "material-ui";
import { List, ListItem } from "material-ui";

import imm from 'immutable'

import WeightField from "./../components/weight_field";
import RepsField from "./../components/reps_field";

const SetsFieldArray = ({ fields: { push, map, remove, length, insert }}) =>
  <List>
    <ListItem disabled={true}>
      <FlatButton
        onTouchTap={() => {
          insert(length, imm.fromJS({}));
        }}
        label={`Add set`}
      />
    </ListItem>
    {map((item, index) =>
      <ListItem key={index} disabled={true}>
        <WeightField item={item}  />
        <RepsField item={item} />
        <FlatButton onTouchTap={() => remove(index)} label={`Remove set`} />
      </ListItem>
    )}
  </List>;

export default SetsFieldArray;

// currentValue={sets[index].weight}
