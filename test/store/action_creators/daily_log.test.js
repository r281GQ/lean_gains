import sinon from 'sinon';
import createMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { fromJS } from 'immutable';

import { actionCreators } from './../../../src/store/index';
import request from './../../../src/services/request';

const { dailyLog } = actionCreators;
const store = createMockStore([thunk])(fromJS({}));

describe('dailyLogs', () => {
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

  it('createDailyLog without error', async done => {
    getStub = sinon.stub(request, 'get').resolves({ data: { createdAt: 0 } });
    postStub = sinon.stub(request, 'post').resolves({ data: {} });

    await store.dispatch(dailyLog.createDailyLog({}));
    expect(getStub.calledOnce).toBe(true);
    expect(postStub.calledOnce).toBe(true);
    expect(store.getActions()[0].type).toBe('INIT_API');
    expect(store.getActions()[1].type).toBe('WRITE_DAILY_LOG');
    expect(store.getActions()[2].type).toBe('WRITE_DAILY_LOG_DATE');
    expect(store.getActions()[3].type).toBe('WRITE_LATEST');
    expect(store.getActions()[4].type).toBe('CLOSE_API');
    done();
  });

  it('createDailyLog with error', async done => {
    postStub = sinon.stub(request, 'post').rejects();

    await store.dispatch(dailyLog.createDailyLog({}));
    expect(postStub.calledOnce).toBe(true);
    expect(store.getActions()[0].type).toBe('INIT_API');
    expect(store.getActions()[1].type).toBe('CLOSE_API');
    done();
  });

  it('getLogsForSelectedMonth without error', async done => {
    getStub = sinon.stub(request, 'get').resolves({ data: { createdAt: 0 } });

    await store.dispatch(dailyLog.getLogsForSelectedMonth({}));
    expect(getStub.calledOnce).toBe(true);
    expect(store.getActions()[0].type).toBe('INIT_API');
    expect(store.getActions()[1].type).toBe('WRITE_DAILY_LOGS');
    expect(store.getActions()[2].type).toBe('CLOSE_API');
    done();
  });

  it('getLogsForSelectedMonth with error', async done => {
    getStub = sinon.stub(request, 'get').rejects();

    await store.dispatch(dailyLog.getLogsForSelectedMonth({}));
    expect(getStub.calledOnce).toBe(true);
    expect(store.getActions()[0].type).toBe('INIT_API');
    expect(store.getActions()[1].type).toBe('CLOSE_API');
    done();
  });

  it('getDailyLogDates without error', async done => {
    getStub = sinon.stub(request, 'get').resolves({ data: { createdAt: 0 } });

    await store.dispatch(dailyLog.getDailyLogDates({}));
    expect(getStub.calledOnce).toBe(true);
    expect(store.getActions()[0].type).toBe('INIT_API');
    expect(store.getActions()[1].type).toBe('WRITE_DAILY_LOG_DATES');
    expect(store.getActions()[2].type).toBe('CLOSE_API');
    done();
  });

  it('getDailyLogDates with error', async done => {
    getStub = sinon.stub(request, 'get').rejects();

    await store.dispatch(dailyLog.getDailyLogDates({}));
    expect(getStub.calledOnce).toBe(true);
    expect(store.getActions()[0].type).toBe('INIT_API');
    expect(store.getActions()[1].type).toBe('CLOSE_API');
    done();
  });

  it('updateDailyLog without error', async done => {
    putStub = sinon.stub(request, 'put').resolves({ data: { createdAt: 0 } });
    getStub = sinon.stub(request, 'get').resolves({ data: { createdAt: 0 } });

    await store.dispatch(dailyLog.updateDailyLog({}));
    expect(putStub.calledOnce).toBe(true);
    expect(getStub.calledOnce).toBe(true);
    expect(store.getActions()[0].type).toBe('INIT_API');
    expect(store.getActions()[1].type).toBe('WRITE_DAILY_LOG');
    expect(store.getActions()[2].type).toBe('WRITE_LATEST');
    expect(store.getActions()[3].type).toBe('CLOSE_API');
    done();
  });

  it('updateDailyLog with error', async done => {
    putStub = sinon.stub(request, 'put').rejects();

    await store.dispatch(dailyLog.updateDailyLog({}));
    expect(putStub.calledOnce).toBe(true);
    expect(store.getActions()[0].type).toBe('INIT_API');
    expect(store.getActions()[1].type).toBe('CLOSE_API');
    done();
  });

  it('deleteDailyLog without error', async done => {
    deleteStub = sinon
      .stub(request, 'delete')
      .resolves({ data: { createdAt: 0 } });
    getStub = sinon.stub(request, 'get').resolves({ data: { createdAt: 0 } });

    await store.dispatch(dailyLog.deleteDailyLog(2));
    expect(deleteStub.calledOnce).toBe(true);
    expect(getStub.calledOnce).toBe(true);
    expect(store.getActions()[0].type).toBe('INIT_API');
    expect(store.getActions()[1].type).toBe('DELETE_DAILY_LOG_DATE');
    expect(store.getActions()[2].type).toBe('DELETE_DAILY_LOG');
    expect(store.getActions()[3].type).toBe('WRITE_LATEST');
    expect(store.getActions()[4].type).toBe('CLOSE_API');
    done();
  });

  it('deleteDailyLog with error', async done => {
    deleteStub = sinon
      .stub(request, 'delete')
      .rejects();

    await store.dispatch(dailyLog.deleteDailyLog(2));
    expect(deleteStub.calledOnce).toBe(true);
    expect(store.getActions()[0].type).toBe('INIT_API');
    expect(store.getActions()[1].type).toBe('CLOSE_API');
    done();
  });
});
