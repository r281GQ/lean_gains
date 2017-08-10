import React from 'react';
import styled from 'styled-components';
const dsd = styled.div`
position: relative;
`;
/*
 eslint-disable react/display-name
 */
import Footer from './footer'
const withFooter = (WrappedComponent) => {
  return () => {
    return <dsd><WrappedComponent/><Footer/></dsd>
  }
}

export default withFooter;
