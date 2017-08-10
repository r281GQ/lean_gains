import React, { PureComponent } from 'react';
import { submit } from 'redux-form/immutable';
import { connect } from 'react-redux';
import { initializeCalorieLog } from './../store/actionCreators/calorie_action_creators';
import {
  loadNutritionsForDay,
  closeConsentModal
} from './../store/actionCreators/app_action_creators';
import { LinearProgress, DatePicker, Dialog, FlatButton } from 'material-ui';
import * as _ from 'lodash';

const actions = (closeConsentModal, saveForm, loadNutritionsForDay, da ,addConsent ) => [
  <FlatButton
    label="Cancel"

    onTouchTap={() => {

      closeConsentModal()
    }
  }
/>,

<FlatButton
  label="Discard"

  onTouchTap={() => {
    addConsent();
    closeConsentModal()
    loadNutritionsForDay(da)
  }}
/>,
  <FlatButton
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
    return !this.props.isFetching
      ? <div>
          <DatePicker
            name="f"
            onChange={(event, value) => loadNutritionsForDay(value)}
            value={selectedDay}
          />
          <FlatButton label='update day'  onTouchTap={() =>saveForm()}/>
          <Dialog
            open={isConsentModalOpen}
            title={`you have unsaved chnages in the foods, if you procedd these will be lost`}
            actions={actions(closeConsentModal, saveForm, loadNutritionsForDay, this.props.da, addConsent)}
          />
        </div>
      : <LinearProgress />;
  }
}

const mapStateToProps = state => {
  return {
    da : state.getIn(['app', 'openConsentModalDate']),
    isFetching: state.getIn(['app', 'isFetching']),
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
    addConsent: () => dispatch({type: 'addConsent'})
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  CalorieLogContainer
);
