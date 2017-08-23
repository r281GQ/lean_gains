import sinon from 'sinon';
import createMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
// import moment from 'moment';
import { fromJS } from 'immutable';

import { actionCreators } from './../../../src/store/index';
import request from './../../../src/services/request';

const { userDetails } = actionCreators;
const store = createMockStore([thunk])(fromJS({}));

describe('userDetails', () => {
  let getStub;
  let deleteStub;
  let putStub;
  let postStub;

  beforeEach(() => {});
  afterEach(() => {
    postStub ? postStub.restore() : undefined;
    putStub ? putStub.restore() : undefined;
    getStub ? getStub.restore() : undefined;
    deleteStub ? deleteStub.restore() : undefined;
    store.clearActions();
  });

  it('createCalorieTarget without error', async done => {
    postStub = sinon.stub(request, 'post').resolves({ data: {} });

    await store.dispatch(userDetails.createCalorieTarget({}));

    expect(postStub.calledOnce).toBe(true);
    expect(store.getActions()[0].type).toBe('INIT_API');
    expect(store.getActions()[1].type).toBe('WRITE_KCAL_TARGETS');
    expect(store.getActions()[2].type).toBe('CLOSE_API');

    done();
  });
  it('createCalorieTarget with error', async done => {
    postStub = sinon.stub(request, 'post').rejects();

    await store.dispatch(userDetails.createCalorieTarget({}));

    expect(postStub.calledOnce).toBe(true);
    expect(store.getActions()[0].type).toBe('INIT_API');
    expect(store.getActions()[1].type).toBe('CLOSE_API');

    done();
  });

  it('createWorkoutTarget without error', async done => {
    postStub = sinon.stub(request, 'post').resolves({ data: {} });

    await store.dispatch(userDetails.createWorkoutTarget({}));

    expect(postStub.calledOnce).toBe(true);
    expect(store.getActions()[0].type).toBe('INIT_API');
    expect(store.getActions()[1].type).toBe('WRITE_WORKOUT_TARGET');
    expect(store.getActions()[2].type).toBe('CLOSE_API');

    done();
  });

  it('createWorkoutTarget with error', async done => {
    postStub = sinon.stub(request, 'post').rejects();

    await store.dispatch(userDetails.createWorkoutTarget({}));

    expect(postStub.calledOnce).toBe(true);
    expect(store.getActions()[0].type).toBe('INIT_API');
    expect(store.getActions()[1].type).toBe('CLOSE_API');

    done();
  });

  it('updateWorkoutTarget without error', async done => {
    putStub = sinon.stub(request, 'put').resolves({ data: {} });

    await store.dispatch(userDetails.updateWorkoutTarget({}));

    expect(putStub.calledOnce).toBe(true);
    expect(store.getActions()[0].type).toBe('INIT_API');
    expect(store.getActions()[1].type).toBe('WRITE_WORKOUT_TARGET');
    expect(store.getActions()[2].type).toBe('CLOSE_API');

    done();
  });

  it('updateWorkoutTarget with error', async done => {
    putStub = sinon.stub(request, 'put').rejects();

    await store.dispatch(userDetails.updateWorkoutTarget({}));

    expect(putStub.calledOnce).toBe(true);
    expect(store.getActions()[0].type).toBe('INIT_API');
    expect(store.getActions()[1].type).toBe('CLOSE_API');

    done();
  });

  it('deleteWorkoutTarget without error', async done => {
    deleteStub = sinon.stub(request, 'delete').resolves({ data: {} });

    await store.dispatch(userDetails.deleteWorkoutTarget(1));

    expect(deleteStub.calledOnce).toBe(true);
    expect(store.getActions()[0].type).toBe('INIT_API');
    expect(store.getActions()[1].type).toBe('DELETE_WORKOUT_TARGET');
    expect(store.getActions()[2].type).toBe('CLOSE_API');

    done();
  });

  it('deleteWorkoutTarget with error', async done => {
    deleteStub = sinon.stub(request, 'delete').rejects();

    await store.dispatch(userDetails.deleteWorkoutTarget(1));

    expect(deleteStub.calledOnce).toBe(true);
    expect(store.getActions()[0].type).toBe('INIT_API');
    expect(store.getActions()[1].type).toBe('CLOSE_API');

    done();
  });

  it('initFetch without error', async done => {
    getStub = sinon.stub(request, 'get').resolves({ data: {} });

    await store.dispatch(userDetails.initFetch());

    expect(getStub.callCount).toBe(4);
    expect(store.getActions()[0].type).toBe('INIT_API');
    expect(store.getActions()[1].type).toBe('WRITE_KCAL_TARGETS');
    expect(store.getActions()[2].type).toBe('WRITE_WORKOUT_TARGETS');
    expect(store.getActions()[3].type).toBe('WRITE_USER_DETAILS');
    expect(store.getActions()[4].type).toBe('WRITE_LATEST');
    expect(store.getActions()[5].type).toBe('CLOSE_API');

    done();
  });

  it('initFetch with error', async done => {
    getStub = sinon.stub(request, 'get').rejects();

    await store.dispatch(userDetails.initFetch());

    expect(getStub.calledOnce).toBe(true);
    expect(store.getActions()[0].type).toBe('INIT_API');
    expect(store.getActions()[1].type).toBe('CLOSE_API');

    done();
  });

  it('updateUserDetails without error', async done => {
    putStub = sinon.stub(request, 'put').resolves({ data: {} });

    await store.dispatch(userDetails.updateUserDetails());

    expect(putStub.calledOnce).toBe(true);
    expect(store.getActions()[0].type).toBe('INIT_API');
    expect(store.getActions()[1].type).toBe('WRITE_USER_DETAILS');
    expect(store.getActions()[2].type).toBe('CLOSE_API');

    done();
  });

  it('updateUserDetails with error', async done => {
    putStub = sinon.stub(request, 'put').rejects();

    await store.dispatch(userDetails.updateUserDetails());

    expect(putStub.calledOnce).toBe(true);
    expect(store.getActions()[0].type).toBe('INIT_API');
    expect(store.getActions()[1].type).toBe('CLOSE_API');

    done();
  });
});
