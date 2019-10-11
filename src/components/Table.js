import React from 'react';
import { Table } from 'antd';
import { format } from 'date-fns';

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
  },
  {
    title: 'Created',
    dataIndex: 'created',
    render: text => format(new Date(text), 'd/MM/yyyy'),
  },
  {
    title: 'Description',
    dataIndex: 'description',
  },
  {
    title: 'Notes',
    dataIndex: 'notes',
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
  },
  {
    title: 'Balance',
    dataIndex: 'balance',
  },
];

const StatementTable = props => {
  const { data, onSelectionChange } = props;
  const dataWithKeys = data.map(row => ({
    key: row.id,
    ...row,
  }));

  return (
    <Table
      rowSelection={{
        onChange: keys => onSelectionChange(keys),
      }}
      columns={columns}
      dataSource={dataWithKeys}
    />
  );
};

export default StatementTable;
