import sinon from 'sinon';
import createMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { fromJS } from 'immutable';

import { actionCreators } from './../../../src/store/index';
import request from './../../../src/services/request';

const { workoutLog } = actionCreators;
const store = createMockStore([thunk])(fromJS({}));

describe('workoutLogs', () => {
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

  it('createWorkoutLog without error', async done => {
    postStub = sinon.stub(request, 'post').resolves({ data: {} });

    await store.dispatch(workoutLog.createWorkoutLog({}));
    expect(postStub.calledOnce).toBe(true);
    expect(store.getActions()[0].type).toBe('INIT_API');
    expect(store.getActions()[1].type).toBe('WRITE_WORKOUT_LOG');
    expect(store.getActions()[2].type).toBe('WRITE_WORKOUT_LOG_DATE');
    expect(store.getActions()[3].type).toBe('CLOSE_API');
    done();
  });

  it('createWorkoutLog with error', async done => {
    postStub = sinon.stub(request, 'post').rejects();

    await store.dispatch(workoutLog.createWorkoutLog({}));
    expect(postStub.calledOnce).toBe(true);
    expect(store.getActions()[0].type).toBe('INIT_API');
    expect(store.getActions()[1].type).toBe('CLOSE_API');
    done();
  });

  it('getWorkoutLogsForMonth without error', async done => {
    getStub = sinon.stub(request, 'get').resolves({ data: { createdAt: 0 } });

    await store.dispatch(workoutLog.getWorkoutLogsForMonth({}));
    expect(getStub.calledOnce).toBe(true);
    expect(store.getActions()[0].type).toBe('INIT_API');
    expect(store.getActions()[1].type).toBe('WRITE_WORKOUT_LOGS');
    expect(store.getActions()[2].type).toBe('CLOSE_API');
    done();
  });

  it('getWorkoutLogsForMonth with error', async done => {
    getStub = sinon.stub(request, 'get').rejects();

    await store.dispatch(workoutLog.getWorkoutLogsForMonth({}));
    expect(getStub.calledOnce).toBe(true);
    expect(store.getActions()[0].type).toBe('INIT_API');
    expect(store.getActions()[1].type).toBe('CLOSE_API');
    done();
  });

  it('getWorkoutLogDates without error', async done => {
    getStub = sinon.stub(request, 'get').resolves({ data: { createdAt: 0 } });

    await store.dispatch(workoutLog.getWorkoutLogDates({}));
    expect(getStub.calledOnce).toBe(true);
    expect(store.getActions()[0].type).toBe('INIT_API');
    expect(store.getActions()[1].type).toBe('WRITE_WORKOUT_LOG_DATES');
    expect(store.getActions()[2].type).toBe('CLOSE_API');
    done();
  });

  it('getWorkoutLogDates with error', async done => {
    getStub = sinon.stub(request, 'get').rejects();

    await store.dispatch(workoutLog.getWorkoutLogDates({}));
    expect(getStub.calledOnce).toBe(true);
    expect(store.getActions()[0].type).toBe('INIT_API');
    expect(store.getActions()[1].type).toBe('CLOSE_API');
    done();
  });

  it('updateWorkoutLog without error', async done => {
    putStub = sinon.stub(request, 'put').resolves({ data: { createdAt: 0 } });
    // getStub = sinon.stub(request, 'get').resolves({ data: { createdAt: 0 } });

    await store.dispatch(workoutLog.updateWorkoutLog({}));
    expect(putStub.calledOnce).toBe(true);
    // expect(getStub.calledOnce).toBe(true);
    expect(store.getActions()[0].type).toBe('INIT_API');
    expect(store.getActions()[1].type).toBe('WRITE_WORKOUT_LOG');
    expect(store.getActions()[2].type).toBe('CLOSE_API');
    done();
  });

  it('updateWorkoutLog with error', async done => {
    putStub = sinon.stub(request, 'put').rejects();

    await store.dispatch(workoutLog.updateWorkoutLog({}));
    expect(putStub.calledOnce).toBe(true);
    expect(store.getActions()[0].type).toBe('INIT_API');
    expect(store.getActions()[1].type).toBe('CLOSE_API');
    done();
  });

  it('deleteWorkoutLog without error', async done => {
    deleteStub = sinon
      .stub(request, 'delete')
      .resolves({ data: { createdAt: 0 } });

    await store.dispatch(workoutLog.deleteWorkoutLog(2));
    expect(deleteStub.calledOnce).toBe(true);
    expect(store.getActions()[0].type).toBe('INIT_API');
    expect(store.getActions()[1].type).toBe('DELETE_WORKOUT_LOG_DATE');
    expect(store.getActions()[2].type).toBe('DELETE_WORKOUT_LOG');
    expect(store.getActions()[3].type).toBe('CLOSE_API');
    done();
  });

  it('deleteWorkoutLog with error', async done => {
    deleteStub = sinon.stub(request, 'delete').rejects();

    await store.dispatch(workoutLog.deleteWorkoutLog(2));
    expect(deleteStub.calledOnce).toBe(true);
    expect(store.getActions()[0].type).toBe('INIT_API');
    expect(store.getActions()[1].type).toBe('CLOSE_API');
    done();
  });
});
