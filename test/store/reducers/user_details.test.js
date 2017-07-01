import Immutable from "immutable";
import chai, { expect } from "chai";
import chaiImmutable from "chai-immutable";
import moment from "moment";

import userDetails, {
  INITIAL_STATE
} from "./../../../src/store/reducers/user_details";
import {
  WRITE_USER_DETAILS,
  UNSET_PICTURE
} from "./../../../src/store/actions/user_details_actions";

chai.use(chaiImmutable);

describe.only("description", () => {
  it("should get back the INITIAL_STATE", () => {
    const nextState = userDetails(undefined, {
      type: "nonexisting action type"
    });
    expect(nextState).to.equal(INITIAL_STATE);
  });

  it("should write the basic info the the userDetals", () => {
    const nextState = userDetails(undefined, {
      type: WRITE_USER_DETAILS,
      payload: {
        name: "Endre",
        dob: "22-05-1988",
        gender: "male",
        picture: `https://somerandomurl/pictureid`,
        username: "kfbr392"
      }
    });
    expect(nextState.get("name")).to.equal("Endre");
    expect(nextState.get("gender")).to.equal("male");
    expect(nextState.get("picture")).to.equal(
      `https://somerandomurl/pictureid`
    );
    expect(nextState.get("dob")).to.equal(
      moment("22-05-1988", "DD-MM-YYYY").valueOf()
    );
    expect(nextState.get("username")).to.equal("kfbr392");
  });

  describe("with some basic state", () => {
    let basicState;
    beforeEach(() => {
      const nextState = userDetails(undefined, {
        type: WRITE_USER_DETAILS,
        payload: {
          name: "Endre",
          dob: "22-05-1988",
          gender: "male",
          picture: `https://somerandomurl/pictureid`,
          username: "kfbr392"
        }
      });
      basicState = nextState;
    });

    it("should remove set the picture to undefined on UNSET_PICTURE", () => {
      const nextState = userDetails(basicState, { type: UNSET_PICTURE });
      expect(nextState.get("picture")).to.be.undefined;
    });
  });
});
