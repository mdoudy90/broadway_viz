const StatsCard = ({ stats }) => {
  const { daysProfitable, daysSustainable, maxProfit } = stats;
  return (
    <div className='stats-card'>
      <div className='stats-card__stat'>
        <p>Days Profitable</p>
        <p>{daysProfitable}</p>
      </div>
      <div className='stats-card__stat'>
        <p>Days Sustainable</p>
        <p>{daysSustainable}</p>
      </div>
      <div className='stats-card__stat'>
        <p>Max Profit</p>
        <p>${Intl.NumberFormat().format(maxProfit)}</p>
      </div>
    </div>
  );
};

export default StatsCard;
