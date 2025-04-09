import { createSlice } from "@reduxjs/toolkit";

const initial ={ 
    user:localStorage.getItem("isPass") ? JSON.parse(localStorage.getItem("isPass")) : false,
    loader : false,
}

const resultSlice = createSlice({
    name : "result",
    initialState : initial,
    reducers : {
        setIsPass : (state, action) => {
         state.isPass = action.payload
        }
          
    }
});

export const {setIsPass} = resultSlice.actions;
export default resultSlice.reducer;