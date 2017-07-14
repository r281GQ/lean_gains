import React from "react";
import { reduxForm, Field } from "redux-form/immutable";
import { connect } from "react-redux";
import {
  DatePicker,
  TextField,
  RadioButtonGroup
} from "redux-form-material-ui";
import { RadioButton, FlatButton } from "material-ui";
import moment from "moment";

import {required} from './../services/validators';



//TODO implement measerment prefernce changes
class UserDetailsContainer extends React.Component {
  componentWillMount() {
    this.props.change("username", this.props.userName);
    this.props.change("dob", moment(this.props.dob).toDate());
    this.props.change("gender", this.props.sex);
  }

  render() {
    const { updateHandler, handleSubmit } = this.props;
    return (
      <div>
        <form
          onSubmit={handleSubmit(formProps => {
            updateHandler(formProps);
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
          <Field name="gender" component={RadioButtonGroup}>
            <RadioButton value="male" label="Male" />
            <RadioButton value="female" label="Female" />
          </Field>
          <FlatButton type="submit" label={`update`} />
        </form>
      </div>
    );
  }
}

//TODO: it is a container so it should reatin his own props from redux directyl
//TODO: gender, dob, name
export default connect()(
  reduxForm({
    form: "userdetails"
  })(UserDetailsContainer)
);
