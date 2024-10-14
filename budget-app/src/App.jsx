import GlobalStyles from './styles/GlobalStyles'
import { ExpenseForm, ExpenseList } from './components'
import {ExpensesProvider} from './contexts/ExpensesContext'

function App() {
  return (
    <ExpensesProvider>
      <GlobalStyles />
      <h1>예산 계산기</h1>
      <ExpenseForm/>
      <ExpenseList/>
    </ExpensesProvider>
  )
}

export default App
