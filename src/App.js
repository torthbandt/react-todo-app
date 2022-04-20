import React, {useState, useEffect} from 'react';
import './App.css';
import Form from './components/Form'
import TodoList from './components/TodoList'

function App() {
  // State stuff
  const [inputText, setInputText] = useState ('');
  const [todos, setTodos] = useState ([]);
  const [status, setStatus] = useState('all');
  const [filteredTodos, setFilteredTodos] = useState([]);

  // Use once
  useEffect(() => {
    getLocalTodos();
  }, []);

  // Use Effect 
  useEffect(() => {
    const filterHandler = () => {
      switch(status) {
        case 'completed': 
          setFilteredTodos(todos.filter(todo => todo.completed === true));
        break;
        case 'uncompleted':
          setFilteredTodos(todos.filter(todo => todo.completed === false))
          break;
        default:
          setFilteredTodos(todos);
          break;
      }
    };
    filterHandler();
    saveLocalTodos();
  }, [todos, status]);

  // functions
  
  // Save to local storage
  const saveLocalTodos = () => {
    localStorage.setItem('todos', JSON.stringify(todos));
  };

  // Get local storage
  const getLocalTodos = () => {
    if(localStorage.getItem('todos') === null) {
      localStorage.setItem('todos', JSON.stringify([]));
    } else {
      const todoLocal = JSON.parse(localStorage.getItem('todos'));
      setTodos(todoLocal);
    }
  };
  
  return (
    <div className="App">
      <header>
        <h1>Our Todo List</h1>
      </header>
      <Form 
        inputText={inputText} 
        todos={todos} 
        setTodos={setTodos} 
        setInputText={setInputText} 
        setStatus={setStatus}
      />
      <TodoList 
        filteredTodos={filteredTodos} 
        setTodos={setTodos} 
        todos={todos} 
      />
    </div>
  );
}

export default App;
