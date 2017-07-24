import React, { Component } from 'react';
import {
  reduxForm,
  Field,
  FieldArray,
  formValueSelector,
  arrayPush,
  submit
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
import { Map, fromJS, List as ImmutableList } from 'immutable';
import { connect } from 'react-redux';
import { TextField as Tx } from 'redux-form-material-ui';
// import { searchForNutrition } from './../store/actionCreators/kcal_action_creators';
import * as _ from 'lodash';
import temp from './nutritions';
import { INIT_API, CLOSE_API } from './../store/actions/app_actions';
import calories1 from './../store/selectors/calorie_track';
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
  render() {
    const {total} = this.props;
    return (
      <div>
        Calories so far {total.get('calories')} P: {total.get('protein')} C:
        {total.get('carb')} F: {total.get('fat')}
        }
        <TextField
          fullWidth={true}
          name="search"
          onKeyPress={event => {
            if (event.key === 'Enter') {
              console.log(event);
              this.props.dispatch({ type: INIT_API });
              searchForNutrition(event.target.value)
                .then(stuff => {
                  this.props.dispatch({ type: CLOSE_API });
                  console.log(stuff[0]);
                  return this.props.pushToFoods(fromJS(stuff[0]));
                })
                .catch(err => {
                  console.log(err);
                });
              event.target.value = '  ';
            }
          }}
        />
        <FlatButton
          label="Remote submit"
          onTouchTap={() => this.props.remoteSubmit()}
        />
        <form onSubmit={this.props.handleSubmit(form => console.log(form))}>
          <FlatButton label="Update day" type="submit" />
          <FieldArray
            name="foods"
            component={temp}
            values={this.props.cals1.toJS()}
          />
        </form>
      </div>
    );
  }
}

const selector = formValueSelector('kcal-k');
const mapDispatchToProps = dispatch => {
  return {
    feth: query => dispatch(searchForNutrition(query))
  };
};

const mapStateToProps = state => {
  return {
    total: calories1(state),
    results: state.getIn(['kcal', 'searchResults'])
  };
};
KcalLog = connect((state, props) => ({
  cals1: selector(state, 'foods') || ImmutableList()
}))(KcalLog);

export default connect(mapStateToProps, dispatch => ({
  pushToFoods: food => dispatch(arrayPush('kcal-k', 'foods', food)),
  remoteSubmit: () => dispatch(submit('kcal-k'))
}))(
  reduxForm({
    form: 'kcal-k',
    shouldValidate: () => true,
    onSubmit: form => console.log(form)
  })(KcalLog)
);
