import React from 'react';
import { shallow } from 'enzyme';
import BodyFatField from './../../../src/components/calorie_target/body_fat_field';

describe('BodyFatField test', () => {
  it('should render', () => {
    const component = shallow(
      <BodyFatField bmrCalculationMethod="katch-mcardle" />
    );
    expect(component).toHaveLength(1);
    expect(component).toMatchSnapshot();
  });
});
