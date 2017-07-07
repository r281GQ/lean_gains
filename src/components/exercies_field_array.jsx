import React from "react";
import { Field, FieldArray } from "redux-form/immutable";
import { FlatButton } from "material-ui";
import { List, ListItem } from "material-ui/List";

import NoteField from "./../components/note_field";
import NameField from "./../components/name_field";
import SetsFieldArray from "./../components/sets_field_array";

//TODO: toggleba done if it cant be assigned to sets
const ExerciseFieldArray = ({ fields: { push, map, remove }, values }) =>
  <List>
    <ListItem disabled={true}>
      <FlatButton
        onTouchTap={() => {
          push({});
        }}
        label={`Add exercise`}
      />
    </ListItem>
    {map((item, index) =>
      <ListItem key={index} disabled={true}>
        <NameField item={item} />
        <NoteField item={item} />
        <FlatButton
          onTouchTap={() => remove(index)}
          label={`Remove exercise`}
        />
        <FieldArray
          name={`${item}.sets`}
          component={SetsFieldArray}
          exercise={values[index]}
        />
      </ListItem>
    )}
  </List>;

export default ExerciseFieldArray;
