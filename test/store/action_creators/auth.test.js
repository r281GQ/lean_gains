import sinon from 'sinon';
import createMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { fromJS } from 'immutable';

import { actionCreators } from './../../../src/store/index';
import * as who from './../../../src/store/actionCreators/whoAmI';
import request from './../../../src/services/request';

const { auth } = actionCreators;
const store = createMockStore([thunk])(fromJS({}));

describe('auth action creators', () => {
  let requestStub;
  let whoAmISpy;

  beforeEach(() => {
    store.clearActions();
  });

  afterEach(() => {
    requestStub.restore();
    store.clearActions();
  });

  it('who am i', async done => {
    requestStub = sinon.stub(request, 'get');
    requestStub.resolves({
      data: { name: 'name', email: 'email', _id: 'randomID' }
    });

    await store.dispatch(who.whoAmI());

    expect(store.getActions()[0].type).toBe('LOGIN_SUCCESS');
    expect(store.getActions()[0].payload).toEqual({
      name: 'name',
      email: 'email',
      _id: 'randomID'
    });

    done();
  });

  it('who am i error', async done => {
    requestStub = sinon.stub(request, 'get');
    requestStub.rejects();

    await store.dispatch(who.whoAmI());
    expect(store.getActions()[0].type).toBe('LOG_OUT');
    done();
  });

  it('logout', async done => {
    requestStub = sinon.stub(request, 'get');
    requestStub.resolves();

    await store.dispatch(auth.logOut());
    expect(store.getActions()[0].type).toBe('LOG_OUT');
    done();
  });

  it('login', async done => {
    requestStub = sinon.stub(request, 'post');
    requestStub.resolves(1);

    whoAmISpy = sinon.stub(who, 'whoAmI');

    whoAmISpy.callsFake(() => ({ type: 'LOGIN_SUCCESS' }));

    try {
      await store.dispatch(auth.logIn({}));
      expect(whoAmISpy.calledOnce).toBe(true);
      expect(requestStub.calledOnce).toBe(true);
      done();
    } catch (e) {
      done.fail(e);
    } finally {
      whoAmISpy.restore();
    }
  });

  it('login', async done => {
    requestStub = sinon.stub(request, 'post');
    requestStub.resolves(1);

    whoAmISpy = sinon.stub(who, 'whoAmI');

    whoAmISpy.callsFake(() => ({ type: 'LOGIN_SUCCESS' }));

    try {
      await store.dispatch(auth.signUp({}));
      expect(whoAmISpy.calledOnce).toBe(true);
      expect(requestStub.calledOnce).toBe(true);
      done();
    } catch (e) {
      done.fail(e);
    } finally {
      whoAmISpy.restore();
    }
  });
});
