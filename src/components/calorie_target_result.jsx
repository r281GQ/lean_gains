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

const CalorieTargetResult = ({ label, calorieTarget }) =>
  calorieTarget
    ? <div>
        <div>
          <div style={{ textAlign: 'center' }}>
            <FlatButton
              disabled={true}
              label={`Calculated calories for ${label} day: ${calorieTarget[
                label
              ].calorie}`}
            />
          </div>
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
                  {' '}{calorieTarget[label].protein * 4}
                </TableRowColumn>
                <TableRowColumn>
                  {' '}{calorieTarget[label].carbohydrate * 4}
                </TableRowColumn>
                <TableRowColumn>
                  {' '}{calorieTarget[label].fat * 9}
                </TableRowColumn>
              </TableRow>
              <TableRow selectable={false}>
                <TableRowColumn> Grams</TableRowColumn>
                <TableRowColumn>
                  {' '}{calorieTarget[label].protein}
                </TableRowColumn>
                <TableRowColumn>
                  {' '}{calorieTarget[label].carbohydrate}
                </TableRowColumn>
                <TableRowColumn>
                  {' '}{calorieTarget[label].fat}
                </TableRowColumn>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    : null;

export default CalorieTargetResult;
