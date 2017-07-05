import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form/immutable";
import { Route, Link } from "react-router-dom";

import DailyLogForm from "./../components/daily_log_form";

import { createLog } from "./../store/actionCreators/daily_log_action_creators";

class DailyLogContainer extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const { handleSubmit, createLog, reset } = this.props;
    return (
      <div>
        <Route path="/dailylog/create" component={DailyLogForm} />
        <Link to="/dailylog/create">
          <span>sdfsd</span>
        </Link>
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
