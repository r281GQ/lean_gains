import React, { Component } from 'react';

export default loadComponent =>
  class AsyncContainer extends Component {
    constructor(props) {
      super(props);
      this.state = { component: null };
    }

    componentWillMount() {
      if (!this.state.component)
        loadComponent().then(component => this.setState({ component }));
    }

    render() {
      return this.state.component
        ? <this.state.component {...this.props} />
        : null;
    }
  };
