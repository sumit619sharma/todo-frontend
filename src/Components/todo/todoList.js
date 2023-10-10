
import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import TodoListItem from "./todoListItem";
import AddTodo from "./addtodo";
import PaginationList from "./pagination";
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faBookOpenReader } from '@fortawesome/free-solid-svg-icons';
import {setStatus} from "../../store/todoSlice";

const  TodoList= () => {
  const { todolist, totalcount, curstatus,statusmessage } = useSelector((state) => state.todo);
const dispatch = useDispatch();
  useEffect(() => {
  setTimeout(()=> {
   dispatch(setStatus({curstatus: false, statusmessage: ''}))
  },3000);
  },[curstatus]);
  return (
   
      <div style={{backgroundColor:'gray', height: '100%'}} className=" pt-5 d-flex  justify-content-center align-items-center "  >
      <div className="col-md-6 m-auto p-4 text-center ">
        
         <div className="d-flex justify-content-center">
          <h1>Todo List</h1>
          <FontAwesomeIcon icon={faBookOpenReader} style={{color:'purple', fontSize: '35px', paddingLeft: '4px',paddingTop:'2px'}} />
         </div>
        
        <AddTodo></AddTodo>
          {statusmessage==='error' &&
          <div style={{padding: '3px' , color: 'red' ,fontSize: '22px'}}>{statusmessage}...</div>
        }
        

        <ul className="col-md-12 m-auto d-flex  flex-column align-items-center justify-content-center ">
        {todolist.length > 0 &&
          todolist.map((todo) => (
            <TodoListItem key={todo.id} todo={todo}></TodoListItem>
          ))}
        {todolist.length == 0 && <h2>Your task is empty add task</h2>}
      </ul>
      <PaginationList totalcount={totalcount}></PaginationList>
   
        </div>
        </div>
         
        
      )
}

export default TodoList;
