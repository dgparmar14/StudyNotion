import { createSlice } from "@reduxjs/toolkit";

const initial ={ 
    user:localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
    loader : false,
}

const profileSlice = createSlice({
    name : "profile",
    initialState : initial,
    reducers : {
        setUser(state, value) {
            console.log("Updating user data with data : ", value.payload);
            state.user = value.payload;
            console.log("After udating user data : ", value.payload);
        },
        setLoading(state, value) {
            state.loading = value.payload;
        },
          
    }
});

export const {setUser, setLoading} = profileSlice.actions;
export default profileSlice.reducer;