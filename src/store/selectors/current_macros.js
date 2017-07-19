import { Map } from 'immutable';
import { createSelector } from 'reselect';

import currentKcalSelector from './current_kcal';
import isTrainingDay from './exercises';

const isTraingingDay = state => !isTrainingDay(state).isEmpty();

const currentKcal = state => currentKcalSelector(state);

const currentMacros = (isTraingingDay, currentKcal) =>
  isTraingingDay
    ? currentKcal ? currentKcal.get('training') : Map()
    : currentKcal ? currentKcal.get('rest') : Map();

export default createSelector(isTraingingDay, currentKcal, currentMacros);
