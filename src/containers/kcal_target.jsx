import React, { PureComponent } from 'react';
import { Field, reduxForm, formValueSelector } from 'redux-form/immutable';
import { connect } from 'react-redux';
import {
  SelectField,
  TextField,
  RadioButtonGroup,
  Slider
} from 'redux-form-material-ui';
import { MenuItem, RadioButton, FlatButton } from 'material-ui';
import * as _ from 'lodash';
import { createKcalTarget } from './../store/actionCreators/user_details_action_creators';
import KcalTargetResult from './../components/kcal_target_result';
import {
  tdeeCalculator,
  calulateProteinTarget,
  calculateBodyFat,
  adjustFatRatio,
  adjustCaloriePercentage,
  initValues,
  minCalorie,maxFatPercentage,maxFatGram,dayCalorie
} from './../services/kcal_service';

import age from './../store/selectors/age';
import { unlessItsAbovezero } from './../services/validators';

//TODO: refactor

// const initValues = ({ change, sex, latestMeasurements }) => {
//   change(
//     'bodyFat',
//     calculateBodyFat(
//       latestMeasurements.get('height'),
//       latestMeasurements.get('weight'),
//       sex,
//       latestMeasurements.get('neck'),
//       latestMeasurements.get('belly')
//     )
//   );
//   change('restDay', -20);
//   change('trainingDay', 20);
//   change('restFatGrams', 0);
//   change('trainingFatGrams', 0);
//   change('restFatPercentage', 0);
//   change('trainingFatPercentage', 0);
//   change('fatMethod', 'grams');
//   change('activity', 1.2);
//   change('protein', 2);
//   change('calorieSplit', 'recomp');
//   change('bmrCalculationMethod', 'harris-benedict');
// };
//
// const adjustCaloriePercentage = (props, nextProps) => {
//   const { calorieSplit } = nextProps;
//   const { change } = props;
//   if (calorieSplit === 'slowbulk') {
//     change('restDay', -10);
//     change('trainingDay', 30);
//   }
//   if (calorieSplit === 'cut') {
//     change('restDay', -30);
//     change('trainingDay', 10);
//   }
//   if (calorieSplit === 'recomp') {
//     change('restDay', -20);
//     change('trainingDay', 20);
//   }
// };
// const minCalorie = (tdee, proteinCalorie) =>
//   -1 * _.floor((tdee - proteinCalorie) / tdee * 100);
//
// const maxFatPercentage = (dayCalorie, proteinCalorie) =>
//   (dayCalorie - proteinCalorie) / dayCalorie * 100;
//
// const maxFatGram = (dayCalorie, proteinCalorie) =>
//   (dayCalorie - proteinCalorie) / 9;
//
// const dayCalorie = (tdee, day) => tdee * ((100 + day) / 100);
//
// const adjustFatRatio = (
//   {
//     change,
//     restDay,
//     trainingDay,
//     restFatGrams,
//     restFatPercentage,
//     trainingFatGrams,
//     trainingFatPercentage
//   },
//   nextProps
// ) => {
//   let tdee = tdeeCalculator(
//     nextProps.bmrCalculationMethod,
//     nextProps.latestMeasurements.get('weight'),
//     nextProps.latestMeasurements.get('height'),
//     nextProps.age,
//     nextProps.sex,
//     nextProps.activity,
//     nextProps.bodyFat
//   );
//
//   let nextProteinCalorie = calulateProteinTarget(
//     nextProps.bodyFat,
//     nextProps.bmrCalculationMethod,
//     nextProps.protein,
//     nextProps.latestMeasurements.get('weight')
//   );
//
//   let nextMinimumCaloriePercentage = minCalorie(tdee, nextProteinCalorie);
//
//   if (restDay < nextMinimumCaloriePercentage) {
//     change('restDay', nextMinimumCaloriePercentage);
//     change('restFatGrams', 0);
//     change('restFatPercentage', 0);
//   }
//
//   if (trainingDay < nextMinimumCaloriePercentage) {
//     change('trainingDay', nextMinimumCaloriePercentage);
//     change('trainingFatGrams', 0);
//     change('trainingFatPercentage', 0);
//   }
//
//   let nextRestDayCalorie = dayCalorie(tdee, nextProps.restDay);
//
//   let nextMaxRestFatPercentage = maxFatPercentage(
//     nextRestDayCalorie,
//     nextProteinCalorie
//   );
//
//   let nextTrainingDayCalorie = dayCalorie(tdee, nextProps.trainingDay);
//
//   let nextMaxTrainingFatPercentage = maxFatPercentage(
//     nextTrainingDayCalorie,
//     nextProteinCalorie
//   );
//
//   let nextMaxRestFatGram = maxFatGram(nextRestDayCalorie, nextProteinCalorie);
//   let nextMaxTrainingFatGram = maxFatGram(
//     nextTrainingDayCalorie,
//     nextProteinCalorie
//   );
//
//   if (restFatGrams > unlessItsAbovezero(nextMaxRestFatGram)) {
//     change('restFatGrams', _.floor(unlessItsAbovezero(nextMaxRestFatGram)));
//   }
//   if (trainingFatGrams > unlessItsAbovezero(nextMaxTrainingFatGram))
//     change(
//       'trainingFatGrams',
//       _.floor(unlessItsAbovezero(nextMaxTrainingFatGram))
//     );
//
//   if (restFatPercentage > unlessItsAbovezero(nextMaxRestFatPercentage))
//     change(
//       'restFatPercentage',
//       _.floor(unlessItsAbovezero(nextMaxRestFatPercentage))
//     );
//   if (trainingFatPercentage > unlessItsAbovezero(nextMaxTrainingFatPercentage))
//     change(
//       'trainingFatPercentage',
//       _.floor(unlessItsAbovezero(nextMaxTrainingFatPercentage))
//     );
// };

class KcalTargerContainer extends PureComponent {
  componentDidMount = () => initValues(this.props);

  componentWillReceiveProps = (nextProps, nextState) => {
    const { submitting } = this.props;
    if (submitting) return;
    adjustCaloriePercentage(this.props, nextProps);
    adjustFatRatio(this.props, nextProps);
  };

  render = () => {
    let {
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
      trainingDay
    } = this.props;

    const tdee = tdeeCalculator(
      bmrCalculationMethod,
      latestMeasurements.get('weight'),
      latestMeasurements.get('height'),
      age,
      sex,
      activity,
      bodyFat
    );

    const proteinCalorie = calulateProteinTarget(
      bodyFat,
      bmrCalculationMethod,
      protein,
      latestMeasurements.get('weight')
    );

    return (
      <div>
        <form
          onSubmit={handleSubmit(({}) => {
            let rf =
              fatMethod === 'percentage'
                ? _.ceil(
                    dayCalorie(tdee, restDay) *
                      (this.props.restFatPercentage / 100) /
                      9
                  )
                : _.ceil(this.props.restFatGrams * 9) / 9;

            let tf =
              fatMethod === 'percentage'
                ? _.ceil(
                    dayCalorie(tdee, trainingDay) *
                      (this.props.trainingFatPercentage / 100) /
                      9
                  )
                : _.ceil(this.props.trainingFatGrams * 9) / 9;

            const kCalTarget = {
              rest: {
                calorie: _.ceil(dayCalorie(tdee, restDay)),
                protein: _.ceil(proteinCalorie / 4),
                carbohydrate: _.ceil(
                  (dayCalorie(tdee, restDay) - rf * 9 - proteinCalorie) / 4
                ),
                fat: rf
              },
              training: {
                calorie: _.ceil(dayCalorie(tdee, trainingDay)),
                protein: _.ceil(proteinCalorie / 4),
                carbohydrate: _.ceil(
                  (dayCalorie(tdee, trainingDay) - tf * 9 - proteinCalorie) / 4
                ),
                fat: tf
              }
            };

            this.props.createKcalTarget(kCalTarget);
          })}
        >
          <div>
            <Field
              name="bmrCalculationMethod"
              component={SelectField}
              fullWidth={true}
              floatingLabelText="Select your bmr calculation method"
            >
              <MenuItem
                value="harris-benedict"
                primaryText="Based on weight (Harris-Benedict)"
              />
              <MenuItem
                value="katch-mcardle"
                primaryText="Based on lean body mass (Katch-Mcardle)"
              />
            </Field>
            {bmrCalculationMethod === 'katch-mcardle'
              ? <div>
                  <Field
                    name="bodyFat"
                    floatingLabelText="You can manually enter your bodyfat %"
                    component={TextField}
                    type="number"
                    min={0}
                    fullWidth={true}
                    max={50}
                    step={0.1}
                  />{' '}
                </div>
              : null}
            <Field
              name="activity"
              component={SelectField}
              fullWidth={true}
              floatingLabelText="Select you activity level"
            >
              <MenuItem value={1.2} primaryText="Sedentary" />
              <MenuItem value={1.375} primaryText="Lightly active" />
              <MenuItem value={1.55} primaryText="Moderately active" />
              <MenuItem value={1.725} primaryText="Very active" />
              <MenuItem value={1.9} primaryText="Extremely active" />
            </Field>
          </div>

          <div>
            <Field
              name="calorieSplit"
              component={SelectField}
              fullWidth={true}
              floatingLabelText="Select your macro target"
            >
              <MenuItem
                value="recomp"
                primaryText="Recomposition (-20%/+20%)"
              />
              <MenuItem value="cut" primaryText="Cut (-30%/10%)" />
              <MenuItem value="slowbulk" primaryText="Slow bulk (-10%/+30%)" />
              <MenuItem value="custom" primaryText="Custom values" />
            </Field>
          </div>
          {calorieSplit === 'custom'
            ? <div>
                {' '}<div>
                  {' '}<Field
                    fullWidth={true}
                    name="restDay"
                    floatingLabelText="Rest day %"
                    type="number"
                    min={minCalorie(tdee, proteinCalorie)}
                    max={200}
                    normalize={value =>
                      typeof value !== Number
                        ? Number.parseFloat(value)
                        : value}
                    step={0.5}
                    component={TextField}
                  />
                </div>{' '}
                <div>
                  {' '}<Field
                    fullWidth={true}
                    name="trainingDay"
                    floatingLabelText="Trainging day %"
                    component={TextField}
                    type="number"
                    step={0.5}
                    normalize={value =>
                      typeof value !== Number
                        ? Number.parseFloat(value)
                        : value}
                    min={minCalorie(tdee, proteinCalorie)}
                    max={200}
                  />{' '}
                </div>
              </div>
            : null}
          <div>
            <Field
              name="protein"
              fullWidth={true}
              floatingLabelText="Enter your protein intake g/lbm (kg)"
              component={TextField}
              type="number"
              min={0}
              max={5}
              step={0.1}
            />
            <Field
              name="fatMethod"
              component={SelectField}
              fullWidth={true}
              floatingLabelText="Select how would you like to give your fat target"
            >
              <MenuItem value="grams" primaryText="In grams" />
              <MenuItem value="percentage" primaryText="In % of kcals" />
            </Field>
            {this.props.fatMethod === 'grams'
              ? <div>
                  <Field
                    name="restFatGrams"
                    component={Slider}
                    type="number"
                    format={(value, name) => (value === '' ? 0 : value)}
                    min={0}
                    max={_.floor(
                      unlessItsAbovezero(
                        maxFatGram(dayCalorie(tdee, restDay), proteinCalorie)
                      ),
                      1
                    )}
                    step={1}
                  />
                  <div style={{ textAlign: 'center' }}>
                    <FlatButton
                      disabled={true}
                      label={`Rest day fat: ${this.props.restFatGrams} grams`}
                    />
                  </div>
                </div>
              : <div>
                  <Field
                    name="restFatPercentage"
                    format={(value, name) => (value === '' ? 0 : value)}
                    component={Slider}
                    type="number"
                    min={0}
                    max={_.floor(
                      unlessItsAbovezero(
                        maxFatPercentage(
                          dayCalorie(tdee, restDay),
                          proteinCalorie
                        )
                      ),
                      1
                    )}
                    step={0.1}
                  />
                  <div style={{ textAlign: 'center' }}>
                    <FlatButton
                      disabled={true}
                      label={`Rest day fat: ${this.props.restFatPercentage} %`}
                    />
                  </div>
                </div>}
            {this.props.fatMethod === 'grams'
              ? <div>
                  <Field
                    format={(value, name) => (value === '' ? 0 : value)}
                    name="trainingFatGrams"
                    component={Slider}
                    type="number"
                    min={0}
                    max={_.floor(
                      unlessItsAbovezero(
                        maxFatGram(
                          dayCalorie(tdee, trainingDay),
                          proteinCalorie
                        )
                      ),
                      1
                    )}
                    step={1}
                  />
                  <div style={{ textAlign: 'center' }}>
                    <FlatButton
                      disabled={true}
                      label={`Training day fat: ${this.props
                        .trainingFatGrams} grams`}
                    />
                  </div>
                </div>
              : <div>
                  <Field
                    format={(value, name) => (value === '' ? 0 : value)}
                    name="trainingFatPercentage"
                    component={Slider}
                    type="number"
                    min={0}
                    max={_.floor(
                      unlessItsAbovezero(
                        maxFatPercentage(
                          dayCalorie(tdee, trainingDay),
                          proteinCalorie
                        )
                      ),
                      1
                    )}
                    step={0.1}
                  />
                  <div style={{ textAlign: 'center' }}>
                    <FlatButton
                      disabled={true}
                      label={`Training day fat: ${this.props
                        .trainingFatPercentage} %`}
                    />
                  </div>
                </div>}
          </div>
          <div style={{ textAlign: 'center' }}>
            <FlatButton type="submit" label="Create calorie target" />
          </div>
        </form>
        <KcalTargetResult
          percentage={this.props.restFatPercentage}
          proteinTarget={proteinCalorie}
          fatTarget={this.props.restFatGrams}
          method={this.props.fatMethod}
          kCalTarget={_.round(dayCalorie(tdee, restDay))}
          label="rest"
        />

        <KcalTargetResult
          percentage={this.props.trainingFatPercentage}
          proteinTarget={proteinCalorie}
          fatTarget={this.props.trainingFatGrams}
          method={this.props.fatMethod}
          kCalTarget={_.round(dayCalorie(tdee, trainingDay))}
          label="training"
        />
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
    createKcalTarget: kCalTarget => dispatch(createKcalTarget(kCalTarget))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  reduxForm({ form: 'kcal-target' })(KcalTargerContainer)
);
