import { WRITE_SEARCH_RESULTS } from './../actions/kcal_action';
import { Map, List, fromJS } from 'immutable';

import * as _ from 'lodash';

const j = (state, payload) => {
  const r = _.map(payload, g => {
    let _id = g.tags.tag_id;
     let dz= _.omit(g, 'tags');
     dz._id = _id;
    return dz;
  })
  const z = _.keyBy( r, '_id')

  return state.update('searchResults', list => list.concat(fromJS(z)));
}

const kcal = (state = Map().set('searchResults', Map()), { type, payload }) => {
  switch (type) {
    case WRITE_SEARCH_RESULTS:
      return j(state, payload);
    default:
      return state;
  }
};

export default kcal;
