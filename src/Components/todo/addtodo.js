// AddTodo.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postTodo, updateTodo } from "../../store/todo-thunk";

import Logout from "./logout";
import { setStatus } from "../../store/todoSlice";


function AddTodo() {
  const { edit, currentpage } = useSelector((state) => state.todo);
  const { token } = useSelector((state) => state.auth);
  const [newTodo, setNewTodo] = useState("");
  const [inputerror, setInputerror] = useState(false);
  const [update, setUpdate] = useState(false);
  const dispatch = useDispatch();

  const handleAdd = () => {
    if (newTodo.trim().length == 0) {
      setInputerror(true);
      return;
    }
    if (newTodo.trim() && update != true) {
      dispatch( postTodo({
 title: newTodo,},
         token,
          currentpage
       ) );
      setNewTodo("");
    } else {
      dispatch(
        updateTodo({ ...edit, title: newTodo }, token, edit.id, currentpage) );
    
      setNewTodo("");
      setUpdate(false);
    }
  };
  useEffect(() => {
    if (edit) {
      
      setNewTodo(edit.title);
      setUpdate(true);
    }
  }, [edit]);
  useEffect(() => {
    if (inputerror) {
      setTimeout(() => {
        setInputerror(false);
      }, 3000);
    }
  }, [inputerror]);


  return (
    <div className="container  ">
  
   <input className="col-md-9" style={{padding: '15px' , borderRadius: '15px', borderStyle:'none'  , margin: '5px'}}
        type="text"
      value={newTodo}
      onChange={(e) => setNewTodo(e.target.value)}
    />
      <div className="m-2">
        <button onClick={handleAdd} className="btn btn-primary rounded px-3 py-2 "  style={{backgroundColor: 'pink' , borderStyle:'none'}}>
          {update == true ? "Update" : "Add Todo"}
        </button>
        <Logout></Logout>
      </div>
      {inputerror && <h2 style={{ color: "red" }}>Enter valid input data</h2>}
    </div>
  );
}

export default AddTodo;
