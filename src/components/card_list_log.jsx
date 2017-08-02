import React from 'react';
import {
  List,
  ListItem,
  MenuItem,
  Card,
  CardHeader,
  CardText
} from 'material-ui';
import * as _ from 'lodash';
import moment from 'moment';

import DeleteButton from './delete_button';
import ModifyButton from './modify_button';

import WorkoutLogDetails from './workout_log_details';

const CardListLog = ({
  workoutLogs,
  editLink,
  onModalStateChange,
  setSelectedItem
}) =>
  <List>
    {_.map(workoutLogs, log =>
      <ListItem key={log._id} disabled={true}>
        <Card>
          <CardHeader
            title={moment(log.date).format('DD-MM-YYYY')}
            actAsExpander={true}
            showExpandableButton={true}
          />
          <CardText expandable={true}>
            <WorkoutLogDetails log={log} />
          </CardText>
          <ModifyButton link={`${editLink}${log._id}`} />
          <DeleteButton
            setSelectedItem={() => setSelectedItem(log._id)}
            onModalStateChange={onModalStateChange}
          />
        </Card>
      </ListItem>
    )}
  </List>;

export default CardListLog;
