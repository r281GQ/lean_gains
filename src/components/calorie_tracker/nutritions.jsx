import React from 'react';
import { Field } from 'redux-form/immutable';
import {
  MenuItem,
  FlatButton,
  Card,
  CardHeader,
  CardActions,
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
          title={get(index).get('name')}
          subtitle={
            <div>
              Protein : {`${get(index).get('protein')}  `}
              Carbohydrate: {`${get(index).get('carbohydrate')}  `}
              Fat: {`${get(index).get('fat')}  `}
              Calories: {`${get(index).get('calorie')}  `}
              Serving quantity: {`${get(index).get('quantity')}  `}
              Serving unit: {`${get(index).get('unit')}  `}
            </div>
          }
          avatar={get(index).getIn(['photo', 'thumb'])}
        />

        <CardText expandable={true}>
          <div>
            <Field
              component={SelectField}
              name={`${result}.unit`}
              fullWidth={true}
              floatingLabelText="serving unit"
            >
              {_.map(
                get(index).get('measures').toJS(),
                ({ name, weight }) =>
                  <MenuItem
                    key={name}
                    value={name}
                    primaryText={`Meausure : ${name}  Weight: ${weight}`}
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
