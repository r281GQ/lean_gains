import isTrainingDay from "./training_day";
import currentKcal from "./current_kcal";

import { createSelector } from "reselect";

const traingingDay = state => isTrainingDay(state);

const current = state => currentKcal(state);

const todayMacros = (isTrainingDay, currentKcal) =>
  !currentKcal.get("isCycling")
    ? currentKcal.get("flat")
    : isTrainingDay ? currentKcal.get("training") : currentKcal.get("rest");

export default createSelector(traingingDay, current, todayMacros);
