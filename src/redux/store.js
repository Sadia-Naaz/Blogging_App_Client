import {createSlice,configureStore} from"@reduxjs/toolkit";
const authInitialState = {
isLogin : localStorage.getItem("isLogin") ==="true" ? true :false,
}
const authSlice  = createSlice({
    name:"auth",
    initialState:authInitialState,
    reducers:{
        login:(state)=>{
         state.isLogin = true;
         localStorage.setItem("isLogin","true");
        },
        logout:(state)=>{
       state.isLogin=false;
       localStorage.removeItem("isLogin");
        }
    }
})
export const authActions = authSlice.actions;
export const store = configureStore({reducer:authSlice.reducer});