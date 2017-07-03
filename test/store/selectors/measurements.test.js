import Immutable, { fromJS, Map } from "immutable";
import chai, { expect } from "chai";
import chaiImmutable from "chai-immutable";
import moment from "moment";


import userDetails, {
  INITIAL_STATE
} from "./../../../src/store/reducers/user_details";

import constructValues from "./../../../src/store/selectors/mesaurements";

chai.use(chaiImmutable);
let mockState = Map().set("userDetails", INITIAL_STATE);
describe('description', () => {
  it('description', () => {
    console.log(constructValues(mockState));
  });
});
