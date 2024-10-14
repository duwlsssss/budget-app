import React, { useState } from 'react';
import { useExpensesActions } from '../../contexts/ExpensesContext';
import styles from './ExpenseForm.module.css';
import { IoAddCircleOutline } from "react-icons/io5";

export const ExpenseForm = () => {
  const {addExpense} = useExpensesActions();
  const [charge, setCharge] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addExpense(charge, amount);
    setCharge('');
    setAmount('');
  }
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
   <div className={styles.formContainer}>
      <h2>예상 지출 등록</h2>
       <form onSubmit={handleSubmit}>
        <div className={styles.charge}>
          지출 항목
          <input 
            type='text'
            value={charge}
            placeholder='지출 항목을 입력해주세요'
            onChange={(e) => setCharge(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div className={styles.amount}>
          비용
          <input 
            type='number'
            value={amount}
            placeholder='비용 입력해주세요'
            onChange={(e) => setAmount(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <button 
          className={styles.addBtn}
          type="submit"
        >
          <IoAddCircleOutline />
        </button>
      </form>
   </div>
  )
}
