import React from 'react';
import PropTypes from 'prop-types';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui';

import CalorieTargetLabel from './calore_target_label';

const CalorieTargetResultTable = ({ calorieTarget, label }) =>
  <Table>
    <TableHeader displaySelectAll={false}>
      <TableRow selectable={false}>
        <TableHeaderColumn />
        <TableHeaderColumn>Protein</TableHeaderColumn>
        <TableHeaderColumn>Carbohydrate</TableHeaderColumn>
        <TableHeaderColumn>Fat</TableHeaderColumn>
      </TableRow>
    </TableHeader>
    <TableBody displayRowCheckbox={false}>
      <TableRow selectable={false}>
        <TableRowColumn> Calories</TableRowColumn>
        <TableRowColumn>
          <CalorieTargetLabel value={calorieTarget[label].protein * 4} />
        </TableRowColumn>
        <TableRowColumn>
          <CalorieTargetLabel value={calorieTarget[label].carbohydrate * 4} />
        </TableRowColumn>
        <TableRowColumn>
          <CalorieTargetLabel value={calorieTarget[label].fat * 9} />
        </TableRowColumn>
      </TableRow>
      <TableRow selectable={false}>
        <TableRowColumn> Grams</TableRowColumn>
        <TableRowColumn>
          <CalorieTargetLabel value={calorieTarget[label].protein} />
        </TableRowColumn>
        <TableRowColumn>
          <CalorieTargetLabel value={calorieTarget[label].carbohydrate} />
        </TableRowColumn>
        <TableRowColumn>
          <CalorieTargetLabel value={calorieTarget[label].fat} />
        </TableRowColumn>
      </TableRow>
    </TableBody>
  </Table>;

CalorieTargetResultTable.propTypes = {
  calorieTarget: PropTypes.oneOfType([
    PropTypes.shape({
      rest: PropTypes.shape({
        calorie: PropTypes.number,
        protein: PropTypes.number,
        carbohydrate: PropTypes.number,
        fat: PropTypes.number
      })
    }),
    PropTypes.shape({
      training: PropTypes.shape({
        calorie: PropTypes.number,
        protein: PropTypes.number,
        carbohydrate: PropTypes.number,
        fat: PropTypes.number
      })
    })
  ]),
  label: PropTypes.string
};

export default CalorieTargetResultTable;
