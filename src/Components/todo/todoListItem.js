// TodoList.js
import React from "react";

import { useSelector, useDispatch } from "react-redux";

import { deleteTodo, updateTodo } from "../../store/todo-thunk";
import { editTodo, setStatus } from "../../store/todoSlice";
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faTrash,faEdit } from '@fortawesome/free-solid-svg-icons';


function TodoListItem({ todo }) {
  const { token } = useSelector((state) => state.auth);
  const { currentpage } = useSelector((state) => state.todo);
  const dispatch = useDispatch();

  const handleEdit = (id, oldtitle, status) => {
   
    dispatch(editTodo({ id: id, title: oldtitle, status: status }));
  };

  const handleDelete = (id) => {
    dispatch(deleteTodo(id, token, currentpage));
    
  };
  const handleCheckboxChange = (e, todo) => {
    const newStatus = e.target.checked;
    dispatch(
      updateTodo({ ...todo, status: newStatus }, token, todo.id, currentpage)
    );
    
  };

  return (
    <li key={todo.id} style={{borderRadius: '15px' , fontSize: '22px',width: "100%"}} className="bg-white d-flex justify-content-between align-items-center m-2 p-2 ">
       <div className='d-flex'>
        <div style={{fontSize: '22px',}} className="form-check my-auto  ">
        <input style={{border: '2px solid black' }}
          type="checkbox"
          className="form-check-input"
          
          checked={todo.status}
          onChange={(e)=> handleCheckboxChange(e,todo)}
        />
    </div>

        <p className='my-auto p-1'> {todo.title}</p>
      </div>
        
      <p className="my-auto p-1">
        status:
        {todo.status ? (
          <span style={{ color: "green" }}>completed</span>
        ) : (
          <span style={{ color: "orange" }}>pending</span>
        )}
      </p>

      <div className="d-flex justify-content-betweem align-items-center my-auto p-1 ">

          <FontAwesomeIcon icon={faEdit}  style={{color:'purple', fontSize: '26px', marginRight:'4px',  padding:'2px'}} onClick={() => handleEdit(todo.id, todo.title, todo.status)} />
          <FontAwesomeIcon icon={faTrash}  style={{color:'purple', fontSize: '26px', marginRight:'3px', marginLeft: '4px',padding: "2px"}} onClick={() => handleDelete(todo.id)}/>
          </div>
          
    </li>
  );
}

export default TodoListItem;
