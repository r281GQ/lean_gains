import React from 'react';
import {
  List,
  ListItem,

  Card,
  CardHeader,
  CardText
} from 'material-ui';


import * as _ from 'lodash';

import DeleteButton from './../components/delete_button';
import ModifyButton from './../components/modify_button';

const CardList = ({
  editLink,
  collection,
  onModalStateChange,
  setSelectedItem
}) => {
  return (
    <List>
      {_.map(collection, item => {
        return (
          <ListItem disabled={true} key={item._id}>
            <Card title={item.name}>
              <CardHeader title={item.name} actAsExpander={true} />

              <CardText expandable={true}>
                {_.map(item.exercises, exercise =>
                  <div key={item.exercises.indexOf(exercise)}>
                    {exercise}
                  </div>
                )}

                <ModifyButton link={`${editLink}${item._id}`} />

                <DeleteButton
                  setSelectedItem={() => setSelectedItem( item._id)}
                  onModalStateChange={onModalStateChange}
                />
              </CardText>
            </Card>
          </ListItem>
        );
      })}
    </List>
  );
};

export default CardList;
