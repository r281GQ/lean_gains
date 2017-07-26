import React, { PureComponent } from 'react';
import { reduxForm, formValueSelector, initialize } from 'redux-form/immutable';
import { connect } from 'react-redux';
import * as _ from 'lodash';
import { Map } from 'immutable';

import { createKcalTarget } from './../store/actionCreators/user_details_action_creators';

import calorieTarget from './../store/selectors/calorie_target';

import CalorieTargetPanel from './../components/kcal_target_result';
import BMRCalculationSelector from './../components/bmr_calculation_selector';
import BodyFatField from './../components/body_fat_field';
import ActivityLevelSelecor from './../components/activity_level_selector';
import CalorieSplitSelector from './../components/calorie_split_selector';
import CustomCalorieField from './../components/custom_calorie_field';
import ProteinField from './../components/protein_field';
import FatMethodSelector from './../components/fat_mathod_selector';
import FatSelector from './../components/fat_selector';
import CenteredSubmitButton from './../components/centered_submit_button';

//TODO debounce on sliders
//TODO checking if every data is avaliable for the calculations, if not error page
class CalorieTargetContainer extends PureComponent {
  _adjustCaloriePercentage = (props, nextProps) => {
    const { calorieSplit } = nextProps;
    const { change } = props;
    if (calorieSplit === 'slowbulk') {
      change('restDay', -10);
      change('trainingDay', 30);
    }
    if (calorieSplit === 'cut') {
      change('restDay', -30);
      change('trainingDay', 10);
    }
    if (calorieSplit === 'recomp') {
      change('restDay', -20);
      change('trainingDay', 20);
    }
  };

  _adjustFatRatio = (
    {
      change,
      restFatGrams,
      restFatPercentage,
      trainingFatGrams,
      trainingFatPercentage
    },
    { calorieTarget }
  ) => {
    const maxRestGram = calorieTarget.getIn('max', 'maxRestGram');
    const maxTrainingGram = calorieTarget.getIn('max', 'maxTrainingGram');
    const maxRestPercentage = calorieTarget.getIn('max', 'maxRestPercentage');
    const maxTrainingPercentage = calorieTarget.getIn(
      'max',
      'maxTrainingPercentage'
    );

    if (restFatGrams > maxRestGram)
      change('restFatGrams', _.floor(maxRestGram));

    if (trainingFatGrams > maxTrainingGram)
      change('trainingFatGrams', _.floor(maxTrainingGram));

    if (restFatPercentage > maxRestPercentage)
      change('restFatPercentage', _.floor(maxRestPercentage));
    if (trainingFatPercentage > maxTrainingPercentage)
      change('trainingFatPercentage', _.floor(maxTrainingPercentage));
  };

  componentDidMount = () => this.props.initializeForm(this.props);

  componentWillReceiveProps = (nextProps, nextState) => {
    this._adjustCaloriePercentage(this.props, nextProps);
    this._adjustFatRatio(this.props, nextProps);
  };

  render = () => {
    const {
      fatMethod,
      calorieSplit,
      handleSubmit,
      bmrCalculationMethod,
      createCalorieTarget,
      calorieTarget
    } = this.props;
    console.log(this.props.f);
    return (
      <div>
        <form onSubmit={handleSubmit(() => createCalorieTarget())}>
          <BMRCalculationSelector />
          <BodyFatField bmrCalculationMethod={bmrCalculationMethod} />
          <ActivityLevelSelecor
            normalize={value =>
              typeof value !== Number ? Number.parseFloat(value) : value}
          />
          <CalorieSplitSelector />
          <CustomCalorieField
            calorieSplit={calorieSplit}
            minRest={calorieTarget.toJS().minCalorie}
            minTraining={calorieTarget.toJS().minCalorie}
            normalize={value =>
              typeof value !== Number ? Number.parseFloat(value) : value}
          />
          <ProteinField />
          <FatMethodSelector />
          <FatSelector
            fatMethod={fatMethod}
            maxRestFatGrams={calorieTarget.getIn(['max', 'maxRestGram'])}
            maxRestFatPercentage={calorieTarget.getIn([
              'max',
              'maxRestPercentage'
            ])}
            maxTrainingFatGrams={calorieTarget.getIn([
              'max',
              'maxTrainingGram'
            ])}
            maxTrainingFatPercentage={calorieTarget.getIn([
              'max',
              'maxTrainingPercentage'
            ])}
            restFatGrams={this.props.restFatGrams}
            restFatPercentage={this.props.restFatPercentage}
            trainingFatGrams={this.props.trainingFatGrams}
            trainingFatPercentage={this.props.trainingFatPercentage}
          />
          <CenteredSubmitButton label="Create calorie target" />
        </form>
        <CalorieTargetPanel
          calorieTarget={calorieTarget.get('finalValues').toJS()}
          label="rest"
        />
        <CalorieTargetPanel
          calorieTarget={calorieTarget.get('finalValues').toJS()}
          label="training"
        />
      </div>
    );
  };
}

const selector = formValueSelector('calorie-target');

CalorieTargetContainer = connect(state => ({
  calorieSplit: selector(state, 'calorieSplit'),
  bmrCalculationMethod: selector(state, 'bmrCalculationMethod'),
  trainingFatGrams: selector(state, 'trainingFatGrams'),
  restFatGrams: selector(state, 'restFatGrams'),
  trainingFatPercentage: selector(state, 'trainingFatPercentage'),
  restFatPercentage: selector(state, 'restFatPercentage'),
  fatMethod: selector(state, 'fatMethod'),
  f: selector(
    state,
    'activity',
    'calorieSplit',
    'protein',
    'bmrCalculationMethod',
    'trainingDay',
    'trainingFatGrams',
    'restFatGrams',
    'trainingFatPercentage',
    'restFatPercentage',
    'restDay',
    'bodyFat',
    'fatMethod'
  )
}))(CalorieTargetContainer);

const mapStateToProps = state => {
  return {
    calorieTarget: calorieTarget(state)
    // f: selector(
    //   state,
    //   'activity',
    //   'calorieSplit',
    //   'protein',
    //   'bmrCalculationMethod',
    //   'trainingDay',
    //   'trainingFatGrams',
    //   'restFatGrams',
    //   'trainingFatPercentage',
    //   'restFatPercentage',
    //   'restDay',
    //   'bodyFat',
    //   'fatMethod'
    // )
  };
};

const mapDispatchToProps = dispatch => {
  return {
    initializeForm: ({ calorieTarget }) =>
      dispatch(
        initialize(
          'calorie-target',
          Map().withMutations(map =>
            map
              .set('bodyFat', calorieTarget.get('bodyFat'))
              .set('restDay', -20)
              .set('trainingDay', 20)
              .set('restFatGrams', 0)
              .set('trainingFatGrams', 0)
              .set('restFatPercentage', 0)
              .set('trainingFatPercentage', 0)
              .set('fatMethod', 'grams')
              .set('activity', 1.2)
              .set('protein', 2)
              .set('calorieSplit', 'recomp')
              .set('bmrCalculationMethod', 'harris-benedict')
          )
        )
      ),
    createCalorieTarget: calorieTarget =>
      dispatch(createKcalTarget(calorieTarget))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  reduxForm({ form: 'calorie-target' })(CalorieTargetContainer)
);
