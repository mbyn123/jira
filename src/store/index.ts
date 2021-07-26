import { configureStore } from "@reduxjs/toolkit"
import { authSlice } from './authSlice';
import { projectListSlice } from './projectListSlice';

export const rootReducer = {
    projectList:projectListSlice.reducer,
    auth:authSlice.reducer
}

export const store = configureStore({
    reducer: rootReducer
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
