import React from 'react';
import styled from 'styled-components';
import { FlatButton } from 'material-ui';
import SubmitButton from './submit_button';

const CenteredDiv = styled.div`text-align: center;`;

const CenteredSubmitButton = props =>
  <CenteredDiv>
    <SubmitButton {...props} />
  </CenteredDiv>;

export default CenteredSubmitButton;
