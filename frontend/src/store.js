import {configureStore} from '@reduxjs/toolkit'
import captainReducer from "./reducers/CaptainReducer"
const store=configureStore({
    reducer:{
        captain:captainReducer
    }
})

export default store;