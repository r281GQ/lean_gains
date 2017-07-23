import { Map } from 'immutable';
import { createSelector } from 'reselect';

import currentKcalSelector from './current_kcal_target';
import exercises from './exercises';

const mainExercises = exercises('main');

const isTraingingDay = state => !mainExercises(state).isEmpty();

const currentKcal = state => currentKcalSelector(state);

const currentMacros = (isTraingingDay, currentKcal) =>
  isTraingingDay
    ? !currentKcal.isEmpty() ? currentKcal.get('training') : Map()
    : !currentKcal.isEmpty() ? currentKcal.get('rest') : Map();

export default createSelector(isTraingingDay, currentKcal, currentMacros);
