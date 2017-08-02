import React, { Component } from 'react';
// import React from "react";
import { Field, FieldArray } from 'redux-form/immutable';
import { FlatButton } from 'material-ui';
import { List, ListItem } from 'material-ui';
import { Checkbox, TextField } from 'redux-form-material-ui';
import { Map, fromJS } from 'immutable';

import NoteField from './../components/note_field';
import NameField from './../components/name_field';
import SetsFieldArray from './../components/sets_field_array';

const Conditional = ({ fields: { get }, index, item }) => {
  return get(index).get('marker')
    ? null
    : <FieldArray name={`${item}.sets`} component={SetsFieldArray} />;
};

// const fff = ({get, index, item, stuff}) => {
// console.log(get(index).toJS());
// const d = stuff.get(index);
// get(index).getIn(["marker"])
export default Conditional;
