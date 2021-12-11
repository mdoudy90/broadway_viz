const processTotals = (data, weeklyExpense = 0) => {
  data.sort((a, b) => a.show_week - b.show_week);

  const totals = data.reduce((memo, row) => {
    const { show_week, sale_week, gross } = row;

    if (!(show_week in memo)) {
      memo[show_week] = { show_week, weeklyTotal: 0 };
    }
    memo[show_week].weeklyTotal += gross - weeklyExpense;

    return memo;
  }, {});

  let runningCumulative = 0;

  Object.keys(totals).map((key) => {
    runningCumulative += totals[key].weeklyTotal;
    totals[key].cumulativeTotal = runningCumulative;
  });

  // each week
  // total gross
  // cumulative gross

  return Object.values(totals);
};

export default processTotals;
