import React, {useEffect} from 'react';
import { useExpensesValue } from '../../contexts/ExpensesContext';
import ExpenseItem from '../expense-item/ExpenseItem';
import styles from './ExpenseList.module.css';

export const ExpenseList = () => {
  const expenses = useExpensesValue();

  // expenses 바뀌는 거 확인
  useEffect(() => {
    console.log('expenses changed',expenses);
  },[expenses]);

  return(
    <div className={styles.listContainer}>
      <h2>Expense List</h2>
      {expenses?.map(expense=>(
        <ExpenseItem 
          key={expense.id}
          expense={expense}
        />
      ))}
    </div>
  );
}