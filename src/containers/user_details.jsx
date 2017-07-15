import React, { Component } from "react";
import { reduxForm, Field } from "redux-form/immutable";
import { connect } from "react-redux";
import {
  DatePicker,
  TextField,
  RadioButtonGroup
} from "redux-form-material-ui";
import { RadioButton, FlatButton } from "material-ui";
import moment from "moment";

import { updateUserDetails } from "./../store/actionCreators/user_details_action_creators";
import { required } from "./../services/validators";

class UserDetailsContainer extends Component {
  componentWillMount() {
    const { userName, dob, sex } = this.props;
    this.props.change("username", userName);
    this.props.change("dob", moment(dob).toDate());
    this.props.change("gender", sex);
  }

  render() {
    const { userName, dob, sex, updateUserDetails, handleSubmit } = this.props;
    return (
      <div>
        <form
          onSubmit={handleSubmit(formProps => {
            updateUserDetails(formProps);
          })}
        >
          <Field
            name="username"
            component={TextField}
            hintText="username"
            validate={required("username cannot be empty")}
          />
          <Field
            name="dob"
            component={input =>
              <DatePicker
                maxDate={moment().subtract(5, "years").toDate()}
                minDate={moment().subtract(110, "years").toDate()}
                {...input}
                formatDate={value => moment(value).format("DD-MM-YYYY")}
              />}
          />
          <Field name="sex" component={RadioButtonGroup}>
            <RadioButton value="male" label="Male" />
            <RadioButton value="female" label="Female" />
          </Field>
          <FlatButton type="submit" label={`Update`} />
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  sex: state.getIn(["userDetails", "sex"]),
  dob: state.getIn(["userDetails", "dob"]),
  userName: state.getIn(["userDetails", "userName"])
});

export default connect(mapStateToProps, dispatch => ({
  updateUserDetails: userDetails => dispatch(updateUserDetails())
}))(
  reduxForm({
    form: "userdetails"
  })(UserDetailsContainer)
);
