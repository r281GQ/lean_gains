import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { submit } from 'redux-form/immutable';
import { connect } from 'react-redux';
import { initializeCalorieLog } from './../../store/actionCreators/calorie_action_creators';
import {
  loadNutritionsForDay,
  closeConsentModal,
  addCalorieTrackConsent
} from './../../store/actionCreators/app_action_creators';
import {  DatePicker, Dialog, FlatButton } from 'material-ui';






const actions = (
  closeConsentModal,
  saveForm,
  loadNutritionsForDay,
  da,
  addConsent
) => [
  <FlatButton key={1}
    label="Cancel"
    onTouchTap={() => {
      closeConsentModal();
    }}
  />,

  <FlatButton key={2}
    label="Discard"
    onTouchTap={() => {
      addConsent();
      closeConsentModal();
      loadNutritionsForDay(da);
    }}
  />,
  <FlatButton key={3}
    label="Save"
    primary
    onTouchTap={() => {
      saveForm();
      // closeConsentModal();
    }}
  />
];



//TODO: isFetching to HOC
class CalorieLogContainer extends PureComponent {
  componentDidMount() {
    this.props.initializeCalorieLog();
  }

  render() {
    const {
      loadNutritionsForDay,
      selectedDay,
      isConsentModalOpen,
      closeConsentModal,
      saveForm,
      addConsent
    } = this.props;
    return(<div>
      <DatePicker
        name="f"
        onChange={(event, value) => loadNutritionsForDay(value)}
        value={selectedDay}
      />
      <FlatButton label="update day" onTouchTap={() => saveForm()} />
      <Dialog
        open={isConsentModalOpen}
        title={`you have unsaved chnages in the foods, if you procedd these will be lost`}
        actions={actions(
          closeConsentModal,
          saveForm,
          loadNutritionsForDay,
          this.props.da,
          addConsent
        )}
      />
    </div>);

  }
}
CalorieLogContainer.propTypes = {
  initializeCalorieLog: PropTypes.func,
  loadNutritionsForDay: PropTypes.func,
  selectedDay: PropTypes.instanceOf(Date),
  isConsentModalOpen:PropTypes.bool,
  closeConsentModal: PropTypes.func,
  saveForm: PropTypes.func,
  addConsent: PropTypes.func,
  da:PropTypes.instanceOf(Date),
}
const mapStateToProps = state => {
  return {
    da: state.getIn(['app', 'openConsentModalDate']),

    selectedDay: state.getIn(['app', 'selectedDayCalorieLog']),
    isConsentModalOpen: state.getIn(['app', 'isConsentModalOpen'])
  };
};

const mapDispatchToProps = dispatch => {
  return {
    initializeCalorieLog: () => dispatch(initializeCalorieLog()),
    loadNutritionsForDay: value => dispatch(loadNutritionsForDay(value)),
    closeConsentModal: () => dispatch(closeConsentModal()),
    saveForm: () => dispatch(submit('calorie-track')),
    addConsent: () => dispatch(addCalorieTrackConsent())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  CalorieLogContainer
);
