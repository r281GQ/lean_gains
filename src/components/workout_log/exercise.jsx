import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form/immutable';
import { FlatButton, ListItem, Paper } from 'material-ui';
import { Checkbox } from 'redux-form-material-ui';

import NoteField from './note_field';
import NameField from './name_field';
import ConditionalSetsField from './conditinal_sets_field';

const Exercise = ({
  fields: { remove },
  item,
  index,
  passedMarker,
  normalizeMarker
}) =>
  <ListItem key={index} disabled={true}>
    <div className="row">
      <div className="col col-6">
        <NameField item={item} />
      </div>
      <div className="col col-6">
        <NoteField item={item} />
      </div>
      <div className="clear" />
    </div>
    <div className="row">
      <Field
        name={`${item}.marker`}
        component={Checkbox}
        label="Mark as completed without setting any sets"
        normalize={normalizeMarker}
      />
      <div className="clear" />
    </div>
    <FlatButton
      fullWidth
      onTouchTap={() => remove(index)}
      label={`Remove exercise`}
    />
    <Paper>
      <ConditionalSetsField passedMarker={passedMarker} item={item} />
    </Paper>
  </ListItem>;

Exercise.propTypes = {
  item: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  passedMarker: PropTypes.bool.isRequired,
  normalizeMarker: PropTypes.func.isRequired
};

export default Exercise;
