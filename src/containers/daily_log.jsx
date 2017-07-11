import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form/immutable";
import { Route, Link } from "react-router-dom";

import DailyLogForm from "./../components/daily_log_form";
import DailyLogPicker from "./daily_log_picker";

import { FloatingActionButton } from "material-ui";
import ContentAdd from "material-ui/svg-icons/content/add";
import { createLog } from "./../store/actionCreators/daily_log_action_creators";

class DailyLogContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { selected: 0 };
  }

  change = (f, d, g) => this.setState({ selected: g });

  render() {
    const { handleSubmit, createLog, reset } = this.props;
    return (
      <div>
        <Route
          exact
          path="/dailyLog"
          render={props =>
            <DailyLogPicker
              {...props}
              selected={this.state.selected}
              change={this.change}
              logs={this.props.logs}
            />}
        />
        <Route
          path="/dailylog/create"
          render={props =>
            <DailyLogForm
              {...props}
              createLogHandler={this.props.handleSubmit(
                ({
                  protein,
                  carbohydrate,
                  fat,
                  neck,
                  chest,
                  weight,
                  rightArm,
                  leftArm,
                  aboveBelly,
                  belly,
                  belowBelly,
                  hips,
                  rightThigh,
                  leftThigh,
                  sleepIssues,
                  stressIssues,
                  hungerIssues,
                  fatigueLethargy
                }) => {
                  this.props.createLog({
                    macros: { protein, carbohydrate, fat },
                    measurements: {
                      neck,
                      chest,
                      weight,
                      rightArm,
                      leftArm,
                      aboveBelly,
                      belly,
                      belowBelly,
                      hips,
                      rightThigh,
                      leftThigh
                    },
                    sleepIssues,
                    stressIssues,
                    hungerIssues,
                    fatigueLethargy
                  });
                  reset();
                }
              )}
            />}
        />

        <div>
          <Link to="/dailylog/create">
            <FloatingActionButton
              style={{
                position: "fixed",
                bottom: 20,
                right: 20
              }}
            >
              <ContentAdd />
            </FloatingActionButton>
          </Link>
        </div>
      </div>
    );
  }
}
// <DailyLogForm
//   createLogHandler={handleSubmit(
//     ({
//       protein,
//       carbohydrate,
//       fat,
//       fibre,
//       chest,
//       weight,
//       rightArm,
//       leftArm,
//       aboveBelly,
//       belly,
//       belowBelly,
//       hips,
//       rightThigh,
//       leftThigh,
//       sleepIssues,
//       stressIssues,
//       hungerIssues,
//       fatigueLethargy
//     }) => {
//       createLog({
//         macros: { protein, carbohydrate, fat, fibre },
//         measurements: {
//           chest,
//           weight,
//           rightArm,
//           leftArm,
//           aboveBelly,
//           belly,
//           belowBelly,
//           hips,
//           rightThigh,
//           leftThigh
//         },
//         sleepIssues,
//         stressIssues,
//         hungerIssues,
//         fatigueLethargy
//       });
//       reset();
//     }
//   )}
// />

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    createLog: dailyLog => dispatch(createLog(dailyLog))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  reduxForm({ form: "dailyLog" })(DailyLogContainer)
);
