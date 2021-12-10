const processTotals = (data) => {
  data.sort((a, b) => a.show_week - b.show_week);

  let runningCumulative = 0;

  const totals = data.reduce((memo, row) => {
    const { show_week, sale_week, gross } = row;
    if (!(show_week in memo)) {
      memo[show_week] = { show_week, weeklyTotal: 0, cumulativeTotal: 0 };
    }

    runningCumulative += gross;
    memo[show_week].cumulativeTotal = runningCumulative;
    memo[show_week].weeklyTotal += gross;

    return memo;
  }, {});

  // each week
  // total gross
  // cumulative gross

  return totals;
};

export default processTotals;
