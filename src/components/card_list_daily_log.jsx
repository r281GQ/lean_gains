import React from 'react';
import {
  List,
  ListItem,
  Card,
  CardHeader,
  CardText,
  FlatButton
} from 'material-ui';
import { Link, Route } from 'react-router-dom';
import moment from 'moment';
import * as _ from 'lodash';

const CardListDailyLog = ({
  collection,
  onModalStateChange,
  setSelectedItem
}) => {
  return (
    <List>
      {_.map(collection, log =>
        <ListItem disabled={true} key={log._id}>
          <Card>
            <CardHeader
              title={moment(log.date).format('DD-MM-YYYY')}
              actAsExpander={true}
            />
            <CardText expandable={true}>
              {log._id}
              <Link to={`/app/dailylogs/edit/${log._id}`}>
                <FlatButton label="Edit" />
              </Link>
              <FlatButton
                onTouchTap={() => {
                  onModalStateChange();
                  setSelectedItem(log._id);
                }}
                label="Delete"
              />
            </CardText>
          </Card>
        </ListItem>
      )}
    </List>
  );
};

export default CardListDailyLog;
