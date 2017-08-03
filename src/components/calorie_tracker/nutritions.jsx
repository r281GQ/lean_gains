import React from 'react';
import { Field } from 'redux-form/immutable';
import {
  MenuItem,
  FlatButton,
  Card,
  CardHeader,
  CardMedia,
  CardActions,
  CardTitle,
  CardText
} from 'material-ui';
import { TextField, SelectField } from 'redux-form-material-ui';
import * as _ from 'lodash';

const Nutritions = ({ fields: { map, get, remove } }) =>
  <div>
    {map((result, index) =>
      <Card key={index}>
        <CardHeader
          showExpandableButton={true}
          actAsExpander={true}
          title={get(index).get('food_name')}
          subtitle={
            <div>
              Protein : {`${get(index).get('nf_protein')}  `}
              Carbohydrate: {`${get(index).get('nf_total_carbohydrate')}  `}
              Fat: {`${get(index).get('nf_total_fat')}  `}
              Calories: {`${get(index).get('nf_calories')}  `}
              Serving quantity: {`${get(index).get('quantity')}  `}
              Serving unit: {`${get(index).get('serving_unit')}  `}
            </div>
          }
          avatar={get(index).getIn(['photo', 'thumb'])}
        />

        <CardText expandable={true}>
          <div>
            <Field
              component={SelectField}
              name={`${result}.serving_unit`}
              fullWidth={true}
              floatingLabelText="serving unit"
            >
              {_.map(
                get(index).get('alt_measures').toJS(),
                ({ measure, serving_weight }) =>
                  <MenuItem
                    key={measure}
                    value={measure}
                    primaryText={`Meausure : ${measure}  Weight: ${serving_weight}`}
                  />
              )}
            </Field>
          </div>
          <Field
            name={`${result}.quantity`}
            component={TextField}
            floatingLabelText="serving quantity"
            type="number"
            min={1}
          />
        </CardText>
        <CardActions>
          <FlatButton
            label="remove from list"
            onTouchTap={() => remove(index)}
          />
        </CardActions>
      </Card>
    )}
  </div>;

export default Nutritions;
