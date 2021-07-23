import { AppDispatch, RootState } from './index';
import { createSlice } from '@reduxjs/toolkit';
import * as auth from 'auth-provider'
import { authForm, bootStraspUser } from 'context/auth-context';
import { User } from 'screens/projectlList/searchPanel';

interface State {
    user: User | null
}

const initialState: State = {
    user: null
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser(state, action) {
            state.user = action.payload
        }
    }
})

export const selectUser = (state:RootState)=>state.auth.user

const { setUser } = authSlice.actions

export const login = (form: authForm) => (dispatch: AppDispatch) => auth.login(form).then(user => dispatch(setUser(user)))
export const register = (form: authForm) => (dispatch: AppDispatch) => auth.register(form).then(user => dispatch(setUser(user)))
export const logout = () => (dispatch: AppDispatch) => auth.logout().then(() => dispatch(setUser(null)))
export const bootStrasp = () => (dispatch: AppDispatch) => bootStraspUser().then(user => dispatch(setUser(user)))

