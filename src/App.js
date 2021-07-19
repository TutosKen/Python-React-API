import React,{ useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
// Components imports
import Form from './components/Form';
import TodoList from './components/TodoList';

const App = () => {
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [status, setStatus] = useState("all");
  var taskList = [];

  // Get todos from API
  const getTodos = () =>{
    axios.get("http://127.0.0.1:5000/getTasks")
    .then(response =>{
      if (response !== undefined && response.data !== null) {
        response.data.forEach(item => {taskList.push(item)});
        setIsLoading(false);
      }else{
        alert("Error trying to add todo");
      }
    })
    .catch(error => {
      alert(`Error ${error}`);
    });
  
    setTodos(taskList);
  }

  const filterHandler = () =>{
    switch (status) {
        case "completed":
            setFilteredTodos(todos.filter(todo => todo.completed === true));
            break;
        case "uncompleted":
            setFilteredTodos(todos.filter(todo => todo.completed === false));
            break;
    
        default:
            setFilteredTodos(todos);
            break;
    }
  }

  useEffect(() =>{
    getTodos();
  },[]);

  useEffect(() =>{
    filterHandler();
  },[todos,status]);

  return (
    <div>
      <header>
        <h1>Todos App</h1>
      </header>
      <Form 
      inputText={inputText} 
      setInputText={setInputText} 
      todos={todos} 
      setTodos={setTodos} 
      setStatus={setStatus}/>
      <TodoList todos={todos} setTodos={setTodos} filteredTodos={filteredTodos}/>
    </div>
  );
}

export default App;
