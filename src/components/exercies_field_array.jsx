import React from 'react';
import { Field, FieldArray } from 'redux-form/immutable';
import { FlatButton } from 'material-ui';
import { List, ListItem } from 'material-ui';
import { Checkbox, TextField } from 'redux-form-material-ui';
import { Map, fromJS } from 'immutable';

import NoteField from './../components/note_field';
import NameField from './../components/name_field';
import SetsFieldArray from './../components/sets_field_array';

import JJJ from './../containers/jjj';
// {
//   fields: { push, map, remove, get, getAll, length, insert }
//   // ,
//   // stuff
// }
const ExerciseFieldArray = (props) =>
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
      <JJJ
        {...props}
        key={index}
        index={index}
        item={item}
      />
    )}
  </List>;



  // <JJJ
  //   key={index}
  //   index={index}
  //   item={item}
  //   get={get}
  //   remove={remove}
  //   getAll={getAll}
  //   stuff={stuff}
  // />
// sets={item[index].sets}
//
//
//
// <Field
//   name={`${item}.marker`}
//   component={Checkbox}
//   label="Mark as completed without setting any sets"
// />
//
//
//
//
//
//
//

{
  /* <ListItem key={index} disabled={true}>
  <NameField item={item} />
  <NoteField item={item} />
  <Field
    name={`${item}.marker`}
    component={Checkbox}
    label="Mark as completed without setting any sets"
    onChange = {event => {
      console.log(getAll().toJS())

      console.log(event)}

    }
  />
  <FlatButton
    onTouchTap={() => remove(index)}
    label={`Remove exercise`}
  />{console.log(get(index).toJS(), get(index).get("marker"))}
  {get(index).get("marker")
    ? null
    : <FieldArray
        name={`${item}.sets`}
        component={SetsFieldArray}

      />}
</ListItem>
)} */
}
export default ExerciseFieldArray;
