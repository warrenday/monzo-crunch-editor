import React, { useState } from 'react';
import { Button, Input } from 'antd';
import { getMonth, format } from 'date-fns';
import Papa from 'papaparse';
import Upload from './components/Upload';
import Table from './components/Table';
import MonthSelect from './components/MonthSelect';

const getRunningTotal = (rows, maxIndex) => {
  let total = 0;
  for (let i = 0; i < maxIndex + 1; i++) {
    total += Number(rows[i].amount);
  }
  return total;
};

const download = (filename, text) => {
  var element = document.createElement('a');
  element.setAttribute(
    'href',
    'data:text/plain;charset=utf-8,' + encodeURIComponent(text),
  );
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
};

const formatOutputForCrunch = tableData => {
  return tableData.map(row => ({
    Date: format(new Date(row.created), 'd/MM/yyyy'),
    Reference: row.description,
    'Paid In Paid Out': row.amount,
    Balance: row.balance,
  }));
};

function App() {
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const [startingBalance, setStartingBalance] = useState(0);
  const [statementData, setStatementData] = useState([]);

  const processedStatementData = statementData
    .filter(row => {
      return (
        selectedMonth === null ||
        selectedMonth === getMonth(new Date(row.created))
      );
    })
    .map((row, i, filteredData) => ({
      ...row,
      balance: getRunningTotal(filteredData, i) + startingBalance,
    }));

  // Handlers

  const handleDeleteSelectedRows = () => {
    setStatementData(
      statementData.filter(row => !selectedRows.includes(row.id)),
    );
    setSelectedRows([]);
  };

  const handleExport = () => {
    const today = format(new Date(), 'd/MM/yyyy');
    const formattedOutput = formatOutputForCrunch(processedStatementData);
    download(`crunch-statement-${today}.csv`, Papa.unparse(formattedOutput));
  };

  return (
    <div style={{ padding: 30 }}>
      <div style={{ display: 'flex', marginBottom: 30 }}>
        <div style={{ marginRight: 10 }}>
          <Upload onChange={setStatementData} />
        </div>
        <div style={{ marginRight: 10 }}>
          <Input
            prefix="£"
            suffix="GBP"
            placeholder="Starting Amount"
            type="number"
            onChange={e => setStartingBalance(Number(e.target.value))}
          />
        </div>
        <div style={{ marginRight: 10 }}>
          <MonthSelect onChange={setSelectedMonth} />
        </div>
        <div style={{ marginRight: 10, marginLeft: 'auto' }}>
          <Button onClick={handleExport}>Export for Crunch</Button>
        </div>
        <Button type="danger" onClick={handleDeleteSelectedRows}>
          Delete Selected
        </Button>
      </div>
      <Table
        data={processedStatementData}
        onSelectionChange={setSelectedRows}
      />
    </div>
  );
}

export default App;
