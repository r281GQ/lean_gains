import React, { PureComponent } from 'react';
import { reduxForm, formValueSelector, submit } from 'redux-form/immutable';
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

  _roundAndConvertSum = sum => _.mapValues(sum.toJS(), value => _.round(value));

  render = () =>
    <div>
      <CalorieTrackerSummary sum={this._roundAndConvertSum(this.props.sum)} />
      <NutritionSearchBar onKeyPressHandler={this._onKeyPressHandler} />
      <form
        onSubmit={this.props.handleSubmit(form => console.log(form.toJS()))}
      >
        <CenteredSubmitButton label="Update day" />
        <FoodsFieldArray values={this.props.values.toJS()} />
      </form>
    </div>;
}

const selector = formValueSelector('calorie-track');

const mapDispatchToProps = dispatch => {
  return {
    search: query => dispatch(search(query))
  };
};

const mapStateToProps = state => {
  return {
    sum: sumMacros(state),
    results: state.getIn(['kcal', 'searchResults'])
  };
};

CalorieTrackerContainer = connect(state => ({
  values: selector(state, 'foods') || List()
}))(CalorieTrackerContainer);

export default connect(mapStateToProps, mapDispatchToProps)(
  reduxForm({
    form: 'calorie-track',
    shouldValidate: () => true
  })(CalorieTrackerContainer)
);
