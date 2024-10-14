import GlobalStyles from './styles/GlobalStyles'
import { ExpenseForm, ExpenseList } from './components'
import {ExpensesProvider} from './contexts/ExpensesContext'
import styled from 'styled-components';

const StyledContainer = styled.div`
  padding: 2rem;
  background-color: #999;
  min-height: 100vh;
  h1{
    font-size: clamp(1rem, 2.5vw, 2rem);
    font-weight: 700;
  }
`;

const StyledCalc = styled.div`
  background-color: white;
  border-radius: 5px;
  margin-top: 2rem;
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
