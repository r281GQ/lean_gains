import React, { PureComponent } from 'react';
import { reduxForm } from 'redux-form/immutable';
import { List, Map } from 'immutable';
import { connect } from 'react-redux';
import * as _ from 'lodash';

import NutritionSearchBar from './../components/calorie_tracker/nutrition_search_bar';
import CenteredSubmitButton from './../components/centered_submit_button';
import CalorieTrackerSummary from './../components/calorie_tracker/calorie_tracker_summary';
import FoodsFieldArray from './../components/calorie_tracker/foods_field_array';
import sumMacros from './../store/selectors/sum_macros';
import {
  search,
  updateCalorieLog
} from './../store/actionCreators/calorie_action_creators';

//TODO favourite foods like shortcut or tag, recentsearches and recipes
class CalorieTrackerContainer extends PureComponent {
  _onKeyPressHandler = ({ key, target: { value } }) => {
    if (key === 'Enter') {
      const { search } = this.props;
      search(value);
      value = '';
    }
  };

  _roundAndConvertSum = sum => sum.map(value => _.round(value));

  render() {
    const { handleSubmit, updateCalorieLog, sum } = this.props;
    return (
      <div>
        <CalorieTrackerSummary sum={this._roundAndConvertSum(sum).toJS()} />
        <NutritionSearchBar onKeyPressHandler={this._onKeyPressHandler} />
        <form
          onSubmit={handleSubmit(formProps => {
            updateCalorieLog(formProps.get('foods').toJS());
          })}
        >
          <FoodsFieldArray />
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    search: query => dispatch(search(query)),
    updateCalorieLog: calorieLog => dispatch(updateCalorieLog(calorieLog))
  };
};

const mapStateToProps = state => ({
  sum: sumMacros(state)
});

export default connect(mapStateToProps, mapDispatchToProps)(
  reduxForm({
    form: 'calorie-track',
    onSubmit: (formProps, dispatch, props) =>
      dispatch(updateCalorieLog(formProps.get('foods').toJS())),
    shouldValidate: () => true
  })(CalorieTrackerContainer)
);
