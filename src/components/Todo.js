import React from 'react';
import axios from 'axios';

const Todo = ({todo, todos, setTodos}) =>{

    const removeTodoHandler = (e) =>{
        axios.post("http://127.0.0.1:5000/removeTask/"+todo.id)
        .then(response => {
            if (response !== undefined && response.status === 200) {
                setTodos(todos.filter(el => el.id !== todo.id));
            }else{
                alert("Error removing todo");
            }
        })
        .catch(error => {
            alert(`Error ${error}`);
        });
    }

    const completeTodoHandler = (e) =>{
        axios.post("http://127.0.0.1:5000/completeTask/"+todo.id)
        .then(response =>{
            if (response !== undefined && response.status === 200) {
                setTodos(todos.map(item => {
                    if (item.id === todo.id) {
                        return{
                            ...item, completed: !item.completed
                        }
                    }
                    return item;
                }));
            }else{
                alert("Error updating task");
            }
        })
        .catch(error =>{
            alert(`Error ${error}`);
        });
    }

    return(
        <div className="todo">
            <li className={`todo-item ${todo.completed ? "completed" : ""}`}>{todo.name}</li>
            <button className="complete-btn" onClick={completeTodoHandler}><i className="fas fa-check"></i></button>
            <button className="trash-btn" onClick={removeTodoHandler}><i className="fas fa-trash"></i></button>
        </div>
    );
}

export default Todo