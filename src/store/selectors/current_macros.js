import isTrainingDay from "./exercises";
import currentKcal from "./current_kcal";

import { Map } from "immutable";

import { createSelector } from "reselect";

const traingingDay = state => !isTrainingDay(state).isEmpty();

const current = state => currentKcal(state);

const todayMacros = (isTrainingDay, currentKcal) =>
  isTrainingDay
    ? currentKcal ? currentKcal.get("training") : Map()
    : currentKcal ? currentKcal.get("rest") : Map();

export default createSelector(traingingDay, current, todayMacros);
