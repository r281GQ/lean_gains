import React from "react";
import {
  SelectField,
  MenuItem,
  List,
  ListItem,
  Card,
  CardHeader,
  CardText
} from "material-ui";
import * as _ from "lodash";
import moment from "moment";

const DailyLogPicker = ({ selected, change, logs }) => {
  return (
    <div>
      <div>
        <SelectField value={selected} onChange={change}>
          <MenuItem value={0} primaryText="jamn" />
          <MenuItem value={1} primaryText="jamn1" />
        </SelectField>
      </div>
      <div>
        <List>
          {_.map(logs, log =>
            <div key={Math.random()}>
              <ListItem disabled={true}>
                <Card>
                  <CardHeader
                    title={moment(log.date).format("DD-MM-YYYY")}
                    subtitle="Subtitle"
                    actAsExpander={true}
                    showExpandableButton={true}
                  />
                  <CardText expandable={true}>
                    {log._id}
                  </CardText>
                </Card>
              </ListItem>
            </div>
          )}
        </List>
      </div>
    </div>
  );
};

export default DailyLogPicker;
