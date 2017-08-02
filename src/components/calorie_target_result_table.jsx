import React from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
  FlatButton
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

export default CalorieTargetResultTable;
