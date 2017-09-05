import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { reduxForm, getFormValues } from 'redux-form/immutable';
import { Map, List } from 'immutable';
import moment from 'moment';
import * as _ from 'lodash';

import WorkoutLogForm from './../../components/workout_log/workout_log_form';
import {
  createWorkoutLog,
  updateWorkoutLog
} from './../../store/actionCreators/workout_log_action_creators';

// TODO: move mapStateToProps to selectors
class WorkoutLogFormContainer extends PureComponent {
  constructor(props) {
    super(props);
    this._disableThese = this._disableThese.bind(this);
    this._isDisabled = this._isDisabled.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._renderDate = this._renderDate.bind(this);
    this._mapToBoolean = this._mapToBoolean.bind(this);
  }

  componentDidMount() {
    if (this.props.match.params.id)
      this.props.initialize(
        this.props.defaultValue.update('createdAt', value =>
          moment(value).toDate()
        )
      );
    else {
      this.props.initialize(Map().set('createdAt', moment().toDate()));
    }
  }

  _mapToBoolean(value) {
    return _.isBoolean(value) ? value : false;
  }

  _disableThese(disableDates) {
    return function(createdAt) {
      return disableDates.find(value => moment(value).isSame(createdAt, 'day'))
        ? true
        : false;
    };
  }

  _isDisabled() {
    const { match, datesWithWorkoutLogs, selectedDate } = this.props;
    return datesWithWorkoutLogs.find(value =>
      moment(value).isSame(selectedDate, 'day')
    ) && !match.params.id
      ? true
      : false;
  }

  _handleFormSubmit(formProps) {
    const { match, createWorkoutLog, updateWorkoutLog } = this.props;
    match.params.id
      ? updateWorkoutLog({
          ...formProps.toJS(),
          _id: match.params.id,
          createdAt: moment(formProps.get('createdAt')).valueOf()
        })
      : createWorkoutLog({
          ...formProps.toJS(),
          createdAt: moment(formProps.get('createdAt')).valueOf()
        });
  }

  _renderDate() {
    const { match } = this.props;
    return match.path ? _.includes(match.path, 'before') : false;
  }

  render() {
    const {
      match,
      handleSubmit,
      datesWithWorkoutLogs,
      markerList
    } = this.props;
    return (
      <WorkoutLogForm
        submitHandler={handleSubmit(this._handleFormSubmit)}
        renderDate={this._renderDate()}
        maxDate={moment().toDate()}
        minDate={moment()
          .subtract(110, 'years')
          .toDate()}
        formatDate={value => moment(value).toDate()}
        shouldDisableDate={this._disableThese(datesWithWorkoutLogs)}
        passedMarkerList={markerList}
        normalizeMarker={this._mapToBoolean}
        disabled={this._isDisabled()}
        label={match.params.id ? 'Update' : 'Create'}
      />
    );
  }
}

WorkoutLogFormContainer.propTypes = {
  createWorkoutLog: PropTypes.func.isRequired,
  defaultValue: PropTypes.oneOfType([
    ImmutablePropTypes.list,
    ImmutablePropTypes.map
  ]),
  updateWorkoutLog: PropTypes.func.isRequired,
  datesWithWorkoutLogs: ImmutablePropTypes.set,
  markerList: ImmutablePropTypes.list,
  selectedDate: PropTypes.instanceOf(Date)
};

const mapStateToProps = state => {
  return {
    datesWithWorkoutLogs: state.getIn(['workoutLogs', 'dates']),
    selectedDate: getFormValues('workoutLog')(state)
      ? moment(getFormValues('workoutLog')(state).get('createdAt')).toDate()
      : moment().toDate(),
    markerList:
      getFormValues('workoutLog')(state) &&
      getFormValues('workoutLog')(state).get('exercises')
        ? getFormValues('workoutLog')(state)
            .get('exercises')
            .map(value => value.get('marker'))
        : List()
  };
};

export default connect(mapStateToProps, { updateWorkoutLog, createWorkoutLog })(
  reduxForm({
    form: 'workoutLog'
  })(WorkoutLogFormContainer)
);

export {WorkoutLogFormContainer as PureWorkoutLogFormContainer}
