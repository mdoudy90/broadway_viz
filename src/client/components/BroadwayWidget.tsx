import { useState } from 'react';
import D3Visualization from './D3Visualization';

import data from '../../data/bway_test.json';
import processTotals from '../../utils/processTotals';
import InputCard from './InputCard';
import StatsCard from './StatsCard';
import LegendCard from './LegendCard';

const BroadwayWidget = () => {
  const [weeklyExpense, setWeeklyExpense] = useState(0);
  const [displayOptions, setDisplayOptions] = useState({
    showCumulativeTotal: true,
    showWeeklyTotal: true,
  });

  const handleExpenseEntry = (e) => {
    setWeeklyExpense(() => e.target.value);
  };

  const dimensions = {
    svgWidth: 480,
    svgHeight: 380,
    margin: { top: 30, right: 30, bottom: 30, left: 80 },
  };

  return (
    <div className='broadway-widget'>
      <D3Visualization
        data={processTotals(data, weeklyExpense)}
        dimensions={dimensions}
        displayOptions={displayOptions}
      />
      <InputCard handleEntry={handleExpenseEntry} />
      <StatsCard />
      <LegendCard
        displayOptions={displayOptions}
        setDisplayOptions={setDisplayOptions}
      />
    </div>
  );
};

export default BroadwayWidget;
