import React, { PureComponent } from 'react';
import { reduxForm, submit } from 'redux-form/immutable';
import { connect } from 'react-redux';
import { DatePicker, Dialog, FlatButton } from 'material-ui';
import * as _ from 'lodash';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import moment from 'moment';

import NutritionSearchBar from './../../components/calorie_tracker/nutrition_search_bar';
import CalorieTrackerSummary from './../../components/calorie_tracker/calorie_tracker_summary';
import FoodsFieldArray from './../../components/calorie_tracker/foods_field_array';
import sumMacros from './../../store/selectors/sum_macros';
import {
  search,
  updateCalorieLog,
  loadNutritionsForDay
} from './../../store/actionCreators/calorie_action_creators';

import * as app from './../../store/actionCreators/app_action_creators';

//TODO favourite foods like shortcut or tags, recentsearches and recipes
class CalorieTrackerContainer extends PureComponent {
  componentDidMount() {
    this.props.loadNutritionsForDay(moment().toDate(), true);
  }

  constructor(props) {
    super(props);
    this._onFormSubmit = this._onFormSubmit.bind(this);
    this._onCancel = this._onCancel.bind(this);
    this._onDiscard = this._onDiscard.bind(this);
  }

  _onKeyPressHandler = ({ key, target: { value } }) => {
    if (key === 'Enter') {
      this.props.search(value);
      value = '';
    }
  };

  _onFormSubmit() {
    this.props.submit();
  }

  _onCancel() {
    this.props.closeConsentModal();
  }

  _onDiscard() {
    this.props.loadNutritionsForDay(this.props.pendingDate, true);
    this.props.closeConsentModal();
  }

  _roundAndConvertSum = sum => sum.map(value => _.round(value));

  render() {
    const {
      handleSubmit,
      updateCalorieLog,
      sum,
      loadNutritionsForDay,
      selectedDay,
      pristine,
      isConsentModalOpen
    } = this.props;
    return (
      <div>
        <div className="row">
          <div className="col col-6">
            <FlatButton fullWidth label="save" onClick={this._onFormSubmit} />
            <Dialog
              open={isConsentModalOpen}
              title="You have unsaved chnages in the foods, if you procedd these will be lost"
              actions={[
                <FlatButton
                  key="save"
                  onClick={this._onFormSubmit}
                  label="save"
                />,
                <FlatButton
                  key="discard"
                  onClick={this._onDiscard}
                  label="discard"
                />,
                <FlatButton
                  key="cancel"
                  onClick={this._onCancel}
                  label="cancel"
                />
              ]}
            />
            <div className="row">
              <div className="col col-6">
                <DatePicker
                  name="date"
                  onChange={(event, value) =>
                    loadNutritionsForDay(value, pristine)}
                  value={selectedDay}
                />
              </div>
              <div className="col col-6">
                <CalorieTrackerSummary
                  sum={this._roundAndConvertSum(sum).toJS()}
                />
              </div>
              <div className="clear" />
            </div>

            <NutritionSearchBar onKeyPressHandler={this._onKeyPressHandler} />
          </div>
          <div className="col col-6">
            <form
              onSubmit={handleSubmit(formProps => {
                updateCalorieLog(formProps.get('foods').toJS(), selectedDay);
              })}
            >
              <FoodsFieldArray />
            </form>
          </div>
          <div className="clear" />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    pendingDate: state.getIn(['app', 'openConsentModalDate']),
    sum: sumMacros(state),
    selectedDay: state.getIn(['app', 'selectedDayCalorieLog']),
    isConsentModalOpen: state.getIn(['app', 'isConsentModalOpen']),
    loadNutritionsForDay: PropTypes.func
  };
};

const mapDispatchToProps = dispatch => {
  return {
    closeConsentModal: () => dispatch(app.closeConsentModal()),
    search: calue => dispatch(search(calue)),
    submit: () => dispatch(submit('calorie_track')),
    updateCalorieLog: (calorielog, day, nextDay) =>
      dispatch(updateCalorieLog(calorielog, day, nextDay)),
    loadNutritionsForDay: (value, isPristine) =>
      dispatch(loadNutritionsForDay(value, isPristine))
  };
};

CalorieTrackerContainer.propTypes = {
  search: PropTypes.func.isRequired,
  updateCalorieLog: PropTypes.func.isRequired,
  sum: ImmutablePropTypes.map,
  selectedDay: PropTypes.instanceOf(Date),
  loadNutritionsForDay: PropTypes.func,
  isConsentModalOpen: PropTypes.bool,
  closeConsentModal: PropTypes.func.isRequired,
  pendingDate: PropTypes.instanceOf(Date)
};

export default connect(mapStateToProps, mapDispatchToProps)(
  reduxForm({
    form: 'calorie-track',
    onSubmit: (formProps, dispatch, props) =>
      dispatch(
        updateCalorieLog(
          formProps.get('foods').toJS(),
          props.selectedDay,
          props.pendingDate
        )
      )
  })(CalorieTrackerContainer)
);
