import { useState, useEffect } from 'react';

import data from '../../data/bway_test.json';
import processTotals from '../../utils/processTotals';
import Chart from './Chart';
import ExpenseInput from './ExpenseInput';

// some input for fixed weekly expenses

const Visualization = () => {
  const [weeklyExpense, setWeeklyExpense] = useState(0);
  console.log(processTotals(data));

  const handleExpenseEntry = (e) => {
    setWeeklyExpense(() => e.target.value || 0);
  };

  return (
    <div className='visualization'>
      <Chart />
      <ExpenseInput handleEntry={handleExpenseEntry} />
    </div>
  );
};

export default Visualization;
