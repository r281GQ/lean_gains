import Immutable from "immutable";
import { createSelector } from "reselect";

export default createSelector(
  state => state,
  state =>
    state
      .getIn(["userDetails", "measurements"])
      .find(value => value.get("isLatest"))
      .get("weight")
);
