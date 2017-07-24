import React from "react";
import { Field, FieldArray } from "redux-form/immutable";
import { FlatButton } from "material-ui";
import { List, ListItem } from "material-ui/List";
import { Checkbox } from "redux-form-material-ui";

import NoteField from "./../components/note_field";
import NameField from "./../components/name_field";
import SetsFieldArray from "./../components/sets_field_array";

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
        <Field
          name={`${item}.marker`}
          component={Checkbox}
          label="Mark as completed without setting any sets"
        />
        <FlatButton
          onTouchTap={() => remove(index)}
          label={`Remove exercise`}
        />
        {item.marker
          ? null
          : <FieldArray
              name={`${item}.sets`}
              component={SetsFieldArray}
              exercise={item[index]}
            />}
      </ListItem>
    )}
  </List>;

export default ExerciseFieldArray;
