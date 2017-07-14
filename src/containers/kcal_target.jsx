import React from "react";
import { Field, reduxForm, formValueSelector } from "redux-form/immutable";
import { connect } from "react-redux";
import {
  SelectField,
  TextField,
  RadioButtonGroup,
  Slider
} from "redux-form-material-ui";
import { MenuItem, RadioButton, FlatButton } from "material-ui";
import * as _ from "lodash";
import { push } from "react-router-redux";
import { createKcalTarget } from "./../store/actionCreators/user_details_action_creators";
import KcalTargetResult from "./../components/kcal_target_result";
import {
  tdeeCalculator,
  calulateProteinTarget,
  calculateBodyFat
} from "./../services/kcal_service";


//TODO need to be removed to validators seeice
const unlessItsAbovezero = value =>
  _.isNumber(value) && value > 0 ? value : 0.1;


//TODO: all logic shoudl be implemented here, make component out of the dom tree
//TODO: refactor
class KcalTargerContainer extends React.Component {
  componentDidMount() {
    const { height, weight, neck, belly } = this.props.latestMeasurements;
    console.log(height, weight, neck, belly);
    this.props.change(
      "bodyFat",
      !_.isNaN(calculateBodyFat(height, weight, "male", neck, belly))
        ? calculateBodyFat(height, weight, "male", neck, belly)
        : 0
    );
    this.props.change("restDay", -20);
    this.props.change("trainingDay", 20);
    this.props.change("restFatGrams", 0);
    this.props.change("trainingFatGrams", 0);
    this.props.change("restFatPercentage", 0);
    this.props.change("trainingFatPercentage", 0);
    this.props.change("fatMethod", "grams");
    this.props.change("activity", 1.2);
    this.props.change("protein", 2);
    this.props.change("kcalsplit", "recomp");
    this.props.change("bmrCalculationMethod", "harris-benedict");
  }

  componentWillReceiveProps(nextProps, s) {
    if (this.props.submitting) return;
    if (nextProps.kcalsplit === "slowbulk") {
      this.props.change("restDay", -10);
      this.props.change("trainingDay", 30);
    }
    if (nextProps.kcalsplit === "cut") {
      this.props.change("restDay", -30);
      this.props.change("trainingDay", 10);
    }
    if (nextProps.kcalsplit === "recomp") {
      this.props.change("restDay", -20);
      this.props.change("trainingDay", 20);
    }

    let tdee = tdeeCalculator(
      nextProps.bmrCalculationMethod,
        nextProps.latestMeasurements.weight,
        nextProps.latestMeasurements.height,
        nextProps.age,
        nextProps.sex,
        nextProps.activity,
        nextProps.bodyFat
    );


    console.log('params',   nextProps.bmrCalculationMethod,
      nextProps.latestMeasurements.weight,
      nextProps.latestMeasurements.height,
      nextProps.age,
      nextProps.sex,
      nextProps.activity,
      nextProps.bodyFat);


    console.log(tdee);

    let Nproteincal = calulateProteinTarget(
      nextProps.bodyFat,
      nextProps.bmrCalculationMethod,
      nextProps.protein,
      nextProps.latestMeasurements.weight
    );

    let minCalorie = -1 * _.ceil((tdee - Nproteincal) / tdee * 100);

    if (this.props.restDay < minCalorie) {
      this.props.change("restDay", minCalorie);
      this.props.change("restFatGrams", 0);
      this.props.change("restFatPercentage", 0);
    }
    if (this.props.trainingDay < minCalorie) {
      c;
      this.props.change("trainingDay", minCalorie);
      this.props.change("trainingFatGrams", 0);
      this.props.change("trainingFatPercentage", 0);
    }

    let NrestDayKcal =
      tdee * ((100 + Number.parseFloat(nextProps.restDay)) / 100);
    let Ner = (NrestDayKcal - Nproteincal) / NrestDayKcal * 100;
    console.log('tdee form updatte', tdee);
    let NtraKcal =
      tdee * ((100 + Number.parseFloat(nextProps.trainingDay)) / 100);
    let NFer = (NtraKcal - Nproteincal) / NtraKcal * 100;
    console.log('ntrackal', NtraKcal);
    console.log('nproteing', Nproteincal);
    console.log('nfeer', NFer);

    let Nergram = (NrestDayKcal - Nproteincal) / 9;
    let Ntgram = (NtraKcal - Nproteincal) / 9;

    console.log("before", unlessItsAbovezero(Nergram));
    if (this.props.restFatGrams > unlessItsAbovezero(Nergram)) {
      console.log("in rec", unlessItsAbovezero(Nergram));
      this.props.change("restFatGrams", _.floor(unlessItsAbovezero(Nergram)));
    }
    if (this.props.trainingFatGrams > unlessItsAbovezero(Ntgram))
      this.props.change(
        "trainingFatGrams",
        _.floor(unlessItsAbovezero(Ntgram))
      );

    if (this.props.restFatPercentage > unlessItsAbovezero(Ner))
      this.props.change("restFatPercentage", _.floor(unlessItsAbovezero(Ner)));
    if (this.props.trainingFatPercentage > unlessItsAbovezero(NFer))
      this.props.change(
        "trainingFatPercentage",
        _.floor(unlessItsAbovezero(NFer))
      );
  }

  render() {
    let {
      sex,
latestMeasurements: {
  weight,
  height
},
      age,
      activity,
      kcalsplit,
      handleSubmit,
      protein,
      bodyFat,
      bmrCalculationMethod,
      change
    } = this.props;

    console.log('LOG', bmrCalculationMethod, weight, height, age, sex, activity, bodyFat);

    let tdee = tdeeCalculator(
      bmrCalculationMethod,
      weight,
      height,
      age,
      sex,
      activity,
      bodyFat
    );
    console.log('tdee:', tdee);
    // (bodyFat, method, protein, weight) =>
    // let proteincal =
    //   method === "katch-mcardle"
    //     ? leanmass * Number.parseFloat(protein) * 4
    //     : weight * Number.parseFloat(protein) * 4;
    let proteincal = !_.isNaN(
      calulateProteinTarget(bodyFat, bmrCalculationMethod, protein, weight)
    )
      ? calulateProteinTarget(bodyFat, bmrCalculationMethod, protein, weight)
      : 11;
    // method === "katch-mcardle"
    //   ? leanmass * Number.parseFloat(protein) * 4
    //   : weight * Number.parseFloat(protein) * 4;
    let restDayKcal =
      tdee * ((100 + Number.parseFloat(this.props.restDay)) / 100);
    let er = (restDayKcal - proteincal) / restDayKcal * 100;
    let traniningDayKcal =
      tdee * ((100 + Number.parseFloat(this.props.trainingDay)) / 100);

    let minCalorie;
    console.log("tdee", tdee);
    console.log("restDayKcal", restDayKcal);
    console.log("protecincal", proteincal);
    minCalorie = -1 * _.floor((tdee - proteincal) / tdee * 100);
    //ha kcal -proteinTarger < 0
    console.log("minrest", minCalorie);
    let Ter = (traniningDayKcal - proteincal) / traniningDayKcal * 100;
    let ergram = (restDayKcal - proteincal) / 9;
    console.log("in render", ergram);
    console.log("flor", _.floor(unlessItsAbovezero(ergram)));
    let Tergram = (traniningDayKcal - proteincal) / 9;
    return (
      <div>
        <form
          onSubmit={handleSubmit(({}) => {
            let rf =
              this.props.fatMethod === "percentage"
                ? _.ceil(restDayKcal * (this.props.restFatPercentage / 100) / 9)
                : _.ceil(this.props.restFatGrams * 9) / 9;

            let tf =
              this.props.fatMethod === "percentage"
                ? _.ceil(
                    traniningDayKcal *
                      (this.props.trainingFatPercentage / 100) /
                      9
                  )
                : _.ceil(this.props.trainingFatGrams * 9) / 9;

            const kCalTarget = {
              rest: {
                kcal: _.ceil(restDayKcal),
                protein: _.ceil(proteincal / 4),
                carbohydrate: _.ceil((restDayKcal - rf * 9 - proteincal) / 4),
                fat: rf
              },
              training: {
                kcal: _.ceil(traniningDayKcal),
                protein: _.ceil(proteincal / 4),
                carbohydrate: _.ceil(
                  (traniningDayKcal - tf * 9 - proteincal) / 4
                ),
                fat: tf
              }
            };

            this.props.createKcalTarget(kCalTarget);
            console.log(kCalTarget);
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
            {bmrCalculationMethod === "katch-mcardle"
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
                  />{" "}
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
              name="kcalsplit"
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
          {kcalsplit === "custom"
            ? <div>
                {" "}<div>
                  {" "}<Field
                    fullWidth={true}
                    name="restDay"
                    floatingLabelText="Rest day %"
                    type="number"
                    min={minCalorie}
                    max={200}
                    step={0.5}
                    component={TextField}
                  />
                </div>{" "}
                <div>
                  {" "}<Field
                    fullWidth={true}
                    name="trainingDay"
                    floatingLabelText="Trainging day %"
                    component={TextField}
                    type="number"
                    step={0.5}
                    min={minCalorie}
                    max={200}
                  />{" "}
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
            {this.props.fatMethod === "grams"
              ? <div>
                  <Field
                    name="restFatGrams"
                    component={Slider}
                    type="number"
                    format={(value, name) => (value === "" ? 0 : value)}
                    min={0}
                    max={_.floor(unlessItsAbovezero(ergram), 1)}
                    step={1}
                  />
                  <div style={{ textAlign: "center" }}>
                    <FlatButton
                      disabled={true}
                      label={`Rest day fat: ${this.props.restFatGrams} grams`}
                    />
                  </div>
                </div>
              : <div>
                  <Field
                    name="restFatPercentage"
                    format={(value, name) => (value === "" ? 0 : value)}
                    component={Slider}
                    type="number"
                    min={0}
                    max={_.floor(unlessItsAbovezero(er), 1)}
                    step={0.1}
                  />
                  <div style={{ textAlign: "center" }}>
                    <FlatButton
                      disabled={true}
                      label={`Rest day fat: ${this.props.restFatPercentage} %`}
                    />
                  </div>
                </div>}
            {this.props.fatMethod === "grams"
              ? <div>
                  <Field
                    format={(value, name) => (value === "" ? 0 : value)}
                    name="trainingFatGrams"
                    component={Slider}
                    type="number"
                    min={0}
                    max={_.floor(unlessItsAbovezero(Tergram), 1)}
                    step={1}
                  />
                  <div style={{ textAlign: "center" }}>
                    <FlatButton
                      disabled={true}
                      label={`Training day fat: ${this.props.trainingFatGrams} grams`}
                    />
                  </div>
                </div>
              : <div>
                  <Field
                    format={(value, name) => (value === "" ? 0 : value)}
                    name="trainingFatPercentage"
                    component={Slider}
                    type="number"
                    min={0}
                    max={_.floor(unlessItsAbovezero(Ter), 1)}
                    step={0.1}
                  /><div style={{ textAlign: "center" }}>
                    <FlatButton
                      disabled={true}
                      label={`Training day fat: ${this.props.trainingFatPercentage} %`}
                    />
                  </div>
                </div>}
          </div>
          <div style={{ textAlign: "center" }}>
            <FlatButton type="submit" label="Create calorie target" />
          </div>
        </form>
        <KcalTargetResult
          percentage={this.props.restFatPercentage}
          proteinTarget={proteincal}
          fatTarget={Number.parseInt(this.props.restFatGrams)}
          method={this.props.fatMethod}
          kCalTarget={_.round(restDayKcal)}
          label="rest"
        />

        <KcalTargetResult
          percentage={this.props.trainingFatPercentage}
          proteinTarget={proteincal}
          fatTarget={Number.parseInt(this.props.trainingFatGrams)}
          method={this.props.fatMethod}
          kCalTarget={_.round(traniningDayKcal)}
          label="training"
        />
      </div>
    );
  }
}

//TODO: needs to connect to redux by its own

const selector = formValueSelector("kcal-target");
const KcalTargerContainer1 = connect(state => ({
  activity: selector(state, "activity"),
  kcalsplit: selector(state, "kcalsplit"),
  protein: selector(state, "protein"),
  bmrCalculationMethod: selector(state, "bmrCalculationMethod"),
  trainingDay: selector(state, "trainingDay"),
  trainingFatGrams: selector(state, "trainingFatGrams"),
  restFatGrams: selector(state, "restFatGrams"),
  trainingFatPercentage: selector(state, "trainingFatPercentage"),
  restFatPercentage: selector(state, "restFatPercentage"),
  restDay: selector(state, "restDay"),
  fatMethod: selector(state, "fatMethod"),
  bodyFat: selector(state, "bodyFat")
}))(KcalTargerContainer);
const enchanced = reduxForm({ form: "kcal-target" })(KcalTargerContainer1);
const mapDispatchToProps = dispatch => {
  return {
    createKcalTarget: kCalTarget => dispatch(createKcalTarget(kCalTarget)),
    go: route => dispatch(push(route))
  };
};
export default connect(null, mapDispatchToProps)(enchanced);
