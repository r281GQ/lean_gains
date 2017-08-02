import React, { PureComponent } from 'react';
import { reduxForm, submit } from 'redux-form/immutable';
import { List } from 'immutable';
import { connect } from 'react-redux';
import * as _ from 'lodash';

import NutritionSearchBar from './../components/nutrition_search_bar';
import CenteredSubmitButton from './../components/centered_submit_button';
import CalorieTrackerSummary from './../components/calorie_tracker_summary';
import FoodsFieldArray from './../components/foods_field_array';
import sumMacros from './../store/selectors/sum_macros';
import search from './../store/actionCreators/calorie_action_creators';

//TODO favourite foods like shortcut or tag, recentsearches and recipes
//TODO autoSave functionanilty refactor to an action creator (saga)
class CalorieTrackerContainer extends PureComponent {
  _onKeyPressHandler = ({ key, target: { value } }) => {
    if (key === 'Enter') {
      const { search } = this.props;
      search(value);
      value = '';
    }
  };

  _roundAndConvertSum = sum => sum.map(value => _.round(value));

  render = () =>
    <div>
      <CalorieTrackerSummary
        sum={this._roundAndConvertSum(this.props.sum).toJS()}
      />
      <NutritionSearchBar onKeyPressHandler={this._onKeyPressHandler} />
      <form
        onSubmit={this.props.handleSubmit(form => console.log(form.toJS()))}
      >
        <CenteredSubmitButton label="Update day" />
        <FoodsFieldArray />
      </form>
    </div>;
}

const mapDispatchToProps = dispatch => {
  return {
    search: query => dispatch(search(query))
  };
};

const mapStateToProps = state => {
  return {
    sum: sumMacros(state)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  reduxForm({
    form: 'calorie-track',
    shouldValidate: () => true
  })(CalorieTrackerContainer)
);
