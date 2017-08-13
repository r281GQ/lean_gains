import React from 'react';
import PropTypes from 'prop-types';
import {
  List,
  ListItem,
  Card,
  CardHeader,
  CardText,
  FlatButton
} from 'material-ui';
import { Link } from 'react-router-dom';
import moment from 'moment';
import * as _ from 'lodash';

const CardListDailyLog = ({
  collection,
  onModalStateChange,
  setSelectedItem
}) =>
  <List>
    {_.map(collection, log =>
      <ListItem disabled={true} key={log._id}>
        <Card>
          <CardHeader
            title={moment(log.createdAt).format('DD-MM-YYYY')}
            actAsExpander={true}
          />
          <CardText expandable={true}>
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
  </List>;

CardListDailyLog.propTypes = {
  collection: PropTypes.object,
  onModalStateChange: PropTypes.func.isRequired,
  setSelectedItem: PropTypes.func.isRequired
};

export default CardListDailyLog;
