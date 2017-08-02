import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import * as _ from 'lodash';

const mapToValueNamePair = props => path => ({
  value: props[path.name],
  name: path.name
});

const withDataCheck = (WrappedComponent, paths, ErrorComponent) => {
  const DataCheck = props => {
    const errors = _.map(
      _.filter(
        _.map(paths, mapToValueNamePair(props)),
        item => typeof item.value === 'undefined'
      ),
      item => item.name
    );
    return _.isEmpty(errors)
      ? <WrappedComponent />
      : <ErrorComponent errors={errors} />;
  };

  const mapStateToProps = state =>
    _.mapValues(_.keyBy(paths, 'name'), value => state.getIn(value.path));

  return connect(mapStateToProps)(DataCheck);
};

export default withDataCheck;