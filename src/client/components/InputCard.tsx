const InputCard = ({ handleEntry }) => {
  return (
    <div className='input-card'>
      <div className='input-card__expense-input'>
        <p>Weekly Expense</p>
        <input type='number' placeholder='--' onChange={handleEntry} />
      </div>
    </div>
  );
};

export default InputCard;
