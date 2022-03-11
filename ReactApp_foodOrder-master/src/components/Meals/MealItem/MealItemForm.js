import classes from './MealItemForm.module.css';
import Input from '../../UI/Input';
import { useRef, useState } from 'react';
const MealItemForm = function (props) {
  const [isAmountValid, setIsAmountValid] = useState(true);
  const amountInputRef = useRef();

  const submitHandler = function (event) {
    event.preventDefault();

    const enteredAmount = amountInputRef.current.value;
    if (
      enteredAmount.trim().length === 0 ||
      +enteredAmount < 1 ||
      +enteredAmount > 5
    ) {
      setIsAmountValid(false);
      return;
    }

    props.onAddToCart(+enteredAmount);
    setIsAmountValid(true);
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={amountInputRef}
        label="Amount"
        input={{
          id: 'amount_' + props.id,
          type: 'number',
          min: '1',
          max: '5',
          step: '1',
          defaultValue: '1',
        }}
      />
      <button>+ Add</button>
      {!isAmountValid && <p>Please enter a valid amount (1-5).</p>}
    </form>
  );
};

export default MealItemForm;
