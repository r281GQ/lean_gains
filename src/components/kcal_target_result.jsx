import React from "react";
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
  FlatButton
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

        <div style={{textAlign: 'center'}}>
        <FlatButton disabled={true} label= {`Calculated calories for ${label}day: ${kCalTarget}`}/>
</div>
      <Table>
        <TableHeader displaySelectAll={false}>

          <TableRow selectable={false}>
            <TableHeaderColumn></TableHeaderColumn>
            <TableHeaderColumn>Protein</TableHeaderColumn>
            <TableHeaderColumn>Carbohydrate</TableHeaderColumn>
            <TableHeaderColumn>Fat</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
          <TableRow selectable={false}>
            <TableRowColumn >
              {" "} Calories
            </TableRowColumn>
            <TableRowColumn >
              {" "}{_.ceil(proteinTarget)}
            </TableRowColumn>
            <TableRowColumn>
              {" "}{method === "percentage"
              ? kCalTarget - proteinTarget - kCalTarget  * (percentage / 100) > 0? _.ceil(kCalTarget - proteinTarget - kCalTarget  * (percentage / 100)) : 0
              : kCalTarget - proteinTarget - fatTarget * 9 > 0 ? _.ceil(kCalTarget - proteinTarget - fatTarget * 9) : 0}
            </TableRowColumn>
            <TableRowColumn >
              {" "}{method === "percentage"
                ? _.ceil(kCalTarget * (percentage / 100))
                : fatTarget * 9}
            </TableRowColumn>
          </TableRow>
          <TableRow selectable={false}>
            <TableRowColumn >
              {" "} Grams
            </TableRowColumn>
            <TableRowColumn >
              {" "}{_.ceil(proteinTarget/4)}
            </TableRowColumn>
            <TableRowColumn>
              {" "}{method === "percentage"
              ? (kCalTarget - proteinTarget - kCalTarget  * (percentage / 100))/4 > 0 ? _.ceil((kCalTarget - proteinTarget - kCalTarget  * (percentage / 100))/4) : 0
              : (kCalTarget - proteinTarget - fatTarget * 9)/4 > 0 ? _.ceil((kCalTarget - proteinTarget - fatTarget * 9)/4) : 0 }
            </TableRowColumn>
            <TableRowColumn >
              {" "}{method === "percentage"
                ? _.ceil((kCalTarget * (percentage / 100)/9))
                : fatTarget * 9/9}
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
