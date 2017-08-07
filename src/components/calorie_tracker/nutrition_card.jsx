
const NutritionCard = ({values: {protein, carbohydrate, fat, calorie, quantity, unit, photo, }}) =>
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
