import isTrainingDay from "./exercises";
import currentKcal from "./current_kcal";

import { createSelector } from "reselect";

const traingingDay = state => !isTrainingDay(state).isEmpty();

const current = state => currentKcal(state);

const todayMacros = (isTrainingDay, currentKcal) =>
  !currentKcal.get("isCycling")
    ? currentKcal.get("flat")
    : isTrainingDay ? currentKcal.get("training") : currentKcal.get("rest");

export default createSelector(traingingDay, current, todayMacros);
