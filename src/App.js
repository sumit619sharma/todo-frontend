import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { AuthSliceAction } from "./store/authslice";
import { getallTodo } from "./store/todo-thunk";
import { useEffect, Suspense } from "react";
import {  Navigate , Route, Routes,  } from "react-router-dom";
import { useNavigate } from "react-router-dom/dist";
import TodoList from './Components/todo/todoList'
import SignIn from "./Components/Auth/auth";


function App() {
  const Dispatch = useDispatch();

  const { login, token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const login = localStorage.getItem("login");
    Dispatch(AuthSliceAction.setAuth({ login: login, token: token }));
    
  }, []);
  useEffect(() => {
    if (login == "true" && token) {
      
      Dispatch(getallTodo(token, 1));
      navigate("/home");
      return;
    } else {
      navigate("/login");
    }
  }, [login]);
  return (
    <div className="App">
      <Routes>
          <Route path="/login" element={<SignIn />} />
          <Route path="/home" 
           element = {  (login==='true' ? <TodoList/> : <Navigate to='/login' replace={true}/> ) }  />
           <Route path="*" element={ <SignIn />} />
           </Routes>
      
    </div>
  );
}

export default App;
