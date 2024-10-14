import React, { useState, useMemo, useRef, createContext, useContext, useCallback } from 'react';

const ExpensesValueContext = createContext();
const ExpensesActionsContext = createContext();

const ExpensesProvider = ({ children }) => {
  const idRef = useRef(4);
  const [expenses, setExpenses] = useState([
    { id: 0, charge: '영화 관람료', amount: 15000 },
    { id: 1, charge: '식비', amount: 30000 },
    { id: 2, charge: '교통비', amount: 4000 },
  ]);

  const MAX_CHARGE_LENGTH = 20; 
  const MAX_AMOUNT_LENGTH = 15; 

  // useCallback으로 handleInput이 ExpensesProvider가 리렌더링때마다 새로 만드는 거 막음
  // 없으면 새 함수 생성하고 useExpenses를 사용하는 컴포넌트에서 context의 값이 바뀐 것으로 간주해 낭비 렌더링 발생함 
  const handleInput = useCallback((charge, amount, maxChargeLength, maxAmountLength, action) => {
    if (charge.trim() === '' || amount === '') {
      alert('지출 항목과 금액을 모두 입력해주세요.');
      return;
    }
    if (charge.length > maxChargeLength) {
      alert(`지출 항목은 최대 ${maxChargeLength}자로 입력해주세요`);
      return;
    }
    if (!charge.trim()) {
      alert('지출 항목을 입력해주세요');
      return;
    }
    if (String(amount).length > maxAmountLength) {
      alert(`금액은 최대 ${maxAmountLength}자리로 입력해주세요`);
      return;
    }
    if (!amount) {
      alert('금액을 입력해주세요');
      return;
    }
    action();
  },[]);

  const actions = useMemo(()=>({
    addExpense(charge,amount){
      handleInput(charge, amount, MAX_CHARGE_LENGTH, MAX_AMOUNT_LENGTH,()=>{
        const id = idRef.current;
        idRef.current+=1;
        setExpenses(prev=>[...prev,{id,charge,amount}]);
      });
    },
    editExpense(id, newCharge, newAmount) {
      handleInput(newCharge, newAmount, MAX_CHARGE_LENGTH, MAX_AMOUNT_LENGTH,()=>{
        setExpenses((prev) =>
          prev.map((expense) =>
            expense.id === id ? { ...expense, charge: newCharge, amount: newAmount } : expense
          )
        );
      });
    },
    deleteExpense(id){
      setExpenses(prev=>prev.filter((expense)=>expense.id!==id));
    },
  }),[handleInput]);

  return (
    <ExpensesActionsContext.Provider value={actions}>
      <ExpensesValueContext.Provider value={expenses}>
        {children}
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
