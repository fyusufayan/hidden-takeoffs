import { configureStore } from "@reduxjs/toolkit";
import errorSlice from './reducers/errorSlice.js'
// import projectsSlice from "./reducers/projectSlice.js";
import takeoffSlice from './reducers/takeoffSlice.js'
import securitySlice from "./reducers/securitySlice.js"


const store=configureStore({
    reducer:{
        error:errorSlice.reducer,
        takeoff:takeoffSlice.reducer,
        // projects:projectsSlice.reducer,
        security:securitySlice.reducer
    }
})

export default store