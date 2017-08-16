import React from 'react';
import { Paper, IconButton, FontIcon } from 'material-ui';

const FooterContainer = () =>
  <div className="footer-container">
    <Paper
      className="footer-paper"
      style={{ backgroundColor: '#E0E0E0' }}
      zDepth={2}
    >
      <IconButton
        target="_blank"
        href="https://endrevegh.wordpress.com/"
        tooltipPosition="top-center"
        tooltip="WordPress"
      >
        <FontIcon className="fa fa-wordpress" />
      </IconButton>
      <IconButton
        target="_blank"
        href="https://github.com/r281GQ/lean_gains"
        tooltipPosition="top-center"
        tooltip="GitHub"
      >
        <FontIcon className="fa fa-github" />
      </IconButton>
    </Paper>
  </div>;

export default FooterContainer;
