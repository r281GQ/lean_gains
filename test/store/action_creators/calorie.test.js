import sinon from 'sinon';
import axios from 'axios';
import createMockStore from 'redux-mock-store';
import * as reduxForm from 'redux-form/immutable';
import thunk from 'redux-thunk';
// import moment from 'moment';
import { fromJS } from 'immutable';

import { actionCreators } from './../../../src/store/index';
import request from './../../../src/services/request';

const { calorie } = actionCreators;
const store = createMockStore([thunk])(fromJS({}));

describe('calorie action creator', () => {
  let putStub;
  let postStub;
  let getStub;
  let initSpy;
  let arrayPushSpy;
  beforeEach(() => {});
  afterEach(() => {
    postStub ? postStub.restore() : undefined;
    putStub ? putStub.restore() : undefined;
    getStub ? getStub.restore() : undefined;
    initSpy ? initSpy.restore() : undefined;
    arrayPushSpy ? arrayPushSpy.restore() : undefined;
    store.clearActions();
  });
  it('updateCalorieLog without nextDay', async done => {
    putStub = sinon.stub(request, 'put').resolves({ data: { nutritions: {} } });
    getStub = sinon.stub(request, 'get').resolves();
    initSpy = sinon.stub(reduxForm, 'initialize');

    initSpy.callsFake(() => ({ type: 'INIT_FORM' }));
    await store.dispatch(calorie.updateCalorieLog());

    expect(putStub.calledOnce).toBe(true);
    expect(initSpy.calledOnce).toBe(true);
    expect(store.getActions()[0].type).toBe('INIT_API');
    expect(store.getActions()[1].type).toBe('INIT_FORM');
    expect(store.getActions()[2].type).toBe('CLOSE_CONSENT_MODAL');
    expect(store.getActions()[3].type).toBe('CLOSE_API');
    done();
  });

  it('updateCalorieLog with nextDay', async done => {
    putStub = sinon.stub(request, 'put').resolves({ data: { nutritions: {} } });
    getStub = sinon.stub(request, 'get').resolves({ data: { nutritions: {} } });
    initSpy = sinon.stub(reduxForm, 'initialize');

    initSpy.callsFake(() => ({ type: 'INIT_FORM' }));
    await store.dispatch(calorie.updateCalorieLog(null, null, 1));

    expect(putStub.calledOnce).toBe(true);
    expect(initSpy.calledOnce).toBe(true);
    expect(store.getActions()[0].type).toBe('INIT_API');
    expect(store.getActions()[1].type).toBe('INIT_FORM');
    expect(store.getActions()[2].type).toBe('SET_CALORIE_LOG_DAY');
    expect(store.getActions()[3].type).toBe('CLOSE_CONSENT_MODAL');
    expect(store.getActions()[4].type).toBe('CLOSE_API');
    done();
  });

  it('updateCalorieLog with error', async done => {
    putStub = sinon.stub(request, 'put').rejects();
    await store.dispatch(calorie.updateCalorieLog(null, null, 1));

    expect(putStub.calledOnce).toBe(true);
    expect(store.getActions()[0].type).toBe('INIT_API');
    expect(store.getActions()[1].type).toBe('CLOSE_API');
    done();
  });

  it('loadNutritionsForDay if not pristine', async done => {
    getStub = sinon.stub(request, 'get').resolves({ data: { nutritions: {} } });
    initSpy = sinon.stub(reduxForm, 'initialize');
    await store.dispatch(calorie.loadNutritionsForDay(null, false));
    expect(store.getActions()[0].type).toBe('OPEN_CONSENT_MODAL');
    done();
  });

  it('loadNutritionsForDay', async done => {
    getStub = sinon.stub(request, 'get').resolves({ data: { nutritions: {} } });
    initSpy = sinon.stub(reduxForm, 'initialize');
    initSpy.callsFake(() => ({ type: 'INIT_FORM' }));
    await store.dispatch(calorie.loadNutritionsForDay(null, true));
    expect(store.getActions()[0].type).toBe('INIT_API');
    expect(store.getActions()[1].type).toBe('SET_CALORIE_LOG_DAY');
    expect(store.getActions()[2].type).toBe('INIT_FORM');
    expect(store.getActions()[3].type).toBe('CLOSE_API');
    done();
  });

  it('search without errors', async done => {
    postStub = sinon.stub(axios, 'post').resolves({
      data: {
        foods: [
          {
            serving_weight_grams: 0,
            nf_protein: 0,
            food_name: 'apple',
            nf_total_carbohydrate: 0,
            serving_unit: 'gram',
            nf_total_fat: 0,
            alt_measures: [
              (0: {
                serving_weight: 242,
                measure: 'NLEA serving',
                seq: 7,
                qty: 1
              })
            ],
            photo: '',
            tags: 0,
            nf_calories: 0
          }
        ]
      }
    });
    arrayPushSpy = sinon.stub(reduxForm, 'arrayPush');
    arrayPushSpy.callsFake(() => ({ type: 'ARRAY_PUSH' }));
    await store.dispatch(calorie.search(''));
    expect(postStub.calledOnce).toBe(true);
    expect(store.getActions()[0].type).toBe('INIT_API');
    expect(store.getActions()[1].type).toBe('ARRAY_PUSH');
    expect(store.getActions()[2].type).toBe('CLOSE_API');
    done();
  });
});
