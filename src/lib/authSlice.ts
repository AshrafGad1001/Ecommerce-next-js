import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: null as string | null,
        username: null as string | null,
    },
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload.token
            state.username = action.payload.username
            if (typeof window !== 'undefined') {
                localStorage.setItem('userToken', action.payload.token)
                localStorage.setItem('username', action.payload.username)
            }
        },
        logout: (state) => {
            state.token = null
            state.username = null
            if (typeof window !== 'undefined') {
                localStorage.removeItem('userToken')
                localStorage.removeItem('username')
            }
        },
        loadToken: (state) => {
            if (typeof window !== 'undefined') {
                state.token = localStorage.getItem('userToken')
                state.username = localStorage.getItem('username')
            }
        },
    },
})

export const { setToken, logout, loadToken } = authSlice.actions
export default authSlice.reducer