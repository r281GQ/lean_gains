import React from 'react';

import UserNamePicker from './user_name_picker';
import SubmitButton from './../submit_button';
import SexPicker from './sex_picker';
import DOBPickerField from './dob_picker_field';

const UserDetailsForm = ({ updateUserDetails, handleSubmit, validators }) =>
  <form onSubmit={handleSubmit(formProps => updateUserDetails(formProps))}>
    <UserNamePicker validators={validators.required} />
    <DOBPickerField minDate={validators.minDate} maxDate={validators.maxDate} />
    <SexPicker />
    <SubmitButton label={`Update`} />
  </form>;

export default UserDetailsForm;
