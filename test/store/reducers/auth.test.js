import Immutable from "immutable";
import chai, { expect } from "chai";
import chaiImmutable from "chai-immutable";

import auth from "./../../../src/store/reducers/auth";

import {
  INIT_AUTH,
  CLOSE_AUTH,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOG_OUT
} from "./../../../src/store/actions/auth";

chai.use(chaiImmutable);

const INITIAL_STATE = Immutable.fromJS({
  authenticated: false,
  isLoading: false,
  token: undefined,
  failedAttempt: false,
  user: {
    name: undefined,
    email: undefined,
    _id: undefined
  }
});

let LOGGED_IN_STATE;

describe("AuthReducer", () => {
  it("should return initial state when invalid action is dispatched", () => {
    const nextState = auth(undefined, { type: "invalid action" });
    expect(nextState).to.equal(INITIAL_STATE);
  });

  it("should set isLoading property to true when INIT_AUTH is dispatched", () => {
    const nextState = auth(undefined, { type: INIT_AUTH });
    expect(nextState.get("isLoading")).to.equal(true);
  });

  it("should set isLoading property to false when CLOSE_AUTH is dispatched", () => {
    const nextState = auth(INITIAL_STATE.set("isLoading", true), {
      type: CLOSE_AUTH
    });
    expect(nextState.get("isLoading")).to.equal(false);
  });

  it("should set authenticated to true and token and user details on LOGIN_SUCCESS", () => {
    const nextState = auth(undefined, {
      type: LOGIN_SUCCESS,
      payload: {
        name: "Endre",
        email: "endre@mail.com",
        _id: "randomId",
        token: "randomToken"
      }
    });

    LOGGED_IN_STATE = nextState;

    expect(nextState.get("authenticated")).to.equal(true);
    expect(nextState.get("failedAttempt")).to.equal(false);
    expect(nextState.getIn(["user", "name"])).to.equal("Endre");
    expect(nextState.getIn(["user", "email"])).to.equal("endre@mail.com");
    expect(nextState.getIn(["user", "_id"])).to.equal("randomId");
    expect(nextState.get("token")).to.not.be.undefined;
  });

  it("should set failedAttempt to true on LOGIN_FAILED", () => {
    const nextState = auth(undefined, { type: LOGIN_FAILED });
    expect(nextState.get("failedAttempt")).to.equal(true);
  });

  it("should return INITIAL_STATE on LOG_OUT", () => {
    const nextState = auth(LOGGED_IN_STATE, { type: LOG_OUT });
    expect(nextState).to.equal(INITIAL_STATE);
  });
});
