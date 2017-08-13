import React from 'react';
import { Field } from 'redux-form/immutable';
import { FlatButton, ListItem } from 'material-ui';
import { Checkbox } from 'redux-form-material-ui';

import NoteField from './note_field';
import NameField from './name_field';
import ConditionalSetsField from './conditinal_sets_field';

//TODO: photo upload
const Exercise = ({
  fields: { remove },
  item,
  index,
  passedMarker,
  normalizeMarker
}) =>
  <ListItem key={index} disabled={true}>
    <div>
      <NameField item={item} />
    </div>
    <div>
      <NoteField item={item} />
    </div>
    <div>
      <Field
        name={`${item}.marker`}
        component={Checkbox}
        label="Mark as completed without setting any sets"
        normalize={normalizeMarker}
      />
    </div>
    <FlatButton onTouchTap={() => remove(index)} label={`Remove exercise`} />
    <ConditionalSetsField passedMarker={passedMarker} item={item} />
  </ListItem>;

export default Exercise;
