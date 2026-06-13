// src/lib/authSlice.ts
import { createSlice } from '@reduxjs/toolkit'

function setCookie(name: string, value: string) {
    document.cookie = `${name}=${value}; path=/; max-age=${7 * 24 * 60 * 60}`
}

function deleteCookie(name: string) {
    document.cookie = `${name}=; path=/; max-age=0`
}

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
                setCookie('userToken', action.payload.token)
            }
        },
        logout: (state) => {
            state.token = null
            state.username = null
            if (typeof window !== 'undefined') {
                localStorage.removeItem('userToken')
                localStorage.removeItem('username')
                deleteCookie('userToken')
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