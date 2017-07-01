import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import Immutable from "immutable";
import axios from "axios";
import chai, { expect } from "chai";
import chaiImmutable from "chai-immutable";

import {
  INIT_AUTH,
  CLOSE_AUTH,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOG_OUT
} from "./../../../src/store/actions/auth";
import { logIn } from "./../../../src/store/actionCreators/auth";

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

let middlewares, mockStore, store;

describe("AuthActionCreators", () => {
  beforeEach(() => {
    middlewares = [thunk];
    mockStore = configureStore(middlewares);
    store = mockStore(INITIAL_STATE);
  });

  axios.post = jest.fn().mockImplementation(() => {
    return Promise.resolve({
      data: {
        _id: "idnumber",
        token: "randomtoken"
      }
    });
  });

  it("should return", async () => {
    await store.dispatch(logIn());
    expect(store.getActions()[0].type).to.equal(INIT_AUTH);
    expect(store.getActions()[1].type).to.equal(LOGIN_SUCCESS);
  });
});
