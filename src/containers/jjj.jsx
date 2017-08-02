import React, { Component } from 'react';
// import React from "react";
import { Field, FieldArray } from "redux-form/immutable";
import { FlatButton } from "material-ui";
import { List, ListItem } from "material-ui";
import { Checkbox, TextField } from "redux-form-material-ui";
import {Map, fromJS} from 'immutable'

import NoteField from "./../components/note_field";
import NameField from "./../components/name_field";
import SetsFieldArray from "./../components/sets_field_array";

// const {index, item, get, remove, getAll} = this.props;
// const {index, item, get, remove, getAll, stuff} = this.props;
import Fff from './fff'
class Exercise extends Component {
  render() {
    const {fields: {remove}, item, index} = this.props;
    return (
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

        <Conditional {...this.props}  index ={index} item = {item}/>
      </ListItem>
    );
  }
}
{/* <Fff {...this.props} get = {get} index ={index} item = {item} stuff={stuff}/> */}
// console.log(getAll().toJS())
  // {console.log(get(index).toJS(), get(index).get("marker"))}
// {get(index).get("marker")
//   ? null
//   : <FieldArray
//       name={`${item}.sets`}
//       component={SetsFieldArray}
//
//     />}

export default Exercise;
