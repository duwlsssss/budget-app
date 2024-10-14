import React, { useState, useMemo, useRef, createContext, useContext, useCallback } from 'react';
import Alert from '../components/alert/Alert'
const ExpensesValueContext = createContext();
const ExpensesActionsContext = createContext();

const ExpensesProvider = ({ children }) => {
  const idRef = useRef(4);
  const [expenses, setExpenses] = useState([
    { id: 0, charge: '영화 관람료', amount: 15000 },
    { id: 1, charge: '식비', amount: 30000 },
    { id: 2, charge: '교통비', amount: 4000 },
  ]);
  const [alertMessage, setAlertMessage] = useState('');

  const MAX_CHARGE_LENGTH = 20; 
  const MAX_AMOUNT_LENGTH = 15; 

  // useCallback으로 handleInput이 ExpensesProvider가 리렌더링때마다 새로 만들어지는 거 막음
  // useCallback 안 쓰면 handleInput 사용하는 컴포넌트에서 매번 새로 handleInput이 생성되고 context의 값이 변경된 것으로 간주해 낭비 렌더링 발생함 
  const handleInput = useCallback((charge, amount, maxChargeLength, maxAmountLength, action) => {
    if (charge.trim() === '' || amount === '') {
      setAlertMessage('지출 항목과 금액을 모두 입력해주세요.');
      return;
    }
    if (charge.length > maxChargeLength) {
      setAlertMessage(`지출 항목은 최대 ${maxChargeLength}자로 입력해주세요`);
      return;
    }
    if (!charge.trim()) {
      setAlertMessage('지출 항목을 입력해주세요');
      return;
    }
    if (amount <= 0) {
      setAlertMessage(`금액은 양수로 입력해주세요`);
      return;
    }
    if (String(amount).length > maxAmountLength) {
      setAlertMessage(`금액은 최대 ${maxAmountLength}자리로 입력해주세요`);
      return;
    }
    if (!amount) {
      setAlertMessage('금액을 입력해주세요');
      return;
    }
    action();
  },[]);

  // useMemo로 actions 객체 안에 정의된 함수들이 재생성되지 않게 함
  const actions = useMemo(()=>({
    addExpense(charge,amount){
      handleInput(charge, amount, MAX_CHARGE_LENGTH, MAX_AMOUNT_LENGTH,()=>{
        const id = idRef.current;
        idRef.current+=1;
        setExpenses(prev=>[...prev,{id,charge,amount}]);
        setAlertMessage('지출 항목이 추가되었습니다.');
      });
    },
    editExpense(id, newCharge, newAmount) {
      handleInput(newCharge, newAmount, MAX_CHARGE_LENGTH, MAX_AMOUNT_LENGTH,()=>{
        setExpenses((prev) =>
          prev.map((expense) =>
            expense.id === id ? { ...expense, charge: newCharge, amount: newAmount } : expense
          )
        );
        setAlertMessage('지출 항목이 수정되었습니다.');
      });
    },
    deleteExpense(id){
      setExpenses(prev=>prev.filter((expense)=>expense.id!==id));
      setAlertMessage('지출 항목이 삭제되었습니다.');
    },
    deleteAll(){
      if(expenses.length===0){setAlertMessage('지출 항목이 없습니다.');}
      else{
        setExpenses([]);
        setAlertMessage('모든 지출 항목이 삭제되었습니다.');
      }
    },
  }),[handleInput]); //handleInput이 변하지 않으면, actions 안 함수들이 재생성되지 않고 기존에 메모이제이션된 함수를 그대로 사용함

  return (
    <ExpensesActionsContext.Provider value={actions}>
      <ExpensesValueContext.Provider value={expenses}>
        {children}
        <Alert message={alertMessage} onClose={() => setAlertMessage('')} /> 
      </ExpensesValueContext.Provider>
    </ExpensesActionsContext.Provider>
  );
};

function useExpensesValue() {
  const value = useContext(ExpensesValueContext);
  // Provider 컴포넌트로 감싸지 않았을때
  if (value === undefined) {
    throw new Error('useExpensesValue should be used within MyContext.Provider');
  }
  return value;
}

function useExpensesActions() {
  const value = useContext(ExpensesActionsContext);
  // Provider 컴포넌트로 감싸지 않았을때
  if (value === undefined) {
    throw new Error('useExpensesActions should be used within MyContext.Provider');
  }
  return value;
}

export {ExpensesProvider,useExpensesValue,useExpensesActions};
