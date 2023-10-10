import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Login, Signup } from "../../store/auth-thunk";
import {Link, useNavigate , Navigate} from 'react-router-dom'
import { AuthSliceAction } from "../../store/authslice";

function SignIn() {
  
  const [data, setData] = useState({
    email: "",
    password: "",
    confirmpassword: "",
  });
  const {signup, errorStatus,token} = useSelector(state => state.auth)
  console.log('signup',signup, errorStatus,token);
  const Disptach = useDispatch();
 const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const obj = {
      email: data.email,
      password: data.password,
    };
    console.log(data , obj)

    if (obj.email === "" || obj.password === "") {
      Disptach(AuthSliceAction.setError({error: "fiels are empty"}))
      return;
    }
          
    if (!signup) {
      Disptach(Login(obj));
   
      if(token){
         navigate('/home', {replace: true});
   
    }
      return;
    }

    if (signup && obj.password === data.confirmpassword) {
      Disptach(Signup(obj));
    } else {
      Disptach(AuthSliceAction.setError({error: "Enter valid Password"}))
      
    }
  };

  const enteredDatahandler = (e) => {
    e.preventDefault();
    setData({ ...data, [e.target.name]: e.target.value });
  };

  useEffect(() => {
   if(errorStatus){
    setTimeout( ()=> {
    Disptach(AuthSliceAction.setError({error: null}))
    },3000);
   }
  },[errorStatus])
  return (
    

    <div className=" col-12 col-md-6 m-auto mt-10">
    <form className="p-4" onSubmit={handleSubmit} >
      <h2 className="text-center mb-4  ">  {signup ? "SignUp" : "Login"}</h2>
      
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input type="email" className="form-control" id="email"  name="email" onChange={enteredDatahandler} required />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input type="password" className="form-control" id="password" name="password" required onChange={enteredDatahandler} />
      </div>
      {signup && 
      <div className="mb-3">
      <label htmlFor="confirmPassword" className="form-label">
        confirmPassword
      </label>
      <input type="password" className="form-control" id="confirmPassword" name="confirmpassword" required  onChange={enteredDatahandler} />
    </div>
      }
      {errorStatus && 
      <div className="p-2 text-danger h5" > {errorStatus}... </div>
      }
   <button type="submit" className="btn btn-primary w-100">
   {signup ? "Signup" : " Login"}
      </button>
      <div className="d-flex mt-2"  >
      <Link className="fs-4"
                  onClick={() =>  Disptach(AuthSliceAction.login())}
                  
                >
                  {signup ? "Log In" : "Don't have an account? Sign Up"}
     </Link>
     </div>
    </form>
  </div>

    
    
  )
}

export default SignIn;

