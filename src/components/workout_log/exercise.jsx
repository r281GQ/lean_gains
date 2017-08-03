import React from 'react';
import { Field } from 'redux-form/immutable';
import { FlatButton } from 'material-ui';
import { ListItem } from 'material-ui';
import { Checkbox } from 'redux-form-material-ui';

import NoteField from './note_field';
import NameField from './name_field';
import ConditionalSetsField from './conditinal_sets_field';

const Exercise = ({ fields: { remove }, item, index, passedMarker, normalizeMarker }) =>
  <ListItem key={index} disabled={true}>
    <NameField item={item} />
    <NoteField item={item} />
    <Field
      name={`${item}.marker`}
      component={Checkbox}
      label="Mark as completed without setting any sets"
      normalize={normalizeMarker}
    />
    <FlatButton onTouchTap={() => remove(index)} label={`Remove exercise`} />
    <ConditionalSetsField passedMarker={passedMarker} item={item} />
  </ListItem>;

export default Exercise;
