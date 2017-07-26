import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import * as _ from 'lodash';

const mapToValueNamePair = props => path => ({
  value: props[path.name],
  name: path.name
});

const isUndefined = item => item.value === undefined;

const mapToName = item => item.name;

const mapToGetter = state => value => state.getIn(value.path);

const withDataCheck = (WrappedComponent, paths, ErrorComponent) => {
  const DataCheck = props => {
    const errors = _.map(
      _.filter(_.map(paths, mapToValueNamePair(props)), isUndefined),
      mapToName
    );
    return _.isEmpty(errors)
      ? <WrappedComponent />
      : <ErrorComponent errors={errors} />;
  };

  const mapStateToProps = state =>
    _.mapValues(_.keyBy(paths, 'name'), mapToGetter(state));

  return connect(mapStateToProps)(DataCheck);
};

export default withDataCheck;
