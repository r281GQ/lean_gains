import React from 'react';
import PropTypes from 'prop-types';
import {
  ToolbarGroup,
  ToolbarTitle,
  CircularProgress,
  RaisedButton
} from 'material-ui';

import withDataCheck from './../../containers/enhancers/with_data_check';

const requirements = [
  { name: 'target', path: ['userDetails', 'kcaltargets', 'waist'] },
  { name: 'dob', path: ['userDetails', 'dob'] },
  { name: 'sex', path: ['userDetails', 'sex'] },
  { name: 'waist', path: ['userDetails', 'latestMeasurements', 'waist'] },
  { name: 'rightArm', path: ['userDetails', 'latestMeasurements', 'rightArm'] },
  { name: 'chest', path: ['userDetails', 'latestMeasurements', 'chest'] },
  {
    name: 'belowBelly',
    path: ['userDetails', 'latestMeasurements', 'belowBelly']
  },
  { name: 'height', path: ['userDetails', 'latestMeasurements', 'height'] },
  {
    name: 'leftThigh',
    path: ['userDetails', 'latestMeasurements', 'leftThigh']
  },
  { name: 'hip', path: ['userDetails', 'latestMeasurements', 'hip'] },
  { name: 'leftArm', path: ['userDetails', 'latestMeasurements', 'leftArm'] },
  { name: 'belly', path: ['userDetails', 'latestMeasurements', 'belly'] },
  { name: 'weight', path: ['userDetails', 'latestMeasurements', 'weight'] },
  {
    name: 'aboveBelly',
    path: ['userDetails', 'latestMeasurements', 'aboveBelly']
  },
  {
    name: 'rightThigh',
    path: ['userDetails', 'latestMeasurements', 'rightThigh']
  },
  { name: 'neck', path: ['userDetails', 'latestMeasurements', 'neck'] }
];
const Macros = ({ todaysMacros, isFetching }) =>
  <ToolbarGroup>
    {isFetching
      ? <CircularProgress />
      : <ToolbarTitle
          style={{ color: '#EEEEEE' }}
          text={`Macros: ${todaysMacros.calorie} P: ${todaysMacros.protein} C: ${todaysMacros.carbohydrate} F: ${todaysMacros.fat}`}
        />}
  </ToolbarGroup>;

Macros.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  todaysMacros: PropTypes.shape({
    calorie: PropTypes.number.isRequired,
    protein: PropTypes.number.isRequired,
    carbohydrate: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired
  }).isRequired
};

// export default Macros;
export default withDataCheck(
  Macros,
  requirements,
  () =>
    <ToolbarGroup>
      <RaisedButton label="aint thtat goood" />
    </ToolbarGroup>,
  { name: 'target' }
);
