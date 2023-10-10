import { createSlice } from "@reduxjs/toolkit";
const initialstate = { login: null, token: null, signup:false , errorStatus: null };

const AuthenticationSlice = createSlice({
  name: "auth",
  initialState: initialstate,
  reducers: {
    login(state) {
      state.signup = !state.signup;
    },
    setAuth(state, action) {
      state.login = action.payload.login;
      state.token = action.payload.token;
      // console.log(action.payload);
    },
    logout(state, action) {
      state.login = null;
      state.token = null;
    },
    setError(state, action){
      state.errorStatus = action.payload.error
    }
  },
});

export const AuthSliceAction = AuthenticationSlice.actions;
export default AuthenticationSlice;
