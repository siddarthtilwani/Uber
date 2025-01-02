import { createSlice } from "@reduxjs/toolkit";

const initialState={
    captain:null,
    isloading:false,
    error:null

}

const captainSlice=createSlice({
    name:'captain',
    initialState:initialState,
    reducers:{
        setcaptain:(state,action)=>{
            state.captain=action.payload;
        },
        setloading:(state,action)=>{
            state.isloading=action.payload;
        }
        ,
        seterror:(state,action)=>{
            state.error=action.payload;
            },}
})

export const {setcaptain,setloading,seterror}=captainSlice.actions

export default captainSlice.reducer