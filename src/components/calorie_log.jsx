import React from 'react';
import {List, ListItem} from 'material-ui';
import * as _ from 'lodash'

const CalorieLog = ({nutritions}) =>
<List>
  {_.map(nutritions, n => <ListItem key = {Math.random()}>{n.name}</ListItem>)}
</List>


export default CalorieLog;
