import './App.css';
import { createGlobalStyle } from 'styled-components';
import TodoTemplate from './component/TodoTemplate';
import TodoHead from './component/TodoHead';
import TodoList from './component/TodoList';
import TodoCreate from './component/TodoCreate';
import { TodoProvider } from './TodoContext';

//글로벌 스타일을 추가하고싶은 때
const GlobalStyle = createGlobalStyle`
  body{
    background: #e9ecef;
  }
`;

function App() {
  return (
    <TodoProvider>
      <GlobalStyle/>
      <TodoTemplate>
        <TodoHead></TodoHead>
        <TodoList></TodoList>
        <TodoCreate></TodoCreate>
      </TodoTemplate>
    </TodoProvider>
  );
}

export default App;
