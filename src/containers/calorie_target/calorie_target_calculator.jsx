import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { reduxForm, formValueSelector, initialize } from 'redux-form/immutable';
import { connect } from 'react-redux';
import * as _ from 'lodash';
import { Map } from 'immutable';

import { createKcalTarget } from './../../store/actionCreators/user_details_action_creators';

import calorieTarget from './../../store/selectors/calorie_target';

import BMRCalculationSelector from './../../components/calorie_target/bmr_calculation_selector';
import BodyFatField from './../../components/calorie_target/body_fat_field';
import ActivityLevelSelecor from './../../components/calorie_target/activity_level_selector';
import CalorieSplitSelector from './../../components/calorie_target/calorie_split_selector';
import CustomCalorieField from './../../components/calorie_target/custom_calorie_field';
import ProteinField from './../../components/calorie_target/protein_field';
import FatMethodSelector from './../../components/calorie_target/fat_mathod_selector';
import FatSelector from './../../components/calorie_target/fat_selector';
import CenteredSubmitButton from './../../components/centered_submit_button';

class CalorieTargetCalculator extends Component {
  _adjustCaloriePercentage(props, nextProps) {
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
  }

  _adjustFatRatio(
    {
      change,
      restFatGrams,
      restFatPercentage,
      trainingFatGrams,
      trainingFatPercentage
    },
    { calorieTarget }
  ) {
    const maxRestGram = calorieTarget.getIn(['max', 'restGram']);
    const maxTrainingGram = calorieTarget.getIn(['max', 'trainingGram']);
    const maxRestPercentage = calorieTarget.getIn(['max', 'restPercentage']);
    const maxTrainingPercentage = calorieTarget.getIn([
      'max',
      'trainingPercentage'
    ]);

    if (restFatGrams > maxRestGram)
      change('restFatGrams', _.floor(maxRestGram));

    if (trainingFatGrams > maxTrainingGram)
      change('trainingFatGrams', _.floor(maxTrainingGram));

    if (restFatPercentage > maxRestPercentage)
      change('restFatPercentage', _.floor(maxRestPercentage));
    if (trainingFatPercentage > maxTrainingPercentage)
      change('trainingFatPercentage', _.floor(maxTrainingPercentage));
  }

  shouldComponentUpdate({
    calorieTarget,
    calorieSplit,
    restDay,
    trainingDay,
    activity,
    fatMethod,
    bmrCalculationMethod
  }) {
    const {
      restFatGrams,
      restFatPercentage,
      trainingFatGrams,
      trainingFatPercentage
    } = this.props;

    const maxRestGram = calorieTarget.getIn(['max', 'restGram']);
    const maxTrainingGram = calorieTarget.getIn(['max', 'trainingGram']);
    const maxRestPercentage = calorieTarget.getIn(['max', 'restPercentage']);
    const maxTrainingPercentage = calorieTarget.getIn([
      'max',
      'trainingPercentage'
    ]);

    const update =
      bmrCalculationMethod !== this.props.bmrCalculationMethod ||
      fatMethod !== this.props.fatMethod ||
      activity !== this.props.activity ||
      calorieSplit !== this.props.calorieSplit ||
      restDay !== this.props.restDay ||
      trainingDay !== this.props.trainingDay ||
      typeof restFatGrams === 'undefined' ||
      typeof this.props.restDay === 'undefined' ||
      restFatGrams > maxRestGram ||
      trainingFatGrams > maxTrainingGram ||
      restFatPercentage > maxRestPercentage ||
      trainingFatPercentage > maxTrainingPercentage;
    return update;
  }

  componentDidMount() {
    this.props.initializeForm(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this._adjustCaloriePercentage(this.props, nextProps);
    this._adjustFatRatio(this.props, nextProps);
  }

  render() {
    const {
      fatMethod,
      calorieSplit,
      handleSubmit,
      bmrCalculationMethod,
      createCalorieTarget,
      calorieTarget
    } = this.props;
    return (
      <div>
        <form
          onSubmit={handleSubmit(() =>
            createCalorieTarget(calorieTarget.get('finalValues').toJS())
          )}
        >
          <BMRCalculationSelector />
          <BodyFatField bmrCalculationMethod={bmrCalculationMethod} />
          <ActivityLevelSelecor
            normalize={value =>
              typeof value !== 'number' ? Number.parseFloat(value) : value}
          />
          <CalorieSplitSelector />
          <CustomCalorieField
            calorieSplit={calorieSplit}
            minRest={calorieTarget.toJS().minCalorie}
            minTraining={calorieTarget.toJS().minCalorie}
            normalize={value =>
              typeof value !== 'number' ? Number.parseFloat(value) : value}
          />
          <ProteinField />
          <FatMethodSelector />
          <FatSelector
            fatMethod={fatMethod}
            maxRestFatGrams={calorieTarget.getIn(['max', 'restGram'])}
            maxRestFatPercentage={calorieTarget.getIn([
              'max',
              'restPercentage'
            ])}
            maxTrainingFatGrams={calorieTarget.getIn(['max', 'trainingGram'])}
            maxTrainingFatPercentage={calorieTarget.getIn([
              'max',
              'trainingPercentage'
            ])}
          />
          <CenteredSubmitButton label="Create calorie target" />
        </form>
      </div>
    );
  }
}

CalorieTargetCalculator.propTypes = {
  activity: PropTypes.number,
  restDay: PropTypes.number,
  trainingDay: PropTypes.number,
  restFatGrams: PropTypes.number,
  restFatPercentage: PropTypes.number,
  trainingFatGrams: PropTypes.number,
  trainingFatPercentage: PropTypes.number,
  initializeForm: PropTypes.func,
  fatMethod: PropTypes.string,
  calorieSplit: PropTypes.string,
  bmrCalculationMethod: PropTypes.string,
  createCalorieTarget: PropTypes.func,
  calorieTarget: ImmutablePropTypes.mapContains({
    bodyFat: PropTypes.number,
    finalValues: ImmutablePropTypes.mapContains({
      rest: ImmutablePropTypes.mapContains({
        calorie: PropTypes.number,
        carbohydrate: PropTypes.number,
        fat: PropTypes.number,
        protein: PropTypes.number
      }),
      training: ImmutablePropTypes.mapContains({
        calorie: PropTypes.number,
        carbohydrate: PropTypes.number,
        fat: PropTypes.number,
        protein: PropTypes.number
      })
    }),
    minCalorie: PropTypes.number,
    max: ImmutablePropTypes.mapContains({
      restGram: PropTypes.number,
      restPercentage: PropTypes.number,
      trainingGram: PropTypes.number,
      trainingPercentage: PropTypes.number
    })
  })
};

// CalorieTargetCalculator.propTypes = {
//   activity: PropTypes.string,
//   restDay: PropTypes.number,
//   trainingDay: PropTypes.number,
//   restFatGrams: PropTypes.number,
//   restFatPercentage: PropTypes.number,
//   trainingFatGrams: PropTypes.number,
//   trainingFatPercentage: PropTypes.number,
//   initializeForm: PropTypes.func,
//   fatMethod: PropTypes.string,
//   calorieSplit: PropTypes.string,
//   bmrCalculationMethod: PropTypes.string,
//   createCalorieTarget: PropTypes.func,
//   calorieTarget: PropTypes.shape({
//     bodyFat: PropTypes.number,
//     finalValues: PropTypes.shape({
//       rest: PropTypes.shape({
//         calorie: PropTypes.number,
//         carbohydrate: PropTypes.number,
//         fat: PropTypes.number,
//         protein: PropTypes.number,
//       }),
//       training: PropTypes.shape({
//         calorie: PropTypes.number,
//         carbohydrate: PropTypes.number,
//         fat: PropTypes.number,
//         protein: PropTypes.number,
//       }),
//     }),
//     minCalorie: PropTypes.number,
//     max: PropTypes.shape({
//       restGram: PropTypes.number,
//       restPercentage: PropTypes.number,
//       trainingGram: PropTypes.number,
//       trainingPercentage: PropTypes.number,
//     }),
//   }),
// };

const selector = formValueSelector('calorie-target');

/*eslint no-class-assign: "off"*/
CalorieTargetCalculator = connect(state => ({
  activity: selector(state, 'activity'),
  fatMethod: selector(state, 'fatMethod'),
  calorieSplit: selector(state, 'calorieSplit'),
  bmrCalculationMethod: selector(state, 'bmrCalculationMethod'),
  trainingFatGrams: selector(state, 'trainingFatGrams'),
  restFatGrams: selector(state, 'restFatGrams'),
  trainingFatPercentage: selector(state, 'trainingFatPercentage'),
  restFatPercentage: selector(state, 'restFatPercentage'),
  restDay: selector(state, 'restDay'),
  trainingDay: selector(state, 'trainingDay')
}))(CalorieTargetCalculator);

const mapStateToProps = state => {
  return {
    calorieTarget: calorieTarget(state)
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
  reduxForm({ form: 'calorie-target' })(CalorieTargetCalculator)
);
