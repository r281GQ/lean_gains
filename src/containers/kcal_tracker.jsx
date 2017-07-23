import React, { Component } from 'react';
import {
  reduxForm,
  Field,
  FieldArray,
  formValueSelector,
  arrayPush, submit
} from 'redux-form/immutable';
import {
  AutoComplete,
  TextField,
  SelectField,
  MenuItem,
  FlatButton,
  Avatar,
  List,
  ListItem,
  Card,
  CardHeader,
  CardMedia,
  CardTitle,
  CardText
} from 'material-ui';
import { connect } from 'react-redux';
import { TextField as Tx } from 'redux-form-material-ui';
// import { searchForNutrition } from './../store/actionCreators/kcal_action_creators';
import * as _ from 'lodash';
import temp from './temp';
import {INIT_API, CLOSE_API} from './../store/actions/app_actions';

// import { WRITE_SEARCH_RESULTS } from './../actions/kcal_action';

import axios from 'axios';

const NUTRITIONIX_SEARCH_API_ENDPOINT = `https://trackapi.nutritionix.com/v2/natural/nutrients`;
const REF_KEY = 0;
const APP_KEY = 'a9ff02753543e452faaaa3bb2936e49e';
const APP_ID = '8c0712d2';

const prepareAPI = query =>
  axios({
    url: NUTRITIONIX_SEARCH_API_ENDPOINT,
    method: 'POST',
    data: {
      query
    },
    headers: {
      'x-app-id': APP_ID,
      'x-app-key': APP_KEY,
      'x-remote-user-id': REF_KEY
    }
  });

const searchForNutrition = query =>
  new Promise(resolve => {
    prepareAPI(query).then(response => {
      resolve(
        _.map(response.data.foods, food =>
          _.extend(
            _.pick(food, [
              'serving_weight_grams',
              'nf_protein',
              'food_name',
              'nf_total_carbohydrate',
              'serving_unit',
              'nf_total_fat',
              'alt_measures',
              'photo',
              'tags',
              'nf_calories'
            ]),
            { quantity: 1 }
          )
        )
      );
    });
  });
// const searchForNutrition = query =>
//   new Promise(resolve => {
//     resolve([
//       {
//         serving_weight_grams: 182,
//         nf_protein: 0.47,
//         food_name: 'apple',
//         nf_total_carbohydrate: 25.13,
//         serving_unit: 'medium',
//         nf_total_fat: 0.31,
//         alt_measures: {
//           0: {
//             serving_weight: 242,
//             measure: 'NLEA serving',
//             seq: 7,
//             qty: 1
//           },
//           2: {
//             serving_weight: 182,
//             measure: 'medium',
//             seq: 7,
//             qty: 1
//           },
//           1: {
//             serving_weight: 149,
//             measure: 'small (2-3/4',
//             seq: 5,
//             qty: 1
//           }
//         },
//         photo: {
//           thumb: 'https://d2xdmhkmkbyw75.cloudfront.net/384_thumb.jpg',
//           highres: 'https://d2xdmhkmkbyw75.cloudfront.net/384_highres.jpg'
//         },
//         tags: {
//           item: 'apple',
//           measure: null,
//           quantity: '1.0',
//           tag_id: 384
//         },
//         nf_calories: 94.64 ,
//         quantity: 1
//       }
//     ]);
//   });

// .catch(error => console.log(error));

let interv;

//TODO fav like kalbaz, illetve recentsearches, illetve recpetek
//TODO autoSave functionanilty refactore to a service
class KcalLog extends React.PureComponent {
  componentDidMount(){
    interv = setInterval( ()=>this.props.h(), 2000);
    console.log(interv);
  }

  componentWillUnmount(){
    clearInterval(interv);
  }

  render() {
    const total =_.reduce(
      this.props.cals ? this.props.cals : [],
      (sum, item) => {
        const { serving_weight } = _.find(
          item.alt_measures,
          alt => alt.measure === item.serving_unit
        );

        sum.protein =
          +item.nf_protein *
          (serving_weight / item.serving_weight_grams) *
          item.quantity;

        sum.carb =
          +item.nf_total_carbohydrate *
          (serving_weight / item.serving_weight_grams) *
          item.quantity;

        sum.fat =
          +item.nf_total_fat *
          (serving_weight / item.serving_weight_grams) *
          item.quantity;

        sum.calories =
          +item.nf_calories *
          (serving_weight / item.serving_weight_grams) *
          item.quantity;

        return sum;
      },
      { calories: 0, protein: 0, carb: 0, fat: 0 }
    )
    return (
      <div>
        <FlatButton label='g' onTouchTap={()=>this.props.h()} />
        Calories so far {total.calories} P: {total.protein} C: {total.carb} F: {total.fat}
        <form onSubmit={this.props.handleSubmit(form => console.log(form))}>
          <TextField
            fullWidth={true}
            name="search"
            onKeyPress={event => {
              if (event.key === 'Enter') {
                console.log(event);
                // this.props.feth(event.target.value)
                this.props.dispatch({type: INIT_API})
                searchForNutrition(event.target.value).then(stuff =>

{
  this.props.dispatch({type: CLOSE_API})
  return this.props.j(stuff[0])
}
                );
                event.target.value = '  ';
              }
            }}
          />
        <FlatButton label='g' type='submit' />
          <FieldArray name="cals" component={temp} cals={this.props.cals} />
        </form>
      </div>
    );
  }
}

// }
const mapDispatchToProps = dispatch => {
  return {
    feth: query => dispatch(searchForNutrition(query))
  };
};

const mapStateToProps = state => {
  return {
    results: state.getIn(['kcal', 'searchResults'])
  };
};
const selector = formValueSelector('kcal-k');
KcalLog = connect(state => ({
  cals: selector(state, 'cals')
}))(KcalLog);

export default connect(mapStateToProps, dispatch => ({
  j: f => dispatch(arrayPush('kcal-k', 'cals', f))
  ,h: f => dispatch(submit('kcal-k'))
}))(
  reduxForm({
    form: 'kcal-k',
    shouldValidate: () => true,
    onSubmit:form => console.log(form)
  })(KcalLog)
);
