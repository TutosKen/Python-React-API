import React from 'react'
import axios from 'axios';

const Form = ({inputText, setInputText, setTodos, todos, setStatus}) =>{

    const inputTextHandler = (e) =>{
        setInputText(e.target.value);
    }

    const submitFormHandler = (e) =>{
        e.preventDefault();
        let taskList = [];

        // Adding todo to API
        axios.post("http://127.0.0.1:5000/addTask",{name: inputText})
        .then(response =>{
            console.log(response.data);
            setTodos([
                ...todos, {name:inputText, id: response.data, completed: false}
            ]);
        })
        .catch(error =>{
            console.log(error);
        });
        
        setInputText("");
    }

    const filterTodosHandler = (e) =>{
        setStatus(e.target.value);
    }

    return(
            <form>
                <input value={inputText} onChange={inputTextHandler} type="text" className="todo-input"/>
                <button onClick={submitFormHandler} className="todo-button">
                    <i className="fas fa-plus-square"></i>
                </button>
                <div className="select">
                    <select onChange={filterTodosHandler}>
                        <option value="all">All</option>
                        <option value="completed">Completed</option>
                        <option value="uncompleted">Uncompleted</option>
                    </select>
                </div>
            </form>
    );
}

export default Form
