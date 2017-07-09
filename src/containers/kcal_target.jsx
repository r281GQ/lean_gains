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

import KcalTargetResult from "./../components/kcal_target_result";
import {
  tdeeCalculator,
  calulateProteinTarget
} from "./../services/kcal_service";
// /**
//  * Calculates tdee based on the parameters.
//  * @param  {String} method   [description]
//  * @param  {number} weight   [description]
//  * @param  {number} height   [description]
//  * @param  {number} age      [description]
//  * @param  {String} sex      [description]
//  * @param  {number} activity [description]
//  * @param  {number} bodyFat  [description]
//  * @return {number}          [description]
//  */
// const tdeeCalculator = (method, weight, height, age, sex, activity, bodyFat) =>
//   (method === "harris-benedict"
//     ? harrisBenedict(weight, height, age)
//     : katchMcardle(leanMass(weight, bodyFat))) * Number.parseFloat(activity);
//
// const calulateProteinTarget = (bodyFat, method, protein, weight) =>
//   method === "katch-mcardle"
//     ? leanMass(weight, bodyFat) * Number.parseFloat(protein) * 4
//     : weight * Number.parseFloat(protein) * 4;
//
// const harrisBenedict = (weight, height, age) =>
//   88 + 13.4 * weight + 4.8 * height - 5.7 * age;
//
// const katchMcardle = leanMass => 370 + 21.6 * leanMass;
//
// const leanMass = (weight, bodyFat) =>
//   weight * ((100 - Number.parseFloat(bodyFat)) / 100);
const unlessItsAbovezero = value =>
  _.isNumber(value) && value > 0 ? value : 0;

class KcalTargerContainer extends React.Component {
  componentWillMount() {
    this.props.change("providedBf", this.props.bf);
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
    this.props.change("method", "harris-benedict");
  }

  componentWillReceiveProps(nextProps, s) {
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
      nextProps.method,
      nextProps.weight,
      nextProps.height,
      nextProps.age,
      nextProps.gender,
      nextProps.activity,
      nextProps.providedBf
    );
    console.log(tdee);

    let Nproteincal = calulateProteinTarget(
      nextProps.providedBf,
      nextProps.method,
      nextProps.protein,
      nextProps.weight
    );


    let minRest = -1 * _.floor((tdee - Nproteincal) / tdee * 100);

    if (this.props.restDay < minRest) {
      this.props.change("restDay", minRest);
      this.props.change("restFatGrams", 0);
      this.props.change("restFatPercentage", 0);
    }
    if (this.props.trainingDay < minRest) {
      this.props.change("trainingDay", minRest);
      this.props.change("trainingFatGrams", 0);
      this.props.change("trainingFatPercentage", 0);
    }

    let NrestDayKcal =
      tdee * ((100 + Number.parseFloat(nextProps.restDay)) / 100);
    let Ner = (NrestDayKcal - Nproteincal) / NrestDayKcal * 100;

    let NtraKcal =
      tdee * ((100 + Number.parseFloat(nextProps.trainingDay)) / 100);
    let NFer = (NtraKcal - Nproteincal) / NtraKcal * 100;
    console.log(NFer);

    let Nergram = (NrestDayKcal - Nproteincal) / 9;
    let Ntgram = (NtraKcal - Nproteincal) / 9;

    console.log("before", unlessItsAbovezero(Nergram));
    if (this.props.restFatGrams > unlessItsAbovezero(Nergram)) {
      console.log("in rec", unlessItsAbovezero(Nergram));
      this.props.change("restFatGrams", unlessItsAbovezero(Nergram));
    }
    if (this.props.trainingFatGrams > unlessItsAbovezero(Ntgram))
      this.props.change("trainingFatGrams", unlessItsAbovezero(Ntgram));

    if (this.props.restFatPercentage > unlessItsAbovezero(Ner))
      this.props.change("restFatPercentage", unlessItsAbovezero(Ner));
    if (this.props.trainingFatPercentage > unlessItsAbovezero(NFer))
      this.props.change("trainingFatPercentage", unlessItsAbovezero(NFer));
  }

  render() {
    let {
      weight,
      height,
      gender,
      bf,
      age,
      activity,
      kcalsplit,
      handleSubmit,
      protein,
      providedBf,
      method,
      change
    } = this.props;


    // let tdee = tdeeCalculator(
    //   method,
    //   weight,
    //   height,
    //   age,
    //   gender,
    //   activity,
    //   providedBf
    // );
    // console.log("tdee", tdee);
    let tdee = !_.isNaN(tdeeCalculator(
      method,
      weight,
      height,
      age,
      gender,
      activity,
      providedBf
    )) ? tdee : 10;
    // console.log(tdee);
    // console.log(this.props.trainingDay);
    let g = 100 + Number.parseInt(this.props.trainingDay);
    // console.log(g);
    //calculate tdee with act mult
    //calculate protein based
    // console.log(bmr);
    // console.log(providedBf);
    // console.log(leanmass * (protein ? protein : 2.3));
    let proteincal =
      method === "katch-mcardle"
        ? leanmass * Number.parseFloat(protein) * 4
        : weight * Number.parseFloat(protein) * 4;
    let restDayKcal =
      tdee * ((100 + Number.parseFloat(this.props.restDay)) / 100);
    let er = (restDayKcal - proteincal) / restDayKcal * 100;
    let traniningDayKcal =
      tdee * ((100 + Number.parseFloat(this.props.trainingDay)) / 100);

    let minRest, minTraining;

    minRest = -1 * _.floor((tdee - proteincal) / tdee * 100);
    //ha kcal -proteinTarger < 0
    console.log("minrest", minRest);
    let Ter = (traniningDayKcal - proteincal) / traniningDayKcal * 100;
    let ergram = (restDayKcal - proteincal) / 9;
    console.log("in render", ergram);
    let Tergram = (traniningDayKcal - proteincal) / 9;
    //   Men: Body-fat % = 86.010 x log10(abdomen – neck) – 70.041 x log10(height) + 36.76
    // Women: Body-fat % = 163.205 x log10(waist + hip – neck) – 97.684 x log10(height) – 78.387
    return (
      <div>
        <form
          onSubmit={handleSubmit(formProps => {
            console.log(formProps);
          })}
        >
          <div>
            Calculation method
            <Field
              name="method"
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
            {method === "katch-mcardle"
              ? <div>
                  <Field
                    name="providedBf"
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
                    min={minRest}
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
                    min={minRest}
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
                    max={unlessItsAbovezero(ergram)}
                    step={1}
                  />
                  Rest day fat: {this.props.restFatGrams} grams
                </div>
              : <div>
                  <Field
                    name="restFatPercentage"
                    format={(value, name) => (value === "" ? 0 : value)}
                    component={Slider}
                    type="number"
                    min={0}
                    max={unlessItsAbovezero(er)}
                    step={0.1}
                  />
                  Rest day fat: {this.props.restFatPercentage} %
                </div>}
            {this.props.fatMethod === "grams"
              ? <div>
                  <Field
                    format={(value, name) => (value === "" ? 0 : value)}
                    name="trainingFatGrams"
                    component={Slider}
                    type="number"
                    min={0}
                    max={unlessItsAbovezero(Tergram)}
                    step={1}
                  />
                  Training day fat: {this.props.trainingFatGrams} grams
                </div>
              : <div>
                  <Field
                    format={(value, name) => (value === "" ? 0 : value)}
                    name="trainingFatPercentage"
                    component={Slider}
                    type="number"
                    min={0}
                    max={unlessItsAbovezero(Ter)}
                    step={0.1}
                  />
                  Training day fat: {this.props.trainingFatPercentage} %
                </div>}
          </div>
          <FlatButton type="submit" label="submit" />
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

// <div>
//   {restDayKcal}
//   prot {proteincal} fat{" "}
//   {this.props.fatMethod === "percentage"
//     ? restDayKcal * (this.props.restFatPercentage / 100)
//     : Number.parseInt(this.props.restFatGrams) * 9}
//   carbs:{" "}
//   {this.props.fatMethod === "percentage"
//     ? restDayKcal -
//       proteincal -
//       restDayKcal * (this.props.restFatPercentage / 100)
//     : restDayKcal -
//       proteincal -
//       Number.parseInt(this.props.restFatGrams) * 9}
//   <div>
//     {traniningDayKcal}
//     prot {proteincal} fat{" "}
//     {this.props.fatMethod === "percentage"
//       ? traniningDayKcal * (this.props.trainingFatPercentage / 100)
//       : Number.parseInt(this.props.trainingFatGrams) * 9}
//     carbs:{" "}
//     {this.props.fatMethod === "percentage"
//       ? traniningDayKcal -
//         proteincal -
//         traniningDayKcal * (this.props.trainingFatPercentage / 100)
//       : traniningDayKcal -
//         proteincal -
//         Number.parseInt(this.props.trainingFatGrams) * 9}
//   </div>

const selector = formValueSelector("kcal-target");
const KcalTargerContainer1 = connect(state => ({
  activity: selector(state, "activity"),
  kcalsplit: selector(state, "kcalsplit"),
  protein: selector(state, "protein"),
  method: selector(state, "method"),
  trainingDay: selector(state, "trainingDay"),
  trainingFatGrams: selector(state, "trainingFatGrams"),
  restFatGrams: selector(state, "restFatGrams"),
  trainingFatPercentage: selector(state, "trainingFatPercentage"),
  restFatPercentage: selector(state, "restFatPercentage"),
  restDay: selector(state, "restDay"),
  fatMethod: selector(state, "fatMethod"),
  providedBf: selector(state, "providedBf")
}))(KcalTargerContainer);
const enchanced = reduxForm({ form: "kcal-target" })(KcalTargerContainer1);
export default connect()(enchanced);
