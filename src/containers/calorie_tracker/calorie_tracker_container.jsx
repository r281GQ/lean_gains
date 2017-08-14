import React from 'react';
import CalorieTracker from './kcal_tracker';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { FlatButton, Dialog } from 'material-ui';

import CalorieLogContainer from './calorie_log_container';

const Container = styled.div`
  margin-left: auto;
  margin-right: auto;
  padding: 0px;
  text-align: center;
  width: 100%;
`;

const Contianer = styled.div`clear: both;`;

const MainField = styled.div`
  float: left;
  width: 66%;
`;

const SideField = styled.div`
  float: right;
  width: 33%;
`;
const CalorieTrackerContainer = () => {
  return (
    <Contianer>
      <MainField>
        <CalorieTracker />
      </MainField>
      <SideField>
        <Container>
          {' '}<FlatButton
            label={`Here you can see and edit the already consumed nutritions`}
            disabled
          />{' '}
        </Container>

        <CalorieLogContainer />
      </SideField>
      <Contianer />
    </Contianer>
  );
};

export default CalorieTrackerContainer;
