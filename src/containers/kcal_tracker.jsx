import React, { PureComponent } from 'react';
import { reduxForm, submit } from 'redux-form/immutable';
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

import styled from 'styled-components';

import CalorieLog from './../components/calorie_log';

const Contianer = styled.div`
  position: relative;
  overflow: hidden;
`;

// const MainField = styled.div`
//   position: absolute;
//   width: 66%;
// `;
//
// const SideField = styled.div`
//   position: absolute;
//   width: 33%;
//   right: 0px;
// `;

const MainField = styled.div`
  float: left;
  width: 66%;
`;

const SideField = styled.div`
  float: right;
  width: 33%;
`;

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
    <Contianer>
      <CalorieTrackerSummary
        sum={this._roundAndConvertSum(this.props.sum).toJS()}
      />
      <NutritionSearchBar onKeyPressHandler={this._onKeyPressHandler} />
      <form
        onSubmit={this.props.handleSubmit(formProps => {
          this.props.updateCalorieLog(formProps.get('foods').toJS());
        })}
      >
        <CenteredSubmitButton label="Update day" />
        <FoodsFieldArray />
      </form>
    </Contianer>;
}

const mapDispatchToProps = dispatch => {
  return {
    search: query => dispatch(search(query)),
    updateCalorieLog: calorieLog => dispatch(updateCalorieLog(calorieLog))
  };
};

const mapStateToProps = state => {
  return {
    sum: sumMacros(state),
    calorieLog: state.getIn(['calorieLog']) || Map()
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  reduxForm({
    form: 'calorie-track',
    shouldValidate: () => true
  })(CalorieTrackerContainer)
);
