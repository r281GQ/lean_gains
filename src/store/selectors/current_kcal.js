import Immutable from "immutable";
import { createSelector } from "reselect";

export default createSelector(
  state => state,
  state =>
    state
      .getIn(["userDetails", "kcalTargets"])
      .find(value => value.get("isLatest"))
);
