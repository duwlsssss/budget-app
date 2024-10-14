import GlobalStyles from './styles/GlobalStyles'
import { ExpenseForm, ExpenseList } from './components'
import {ExpensesProvider} from './contexts/ExpensesContext'
import styled from 'styled-components';

const StyledContainer = styled.div`
  padding: 3rem;
  background-color: #5aa5fa;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center; 
  align-items: center; 
  h1{
    color: white;
    font-size: clamp(1rem, 2.5vw, 2rem);
    font-weight: 700;
  }
`;

const StyledCalc = styled.div`
  background-color: white;
  border-radius: 10px;
  width: 50vw;
  margin-top: 1rem;
`;

function App() {
  return (
    <ExpensesProvider>
      <GlobalStyles />
      <StyledContainer>
        <h1>예산 계산기</h1>
        <StyledCalc>
          <ExpenseForm/>
          <ExpenseList/>
        </StyledCalc>
      </StyledContainer>
    </ExpensesProvider>
  )
}

export default App
