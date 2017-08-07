import React from 'react';
import PropTypes from 'prop-types';
import { CardHeader, FlatButton } from 'material-ui';

import styled from 'styled-components';

const Container = styled.div`
  margin-left: auto;
  margin-right: auto;
  padding: 0px;
  text-align: center;
  width: 50%;
`;

const CalorieTrackerSummary = ({ sum }) =>
  <Container>
    <FlatButton
      label={`Calories so far: ${sum.calories} P:${sum.protein} C: ${sum.carbohydrate} F: ${sum.fat}`}
      disabled
    />
  </Container>;

CalorieTrackerSummary.propTypes = {
  sum: PropTypes.shape({
    calories: PropTypes.number,
    protein: PropTypes.number,
    carbohydrate: PropTypes.number,
    fat: PropTypes.number
  })
};

export default CalorieTrackerSummary;
