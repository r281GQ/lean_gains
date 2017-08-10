import React from 'react';
import styled from 'styled-components';
import { Paper } from 'material-ui';
import FontIcon from 'material-ui/FontIcon';
import { IconButton } from 'material-ui';

// const Footer1 = styled.div`
// clear: both;
//    position: absolute ;
//    bottom: 0;
//    z-index: 10;
//    height: 3em;
//    margin-top: -3em;
// `;

const Footer1 = styled.div`
  position: absolute;
  bottom: 0px;
  width: 100%;
  padding: 0px;
  margin: 0px;
height: 48px,
  border: 0px;
  left: 0px;
  box-sizing: border-box;
`;
// height: 50,
const style = {
  height: '100%',

  width: '100%',
  margin: 10,
  padding: 0,
  border: 0,
  marginLeft: 'auto',
  marginRight: 'auto',

  textAlign: 'center',
  display: 'inline-block'
};

const P = styled(Paper)`

`;

const Footer = () =>
  <Footer1>
    <Paper style={style} zDepth={1}>
      <IconButton
        tooltip="top-center"
        tooltipPosition="top-center"
        iconStyle={{ padding: 0, margin: 0, top: 0 }}
        tooltip="WordPress"

      >
        <FontIcon className="fa fa-wordpress" />
      </IconButton>
      <a target="_blank" href="https://github.com/r281GQ/lean_gains">
        <IconButton
          tooltip="top-center"
          tooltipPosition="top-center"
          iconStyle={{ padding: 0, margin: 0, top: 0 }}
          tooltip="GitHub"
        >
          <FontIcon className="fa fa-github" />
        </IconButton>
      </a>
    </Paper>
  </Footer1>;

export default Footer;
