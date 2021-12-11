const processTotals = (data, weeklyExpense = 0) => {
  data.sort((a, b) => a.show_week - b.show_week);

  const totals = data.reduce((memo, row) => {
    const { show_week, sale_week, gross } = row;

    if (!(show_week in memo)) {
      memo[show_week] = { show_week, weeklyTotal: 0, cumulativeTotal: 0 };
    }
    memo[show_week].weeklyTotal += gross;

    return memo;
  }, {});

  let runningCumulative = 0;
  let zeroOut = false;

  Object.keys(totals).map((key) => {
    runningCumulative +=
      (zeroOut ? 0 : totals[key].weeklyTotal) - weeklyExpense;
    totals[key].cumulativeTotal = runningCumulative;

    totals[key].weeklyTotal -= weeklyExpense;

    // zero out all values following a negative
    if (totals[key].weeklyTotal < 0 || zeroOut) {
      totals[key].weeklyTotal = 0;
      zeroOut = true;
    }
  });

  return Object.values(totals);
};

export default processTotals;
