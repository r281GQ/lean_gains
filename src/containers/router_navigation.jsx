import React from 'react';
import { connect } from 'react-redux';
import { IconButton } from 'material-ui';
import { goBack, goForward } from 'react-router-redux';
import { withRouter } from 'react-router';
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import ArrowForward from 'material-ui/svg-icons/navigation/arrow-forward';

//TODO: implement conditionals (epics ? sagas?)
class RouterNavigation extends React.Component {
  componentWillReceiveProps(nextProps) {}

  render() {
    return (
      <div>
        <IconButton onTouchTap={() => this.props.goBack()} tooltip={`Go back`}>
          <ArrowBack color="white" />
        </IconButton>
        <IconButton
          onTouchTap={() => this.props.goForward()}
          tooltip={`Go forward`}
        >
          <ArrowForward color="white" />
        </IconButton>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    goBack: () => dispatch(goBack()),
    goForward: () => dispatch(goForward())
  };
};

export default connect(null, mapDispatchToProps)(withRouter(RouterNavigation));
