import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    token : localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null,
    loader : false,
    signupData : null,
}

const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        setSignUpData(state, value) {
        state.signupData = value.payload; 
      },
      setLoading(state, value) {
        state.loader = value.payload;
      },
      setToken(state, value) {
        state.token = value.payload;
      },
    },
})

export const {setToken, setSignUpData, setLoading} = authSlice.actions;
export default authSlice.reducer;


