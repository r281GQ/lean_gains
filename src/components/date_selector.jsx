import React from 'react';
import PropTypes from 'prop-types';
import { DropDownMenu, MenuItem } from 'material-ui';
import * as _ from 'lodash';

const renderMonths = months =>
  _.map(months, month =>
    <MenuItem key={month} value={month} primaryText={month} />
  );

const DateSelector = ({
  selectedMonth,
  fetchDataForSelectedMonth,
  setSelectedMonth,
  months
}) =>
  <DropDownMenu
    value={selectedMonth}
    onChange={(event, key, value) => {
      fetchDataForSelectedMonth(value);
      setSelectedMonth(value);
    }}
  >
    {renderMonths(months)}
  </DropDownMenu>;
  DateSelector.propTypes = {
    selectedMonth: PropTypes.string,
    fetchDataForSelectedMonth: PropTypes.func.isRequired,
    setSelectedMonth: PropTypes.func.isRequired,
    months: PropTypes.arrayOf(PropTypes.string)
  }

export default DateSelector;
