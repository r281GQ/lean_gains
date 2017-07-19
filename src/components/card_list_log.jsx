import React from 'react';
import {
  List,
  ListItem,
  FlatButton,
  DropDownMenu,
  MenuItem,
  Card,
  CardHeader,
  CardText,
  FloatingActionButton,
  Dialog
} from 'material-ui';
import { Link, Route } from 'react-router-dom';
import ContentAdd from 'material-ui/svg-icons/content/add';
import * as _ from 'lodash';
import moment from 'moment';

const CardListLog = ({workoutLogs, editLink, onModalStateChange,
setSelectedItem}) => {
  return (
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
              {_.map(log.exercises, exercise => {
                return (
                  <div key={`${log._id}.${log.exercises.indexOf(exercise)}`}>
                    Exercise: {exercise.name}
                    <br />
                    Sets:
                    {_.map(exercise.sets, set => {
                      return (
                        <div
                          key={`${log._id}.${log.exercises.indexOf(
                            exercise
                          )}.${exercise.sets.indexOf(set)}`}
                        >
                          Repetitions: {set.reps} Weight: {set.weight}
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </CardText>
            <Link to={`${editLink}${log._id}`}>
              <FlatButton label={`Modify`} />
            </Link>
            <FlatButton
              label={`Delete`}
              onTouchTap={() => {
                setSelectedItem(log._id);
                onModalStateChange();
              }}
            />
          </Card>
        </ListItem>
      )}
    </List>
  );
}


export default CardListLog;
