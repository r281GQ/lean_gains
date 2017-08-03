import React, { PureComponent } from 'react';
import { reduxForm } from 'redux-form/immutable';
import { connect } from 'react-redux';
import moment from 'moment';

import { updateUserDetails } from './../store/actionCreators/user_details_action_creators';
import { required } from './../services/validators';

import UserDetailsForm from './../components/user_details/user_details_form';

const initValues = ({ userName, dob, sex, change }) => {
  change('userName', userName);
  change('dob', moment(dob).toDate());
  change('sex', sex);
};

const prepareFormProps = ({ userName, dob, sex }) => ({
  userName,
  sex,
  dob: moment(dob).valueOf()
});

class UserDetailsContainer extends PureComponent {
  componentWillMount = () => initValues(this.props);

  render = () =>
    <UserDetailsForm
      {...this.props}
      validators={{
        required,
        minDate: moment().subtract(110, 'years').toDate(),
        maxDate: moment().subtract(5, 'years').toDate()
      }}
    />;
}

const mapStateToProps = state => ({
  sex: state.getIn(['userDetails', 'sex']),
  dob: state.getIn(['userDetails', 'dob']),
  userName: state.getIn(['userDetails', 'userName'])
});

const mapDispatchToProps = dispatch => ({
  updateUserDetails: userDetails =>
    dispatch(updateUserDetails(prepareFormProps(userDetails)))
});

export default connect(mapStateToProps, mapDispatchToProps)(
  reduxForm({
    form: 'userdetails'
  })(UserDetailsContainer)
);
