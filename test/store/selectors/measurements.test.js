import Immutable, { fromJS, Map } from "immutable";
import chai, { expect } from "chai";
import chaiImmutable from "chai-immutable";
import moment from "moment";


import userDetails, {
  INITIAL_STATE
} from "./../../../src/store/reducers/daily_log";

import constructValues from "./../../../src/store/selectors/mesaurements";

chai.use(chaiImmutable);
let mockState = Map().set("dailyLog", INITIAL_STATE);
describe('description', () => {
  it('description', () => {
    console.log(constructValues(mockState));
    expect(constructValues(mockState).getIn(['chest', 'measurement'])).to.equal(23)
  });
});
