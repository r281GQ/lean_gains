import React from "react";
import { Field } from "redux-form/immutable";
import { FlatButton } from "material-ui";
import { List, ListItem } from "material-ui/List";

import WeightField from "./../components/weight_field";
import RepsField from "./../components/reps_field";

const SetsFieldArray = ({ fields: { push, map, remove }}) =>
  <List>
    <ListItem disabled={true}>
      <FlatButton
        onTouchTap={() => {
          push({});
        }}
        label={`Add set`}
      />
    </ListItem>
    {map((item, index) =>
      <ListItem key={index} disabled={true}>
        <WeightField item={item} currentValue={item[index].weight} />
        <RepsField item={item} />
        <FlatButton onTouchTap={() => remove(index)} label={`Remove set`} />
      </ListItem>
    )}
  </List>;

export default SetsFieldArray;
