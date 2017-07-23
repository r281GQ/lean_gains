import React, { PureComponent } from 'react';
import { reduxForm, formValueSelector } from 'redux-form/immutable';
import { connect } from 'react-redux';
import * as _ from 'lodash';

import * as calorie from './../services/kcal_service';
import age from './../store/selectors/age';
import { createKcalTarget } from './../store/actionCreators/user_details_action_creators';

import KcalTargetResult from './../components/kcal_target_result';
import BMRCalculationSelector from './../components/bmr_calculation_selector';
import BodyFatField from './../components/body_fat_field';
import ActivityLevelSelecor from './../components/activity_level_selector';
import CalorieSplitSelector from './../components/calorie_split_selector';
import CustomCalorieField from './../components/custom_calorie_field';
import ProteinField from './../components/protein_field';
import FatMethodSelector from './../components/fat_mathod_selector';
import FatSelector from './../components/fat_selector';
import CenteredSubmitButton from './../components/centered_submit_button';

const calculateMax = (tdee, dayCalorie, proteinCalorie, type) =>
  _.floor(
    calorie.unlessItsAbovezero(
      calorie[type === 'percentage' ? 'maxFatPercentage' : 'maxFatGram'](
        calorie.dayCalorie(tdee, dayCalorie),
        proteinCalorie
      )
    ),
    1
  );

//TODO debounce on sliders
class KcalTargerContainer extends PureComponent {
  componentDidMount = () => calorie.initValues(this.props);

  componentWillReceiveProps = (nextProps, nextState) => {
    calorie.adjustCaloriePercentage(this.props, nextProps);
    calorie.adjustFatRatio(this.props, nextProps);
  };

  render = () => {
    const {
      sex,
      latestMeasurements,
      age,
      fatMethod,
      activity,
      calorieSplit,
      handleSubmit,
      protein,
      bodyFat,
      bmrCalculationMethod,
      change,
      restDay,
      trainingDay,
      createCalorieTarget
    } = this.props;

    const tdee = calorie.tdeeCalculator(
      bmrCalculationMethod,
      latestMeasurements.get('weight'),
      latestMeasurements.get('height'),
      age,
      sex,
      activity,
      bodyFat
    );

    const proteinCalorie = calorie.calulateProteinTarget(
      bodyFat,
      bmrCalculationMethod,
      protein,
      latestMeasurements.get('weight')
    );

    const calorieTarget = calorie.createFinalValues(
      tdee,
      proteinCalorie,
      this.props
    );
    return (
      <div>
        <form onSubmit={handleSubmit(() => createCalorieTarget(calorieTarget))}>
          <BMRCalculationSelector />
          <BodyFatField bmrCalculationMethod={bmrCalculationMethod} />
          <ActivityLevelSelecor />
          <CalorieSplitSelector />
          <CustomCalorieField
            calorieSplit={calorieSplit}
            minRest={calorie.minCalorie(tdee, proteinCalorie)}
            minTraining={calorie.minCalorie(tdee, proteinCalorie)}
            normalize={value =>
              typeof value !== Number ? Number.parseFloat(value) : value}
          />
          <ProteinField />
          <FatMethodSelector />
          <FatSelector
            fatMethod={fatMethod}
            maxRestFatGrams={calculateMax(
              tdee,
              restDay,
              proteinCalorie,
              'gram'
            )}
            maxRestFatPercentage={calculateMax(
              tdee,
              restDay,
              proteinCalorie,
              'percentage'
            )}
            maxTrainingFatGrams={calculateMax(
              tdee,
              trainingDay,
              proteinCalorie,
              'gram'
            )}
            maxTrainingFatPercentage={calculateMax(
              tdee,
              trainingDay,
              proteinCalorie,
              'percentage'
            )}
            restFatGrams={this.props.restFatGrams}
            restFatPercentage={this.props.restFatPercentage}
            trainingFatGrams={this.props.trainingFatGrams}
            trainingFatPercentage={this.props.trainingFatPercentage}
          />
          <CenteredSubmitButton label="Create calorie target" />
        </form>
        <KcalTargetResult calorieTarget={calorieTarget} label="training" />
      </div>
    );
  };
}

const selector = formValueSelector('kcal-target');

KcalTargerContainer = connect(state => ({
  activity: selector(state, 'activity'),
  calorieSplit: selector(state, 'calorieSplit'),
  protein: selector(state, 'protein'),
  bmrCalculationMethod: selector(state, 'bmrCalculationMethod'),
  trainingDay: selector(state, 'trainingDay'),
  trainingFatGrams: selector(state, 'trainingFatGrams'),
  restFatGrams: selector(state, 'restFatGrams'),
  trainingFatPercentage: selector(state, 'trainingFatPercentage'),
  restFatPercentage: selector(state, 'restFatPercentage'),
  restDay: selector(state, 'restDay'),
  fatMethod: selector(state, 'fatMethod'),
  bodyFat: selector(state, 'bodyFat')
}))(KcalTargerContainer);

const mapStateToProps = state => {
  return {
    sex: state.getIn(['userDetails', 'sex']),
    age: age(state),
    latestMeasurements: state.getIn(['userDetails', 'latestMeasurements'])
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createCalorieTarget: calorieTarget =>
      dispatch(createKcalTarget(calorieTarget))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  reduxForm({ form: 'kcal-target' })(KcalTargerContainer)
);
