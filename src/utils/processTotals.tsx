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

  const stats = {
    daysProfitable: Object.keys(totals).length,
    daysSustainable: Object.keys(totals).length,
    maxProfit: 0,
  };

  let runningCumulative = 0;
  let zeroOut = false;

  Object.keys(totals).map((key) => {
    runningCumulative +=
      (zeroOut ? 0 : totals[key].weeklyTotal) - weeklyExpense;
    totals[key].cumulativeTotal = runningCumulative;
    stats.maxProfit = Math.max(stats.maxProfit, runningCumulative);

    totals[key].weeklyTotal -= weeklyExpense;

    if (
      totals[key].cumulativeTotal < 0 &&
      stats.daysSustainable === Object.keys(totals).length
    ) {
      stats.daysSustainable = totals[key].show_week - 1;
    }

    if (totals[key].weeklyTotal < 0 && !zeroOut) {
      stats.daysProfitable = totals[key].show_week - 1;
      totals[key].weeklyTotal = 0;
      zeroOut = true;
    }

    // zero out all values following a negative
    if (zeroOut) {
      totals[key].weeklyTotal = 0;
    }
  });

  return { processedTotals: Object.values(totals), processedStats: stats };
};

export default processTotals;
