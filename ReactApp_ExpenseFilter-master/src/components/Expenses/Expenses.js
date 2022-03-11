import { useState } from 'react';
import Card from '../UI/Card';
import ExpensesFilter from './ExpenseFilter/ExpenseFilter';
import ExpenseList from './ExpensesList';
import ExpensesChart from './ExpensesChart';
import './Expenses.css';

function Expenses(props) {
  const [selectedYear, setSelectedYear] = useState('2021');
  const filterChangeHandler = function (selectedYear) {
    setSelectedYear(selectedYear);
  };

  const filteredExpeses = props.expenses.filter((expense) => {
    return expense.date.getFullYear().toString() === selectedYear;
  });

  return (
    <div>
      <Card className="expenses">
        <ExpensesFilter
          selectedYear={selectedYear}
          onChangeFilter={filterChangeHandler}
        />
        <ExpensesChart expenses={filteredExpeses} />
        <ExpenseList expenses={filteredExpeses} />
      </Card>
    </div>
  );
}

export default Expenses;
