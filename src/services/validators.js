import * as _ from 'lodash';

const required = message => value => (!value  ? message : undefined);

const unlessItsAbovezero = value =>
  _.isNumber(value) && value > 0 ? value : 0.1;

export {required, unlessItsAbovezero};