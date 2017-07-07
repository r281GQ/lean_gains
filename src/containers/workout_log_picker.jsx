import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { Link } from "react-router-dom";
import {
  List,
  ListItem,
  FlatButton,
  DropDownMenu,
  MenuItem
} from "material-ui";
import * as _ from "lodash";

class WorkoutLogPicker extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <DropDownMenu value={this.props.selected} onChange={this.props.handler}>
          <MenuItem value={1} primaryText="may" />
          <MenuItem value={2} primaryText="june" />
        </DropDownMenu>
        <List>

            {_.map(this.props.logs, log =>
              <Link to={`/workoutlog/edit/${log._id}`} key={Math.random() } style={{ textDecoration: 'none' }}>
              <ListItem key={Math.random()} >
                {log._id}
              </ListItem>
              </Link>
            )}
            sdf

        </List>
        <FlatButton label="go" />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(
  reduxForm({ form: "sdfs" })(WorkoutLogPicker)
);
