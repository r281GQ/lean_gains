import React from 'react';
import PropTypes from 'prop-types';
import { Paper } from 'material-ui';

import UserNamePicker from './user_name_picker';
import SubmitButton from './../submit_button';
import SexPicker from './sex_picker';
import DOBPickerField from './dob_picker_field';

const UserDetailsForm = ({
  handleUpdateUserDetails,
  handleSubmit,
  validators,
  normalizeDate
}) =>
  <Paper className="user-details-paper">
    <form onSubmit={handleUpdateUserDetails}>
      <UserNamePicker validator={validators.userName} />
      <DOBPickerField
        minDate={validators.minDate}
        maxDate={validators.maxDate}
        normalize={normalizeDate}
      />
      <SexPicker />
      <SubmitButton label={`Update`} />
    </form>
  </Paper>;

UserDetailsForm.propTypes = {
  handleUpdateUserDetails: PropTypes.func.isRequired,
  normalizeDate: PropTypes.func.isRequired,
  validators: PropTypes.shape({
    userName: PropTypes.func.isRequired,
    minDate: PropTypes.object.isRequired,
    maxDate: PropTypes.object.isRequired
  })
};

export default UserDetailsForm;
