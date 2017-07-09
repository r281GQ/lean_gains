import React from "react";
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from "material-ui";

const KcalTargetResult = ({
  proteinTarget,
  fatTarget,
  percentage,
  method,
  kCalTarget,
  label
}) => {
  return (
    <div>
      <div>

        <Table>
        <TableHeader displaySelectAll={false}>
          <TableRow selectable={false}>
            <TableHeaderColumn>Calculated calories for {label}day: {kCalTarget}{" "}</TableHeaderColumn>

          </TableRow>
          <TableRow selectable={false}>
            <TableHeaderColumn>rest/traing</TableHeaderColumn>
            <TableHeaderColumn>Protein</TableHeaderColumn>
            <TableHeaderColumn>Fat</TableHeaderColumn>
            <TableHeaderColumn>Carbohydrate</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
          <TableRow selectable={false}>
            <TableRowColumn >
              {" "}{label} kcal
            </TableRowColumn>
            <TableRowColumn >
              {" "}{proteinTarget}
            </TableRowColumn>
            <TableRowColumn >
              {" "}{method === "percentage"
                ? kCalTarget * (percentage / 100)
                : fatTarget * 9}
            </TableRowColumn>
            <TableRowColumn>
              {" "}{method === "percentage"
                ? kCalTarget - proteinTarget - kCalTarget  * (percentage / 100)
                : kCalTarget - proteinTarget - fatTarget * 9}
            </TableRowColumn>
          </TableRow>
          <TableRow selectable={false}>
            <TableRowColumn >
              {" "}{label} grams
            </TableRowColumn>
            <TableRowColumn >
              {" "}{proteinTarget/4}
            </TableRowColumn>
            <TableRowColumn >
              {" "}{(method === "percentage"
                ? kCalTarget * (percentage / 100)
                : fatTarget * 9)/9}
            </TableRowColumn>
            <TableRowColumn>
              {" "}{method === "percentage"
                ? kCalTarget - proteinTarget - kCalTarget * (percentage / 100) > 0 ?kCalTarget - proteinTarget - kCalTarget * (percentage / 100) : 0
                : (kCalTarget - proteinTarget - fatTarget * 9)/4 > 0 ? (kCalTarget - proteinTarget - fatTarget * 9)/4 : 0 } 
            </TableRowColumn>
          </TableRow>
        </TableBody>
      </Table>
        </div>
    </div>
  );
};

// prot fat{" "}
// {method === "percentage" ? kCalTarget * (fatTarget / 100) : fatTarget * 9}
// carbs:{" "}
// {method === "percentage"
//   ? kCalTarget - proteinTarget - kCalTarget * (fatTarget / 100)
//   : kCalTarget - proteinTarget - fatTarget * 9}

//
// {kCalTarget}
// prot {proteinTarget} fat{" "}
// {method === "percentage"
//   ? kCalTarget * (percentageFatTarget / 100)
//   : Number.parseInt(this.props.restFatGrams) * 9}
// carbs:{" "}
// {this.props.fatMethod === "percentage"
//   ? restDayKcal -
//     proteincal -
//     restDayKcal * (this.props.restFatPercentage / 100)
//   : restDayKcal -
//     proteincal -
//     Number.parseInt(this.props.restFatGrams) * 9}

export default KcalTargetResult;
