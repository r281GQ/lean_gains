import React from 'react';
import PropTypes from 'prop-types';

import UserNamePicker from './user_name_picker';
import SubmitButton from './../submit_button';
import SexPicker from './sex_picker';
import DOBPickerField from './dob_picker_field';

const UserDetailsForm = ({ updateUserDetails, handleSubmit, validators }) =>
  <form onSubmit={handleSubmit(formProps => updateUserDetails(formProps))}>
    <UserNamePicker validator={validators.userName} />
    <DOBPickerField minDate={validators.minDate} maxDate={validators.maxDate} />
    <SexPicker />
    <SubmitButton label={`Update`} />
  </form>;

UserDetailsForm.propTypes = {
  updateUserDetails: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  validators: PropTypes.shape({
    userName: PropTypes.func.isRequired,
    minDate: PropTypes.object.isRequired,
    maxDate: PropTypes.object.isRequired
  })
};

export default UserDetailsForm;
