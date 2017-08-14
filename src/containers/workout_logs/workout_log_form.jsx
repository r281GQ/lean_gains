import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { reduxForm, initialize, getFormValues } from 'redux-form/immutable';
import { Map } from 'immutable';
import moment from 'moment';

import WorkoutLogForm from './../../components/workout_log/workout_log_form';
import {
  createWorkoutLog,
  updateWorkoutLog
} from './../../store/actionCreators/workout_log_action_creators';

const mapToBoolean = value => (_.isBoolean(value) ? value : false);

class WorkoutLogFormContainer extends PureComponent {
  constructor(props) {
    super(props);
    this._disableThese = this._disableThese.bind(this);
  }

  componentDidMount = () =>
    this.props.initialize(
      Map().withMutations(map =>
        map
          .set('createdAt', moment().toDate())
          .set('exercises', this.props.defaultValue)
      )
    );

  _disableThese = disableDates => createdAt =>
    disableDates.find(value => moment(value).isSame(createdAt, 'day'))
      ? true
      : false;

  render() {
    const {
      match,
      createWorkoutLog,
      handleSubmit,
      updateWorkoutLog,
      datesWithWorkoutLogs,
      markerList,
      selectedDate
    } = this.props;
    return (
      <WorkoutLogForm
        submitHandler={handleSubmit(
          formprops =>
            match.params.id
              ? updateWorkoutLog({
                  ...formprops.toJS(),
                  _id: match.params.id,
                  createdAt: moment(formprops.get('createdAt')).valueOf()
                })
              : createWorkoutLog({
                  ...formprops.toJS(),
                  createdAt: moment(formprops.get('createdAt')).valueOf()
                })
        )}
        renderDate={match.path ? _.includes(match.path, 'before') : false}
        maxDate={moment().toDate()}
        minDate={moment().subtract(110, 'years').toDate()}
        formatDate={value => moment(value).format('DD-MM-YYYY')}
        shouldDisableDate={this._disableThese(datesWithWorkoutLogs)}
        passedMarkerList={markerList}
        normalizeMarker={mapToBoolean}
        disabled={
          datesWithWorkoutLogs.find(value =>
            moment(value).isSame(selectedDate, 'day')
          ) && !match.params.id
            ? true
            : false
        }
        label={match.params.id ? 'Update' : 'Create'}
      />
    );
  }
}

export default connect(
  state => ({
    datesWithWorkoutLogs: state.getIn(['workoutLogs', 'dates']),
    selectedDate: getFormValues('workoutLog')(state)
      ? getFormValues('workoutLog')(state).get('createdAt')
      : moment(),
    markerList:
      getFormValues('workoutLog')(state) &&
      getFormValues('workoutLog')(state).get('exercises')
        ? getFormValues('workoutLog')(state)
            .get('exercises')
            .map(value => value.get('marker'))
        : Map()
  }),
  { updateWorkoutLog, createWorkoutLog }
)(
  reduxForm({
    form: 'workoutLog'
  })(WorkoutLogFormContainer)
);
