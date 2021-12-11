const StatsCard = ({}) => {
  const [daysProfitable, daysSustainable, maxProfit] = [14, 18, 43200230];
  // TODO - Gather above data

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
        <p>{maxProfit}</p>
      </div>
    </div>
  );
};

export default StatsCard;
