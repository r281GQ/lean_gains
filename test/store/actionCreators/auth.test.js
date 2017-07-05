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
} from "./../../../src/store/actions/auth_actions";
import { logIn, signUp } from "./../../../src/store/actionCreators/auth_action_creators";

chai.use(chaiImmutable);

const INITIAL_STATE = Immutable.fromJS({
  authenticated: false,
  isLoading: false,
  token: undefined,
  failedAttempt: false,
  user: {
    isNew: undefined,
    lastLogin: undefined,
    name: undefined,
    email: undefined,
    _id: undefined
  }
});

let middlewares, mockStore, store;

describe.only("AuthActionCreators", () => {
  beforeEach(() => {
    middlewares = [thunk];
    mockStore = configureStore(middlewares);
    store = mockStore(INITIAL_STATE);
  });


  axios.post = jest.fn().mockImplementation(() => {
    return Promise.resolve({
      headers: {
        "x-auth": "randomToken"
      },
      data: {
        _id: "randomId",
        name: "Endre",
        email: "endre@mail.com"
      }
    });
  });

  it("should return INIT_AUTH and LOGIN_SUCCESS", async () => {
    axios.post = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        headers: {
          "x-auth": "randomToken"
        },
        data: {
          _id: "randomId",
          name: "Endre",
          email: "endre@mail.com"
        }
      });
    });
    await store.dispatch(signUp());
    expect(store.getActions()[0].type).to.equal(INIT_AUTH);
    expect(store.getActions()[1].type).to.equal(LOGIN_SUCCESS);
  });
  it("should return INIT_AUTH and LOGIN_SUCCESS", async () => {
    axios.post = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        headers: {
          "x-auth": "randomToken"
        },
        data: {
          _id: "randomId",
          name: "Endre",
          email: "endre@mail.com"
        }
      });
    });
    await store.dispatch(logIn());
    expect(store.getActions()[0].type).to.equal(INIT_AUTH);
    expect(store.getActions()[1].type).to.equal(LOGIN_SUCCESS);
  });
  it("should return INIT_AUTH and LOGIN_FAILED and CLOSE_AUTH", async () => {
    axios.post = jest.fn().mockImplementation(() => {
      return Promise.reject();
    });
    await store.dispatch(logIn());
    expect(store.getActions()[0].type).to.equal(INIT_AUTH);
    expect(store.getActions()[1].type).to.equal(LOGIN_FAILED);
    expect(store.getActions()[2].type).to.equal(CLOSE_AUTH);
  });

});
