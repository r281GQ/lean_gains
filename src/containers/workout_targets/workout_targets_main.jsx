import React, { Component } from 'react';
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
import ContentAdd from 'material-ui/svg-icons/content/add';
import { Link } from 'react-router-dom';
import * as _ from "lodash";
import {connect} from 'react-redux';

class WorkoutTargetsMainContainer extends Component {
  render() {
    return (
      <div>
        <List>
        {_.map(this.props.workoutTargets.toJS(), g =>{
          return <ListItem disabled={true} key={Math.random()}>

            <Card
              title={g.name}
              >
              <CardHeader

                title={g.name}
                actAsExpander={false}
                showExpandableButton={true}
                />

              <CardText>
                {_.map(g.exercises, e => <div>{e}</div>)}
<Link to={`/workouttargets/edit/${g._id}`}>
<FlatButton onTouchTap={()=> console.log('modiy')} label='modifiy' />
  </Link>              <FlatButton onTouchTap={()=> console.log('delete')} label='delete' />
              </CardText>

            </Card>


          </ListItem>
        })}
</List>
        <Link to="/workouttargets/create">
          <FloatingActionButton
            style={{
              position: 'fixed',
              bottom: 20,
              right: 20
            }}
          >
            <ContentAdd />
          </FloatingActionButton>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    workoutTargets: state.getIn(['userDetails', 'workoutTargets'])
  };
}

export default connect(mapStateToProps) (WorkoutTargetsMainContainer);
