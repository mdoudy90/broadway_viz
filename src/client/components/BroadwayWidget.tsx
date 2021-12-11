import { useState, useEffect } from 'react';

import data from '../../data/bway_test.json';
import processTotals from '../../utils/processTotals';
import D3Visualization from './D3Visualization';
import InputCard from './InputCard';
import StatsCard from './StatsCard';
import LegendCard from './LegendCard';

const BroadwayWidget = () => {
  const [weeklyExpense, setWeeklyExpense] = useState(0);
  const [totals, setTotals] = useState([]);
  const [stats, setStats] = useState({});
  const [displayOptions, setDisplayOptions] = useState({
    showCumulativeTotal: true,
    showWeeklyTotal: true,
  });

  useEffect(() => {
    const { processedTotals, processedStats } = processTotals(
      data,
      weeklyExpense
    );
    setTotals(processedTotals);
    setStats(processedStats);
  }, [data, weeklyExpense]);

  const handleExpenseEntry = (e) => {
    setWeeklyExpense(() => e.target.value);
  };

  return (
    <div className='broadway-widget'>
      <D3Visualization data={totals} displayOptions={displayOptions} />
      <InputCard handleEntry={handleExpenseEntry} />
      <StatsCard stats={stats} />
      <LegendCard
        displayOptions={displayOptions}
        setDisplayOptions={setDisplayOptions}
      />
    </div>
  );
};

export default BroadwayWidget;
