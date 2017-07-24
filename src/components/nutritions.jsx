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

const Nutritions = ({ fields: { map, remove }, values }) =>
  <div>
    {map((result, index) => {
      return (
        <Card key={index}>
          <CardHeader
            showExpandableButton={true}
            actAsExpander={true}
            title={result[index].food_name}
            subtitle={
              <div>
                Protein : {`${values[index].nf_protein}  `}
                Carbohydrate: {`${values[index].nf_total_carbohydrate}  `}
                Fat: {`${values[index].nf_total_fat}  `}
                Calories: {`${values[index].nf_calories}  `}
                Serving quantity: {`${values[index].quantity}  `}
                Serving unit: {`${values[index].serving_unit}  `}
              </div>
            }
            avatar={values[index].photo.thumb}
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
                  values[index].alt_measures,
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
      );
    })}
  </div>;

export default Nutritions;
