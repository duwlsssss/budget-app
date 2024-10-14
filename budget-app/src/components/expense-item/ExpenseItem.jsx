import React,{ useState } from 'react';
import { useExpensesActions } from '../../contexts/ExpensesContext';
import styles from './ExpenseItem.module.css';
import { MdEdit, MdDelete, MdDone } from 'react-icons/md';

const ExpenseItem = ({ expense }) => {
  const {editExpense, deleteExpense} = useExpensesActions();

  const [isEditing, setIsEditing] = useState(false); 
  const [editCharge, setEditCharge] = useState(expense.charge);
  const [editAmount, setEditAmount] = useState(expense.amount);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
      e.preventDefault();
      editExpense(expense.id, editCharge, editAmount);
      setIsEditing(false);
      setEditCharge('');
      setEditAmount('');
    }
  };

  return(
    <li className={styles.itemContainer}>
      {isEditing ? (
        <div className={styles.editMode}>
          <input
            type="text"
            value={editCharge}
            onChange={(e) => setEditCharge(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <input
            type="number"
            value={editAmount}
            onChange={(e) => setEditAmount(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button onClick={() => {
            editExpense(expense.id, editCharge, editAmount)
            setIsEditing(false)
            }}
          >
            <MdDone />
          </button>
        </div>
      ) : (
        <div className={styles.info}>
          <span className={styles.charge}>{expense.charge}</span>
          <span className={styles.amount}>{expense.amount} 원</span>
        </div>
      )}
      <div className={styles.btnContainer}>
        <button className={styles.editBtn}
          onClick={()=>setIsEditing(!isEditing)}
        >
          <MdEdit />
        </button>  
        <button className={styles.deleteBtn}
          onClick={()=>deleteExpense(expense.id)}
        >
          <MdDelete />
        </button>  
      </div>
    </li>
  );
}

export default ExpenseItem;