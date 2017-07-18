import React, { Component } from 'react';
import {
  reduxForm,
  Field,
  FieldArray,
  formValueSelector,
  arrayPush
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
  CardActions,
  CardTitle,
  CardText
} from 'material-ui';
import { connect } from 'react-redux';
import * as _ from 'lodash';
import { TextField as Tx, SelectField as Sx } from 'redux-form-material-ui';

const r = ({ fields, cals }) => {
  return (
    <div>
      {fields.map((result, index) => {
        return (
          <Card key={index}>
            <CardHeader
              showExpandableButton={true}
              actAsExpander={true}
              title={cals[index].food_name}
              subtitle={
                <div>
                  Protein : {`${cals[index].nf_protein}  `}
                  Carbohydrate: {`${cals[index].nf_total_carbohydrate}  `}
                  Fat: {`${cals[index].nf_total_fat}  `}
                  Calories: {`${cals[index].nf_calories}  `}
                  Serving quantity: {`${cals[index].quantity}  `}
                  Serving unit: {`${cals[index].serving_unit}  `}
                </div>
              }
              avatar={cals[index].photo.thumb}
            />

            <CardText expandable={true}>
              <div>
              <Field
                component={Sx}
                name={`${result}.serving_unit`}
                fullWidth={true}
                floatingLabelText= 'serving unit'
              >
                {_.map(cals[index].alt_measures, alt => {
                  return (
                    <MenuItem
                      key={`${alt.measure}`}
                      value={`${alt.measure}`}
                      primaryText={`Meausure : ${alt.measure}  Weight: ${alt.serving_weight}`}
                    />
                  );
                })}
              </Field>
              </div>
              <Field
                name={`${result}.quantity`}
                component={Tx}
                floatingLabelText="serving quantity"
                type="number"
                min={1}
              />
            </CardText>
            <CardActions>
              <FlatButton
                label="remove from list"
                onTouchTap={() => fields.remove(index)}
              />
            </CardActions>
          </Card>
        );
      })}
    </div>
  );
};

export default r;
