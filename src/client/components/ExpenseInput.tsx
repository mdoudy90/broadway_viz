const ExpenseInput = ({ handleEntry }) => {
  return (
    <input
      className='expense-input'
      type='number'
      placeholder='Enter weekly expense'
      onChange={handleEntry}
    />
  );
};

export default ExpenseInput;
