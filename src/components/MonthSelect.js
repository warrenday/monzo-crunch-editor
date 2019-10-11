import React from 'react';
import { Select } from 'antd';

const { Option } = Select;

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const MonthSelect = props => {
  const { onChange } = props;
  return (
    <Select style={{ width: 120 }} onChange={onChange} placeholder="Month...">
      {months.map((month, i) => (
        <Option value={i}>{month}</Option>
      ))}
    </Select>
  );
};

export default MonthSelect;
