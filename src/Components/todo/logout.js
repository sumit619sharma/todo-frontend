import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"
import { AuthSliceAction } from "../../store/authslice";

const Logout = (props) => {
  
  const navigate = useNavigate();
  const Dispatch = useDispatch();
  const logoutHandler = () => {
    localStorage.clear();
    Dispatch(AuthSliceAction.logout());
    navigate("/login", {replace: true});  
  };
  return (
    <>
      <button onClick={logoutHandler} className="btn btn-primary rounded px-3 py-2 mx-2"  style={{backgroundColor: 'yellowgreen', borderStyle:'none' }} >
        Logout
      </button>
    </>
  );
};

export default Logout;
