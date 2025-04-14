import { createSlice } from "@reduxjs/toolkit";

const initial ={ 
    user:localStorage.getItem("categoryId") ? JSON.parse(localStorage.getItem("categoryId")) : 0,
    loader : false,
}

const categorySlice = createSlice({
    name : "category",
    initialState : initial,
    reducers : {
        setCategoryId : (state, action) => {
         state.categoryId = action.payload
        },
        unsetCategoryId: (state) => {
         state.categoryId = 0;
         localStorage.removeItem("categoryId");
     }
          
    }
});

export const {setCategoryId, unsetCategoryId} = categorySlice.actions;
export default categorySlice.reducer;