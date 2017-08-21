import React from 'react';
import { connect } from 'react-redux';
import * as _ from 'lodash';

const mapToValueNamePair = props => path => ({
  value: props[path.name],
  name: path.name
});

//TODO: implement ErrorComponent internally
const withDataCheck = (WrappedComponent, paths, ErrorComponent, optional) => {
  const DataCheck = props => {
    const errors = _.map(
      _.filter(
        _.map(paths, mapToValueNamePair(props)),
        item => typeof item.value === 'undefined'
      ),
      item => item.name
    );

    if(optional){
      if(props[optional.name] === false){
        errors.push('optional.name')

      }
    }
    return _.isEmpty(errors) ? <WrappedComponent {...props}/> : <ErrorComponent />;
  };

  const mapStateToProps = paths => state => ({
    ..._.mapValues(_.keyBy(paths, 'name'), value => state.getIn(value.path) ),
    target: state.getIn(['userDetails', 'kcalTargets']).isEmpty
  });

  return connect(mapStateToProps(paths))(DataCheck);
};

export default withDataCheck;
