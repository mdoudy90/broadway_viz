import Switch from '@mui/material/Switch';

const LegendCard = ({ displayOptions, setDisplayOptions }) => {
  const { showCumulativeTotal, showWeeklyTotal } = displayOptions;

  return (
    <div className='legend-card'>
      <div className='legend-card__toggle legend-card--cum-total'>
        <p>Cumulative Total</p>
        <Switch
          checked={showCumulativeTotal}
          onChange={() => {
            setDisplayOptions((options) => ({
              ...options,
              showCumulativeTotal: !options.showCumulativeTotal,
            }));
          }}
        />
      </div>
      <div className='legend-card__toggle legend-card--week-total'>
        <p>Weekly Total</p>
        <Switch
          checked={showWeeklyTotal}
          onChange={() => {
            setDisplayOptions((options) => ({
              ...options,
              showWeeklyTotal: !options.showWeeklyTotal,
            }));
          }}
        />
      </div>
    </div>
  );
};

export default LegendCard;
