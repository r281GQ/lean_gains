import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form/immutable';
import { connect } from 'react-redux';
import { fromJS } from 'immutable';
import moment from 'moment';

import { updateUserDetails } from './../store/actionCreators/user_details_action_creators';
import { required } from './../services/validators';
import UserDetailsForm from './../components/user_details/user_details_form';

class UserDetailsContainer extends PureComponent {
  componentDidMount() {
    const { userName, dob, sex, initialize } = this.props;
    initialize(fromJS({ userName, dob: moment(dob).toDate(), sex }));
  }

  render() {
    const { handleSubmit, updateUserDetails } = this.props;

    return (
      <div className="user-details">
        <UserDetailsForm
          {...this.props}
          handleUpdateUserDetails={handleSubmit(formProps =>
            updateUserDetails({
              userName: formProps.get('userName'),
              sex: formProps.get('sex'),
              dob: moment(formProps.get('dob')).valueOf()
            })
          )}
          normalizeDate={value => moment(value).valueOf()}
          validators={{
            userName: required,
            minDate: moment().subtract(110, 'years').toDate(),
            maxDate: moment().subtract(5, 'years').toDate()
          }}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  sex: state.getIn(['userDetails', 'sex']),
  dob: moment(state.getIn(['userDetails', 'dob'])).toDate(),
  userName: state.getIn(['userDetails', 'userName'])
});

UserDetailsContainer.propTypes = {
  userName: PropTypes.string,
  dob: PropTypes.instanceOf(Date),
  sex: PropTypes.oneOf(['male', 'female']),
  updateUserDetails: PropTypes.func
};

export default connect(mapStateToProps, { updateUserDetails })(
  reduxForm({
    form: 'user-details'
  })(UserDetailsContainer)
);
