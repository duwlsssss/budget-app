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
    }
  };

  return(
    <li className={styles.itemContainer}>
      {isEditing ? (
        <div className={styles.editMode}>
          <div className={styles.edit}>
              <input
                type="text"
                value={editCharge}
                onChange={(e) => setEditCharge(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder='지출 항목'
              />
              <input
                type="number"
                value={editAmount}
                onChange={(e) => setEditAmount(e.target.value)}
                onKeyDown={handleKeyDown}
                 placeholder='비용'
              />
          </div>
          <div className={styles.btnContainer}>
            <button 
              className={styles.doneBtn}
              onClick={() => {
                editExpense(expense.id, editCharge, editAmount)
                setIsEditing(false)
                }}
            >
              <MdDone />
            </button> 
          </div>
        </div>
      ) : (
        <div className={styles.infoMode}>
          <div className={styles.info}>
            <div className={styles.charge}>{expense.charge}</div>
            <div className={styles.amount}>{expense.amount} 원</div>
          </div>
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
        </div>
      )}
      <hr/>
    </li>
  );
}

export default ExpenseItem;