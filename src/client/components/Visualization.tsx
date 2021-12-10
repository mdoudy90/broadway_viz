import { useState, useEffect } from 'react';
import D3BarChart from './D3BarChart';

import data from '../../data/bway_test.json';
import processTotals from '../../utils/processTotals';
import Chart from './Chart';
import ExpenseInput from './ExpenseInput';

// some input for fixed weekly expenses

const Visualization = () => {
  const [weeklyExpense, setWeeklyExpense] = useState(0);
  // console.log(processTotals(data));

  const handleExpenseEntry = (e) => {
    setWeeklyExpense(() => e.target.value || 0);
  };

  const dimensions = {
    width: 460,
    height: 400,
    margin: { top: 30, right: 30, bottom: 70, left: 60 },
  };

  return (
    // <div className='visualization'>
    <D3BarChart
      data={Object.values(processTotals(data))}
      dimensions={dimensions}
    />
    //   <Chart />
    //   <ExpenseInput handleEntry={handleExpenseEntry} />
    // </div>
  );
};

export default Visualization;

// import schc from "./SCHC.json";
// import vcit from "./VCIT.json";
// import portfolio from "./PORTFOLIO.json";

// const portfolioData = { name: "Portfolio", color: "#ffffff", items: portfolio };
// const schcData = { name: "SCHC", color: "#d53e4f", items: schc };
// const vcitData = { name: "VCIT", color: "#5e4fa2", items: vcit };
// const dimensions = {
//   width: 600,
//   height: 300,
//   margin: { top: 30, right: 30, bottom: 30, left: 60 }
// };

// export default function Visualization() {
//   return <D3BarChart />;
// }
//   <div className="App">
//     <MultilineChart
// data={[portfolioData, schcData, vcitData]}
// dimensions={dimensions}
//     />
