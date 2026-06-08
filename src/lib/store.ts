import { configureStore } from '@reduxjs/toolkit'
import counterSlice from './counterSlice'
import cartReducer from './cartSlice'
import productsReducer from './productsSlice'
import authReducer from './authSlice'

export const store = configureStore({
    reducer: {
        counter: counterSlice,
        cart: cartReducer,
        products: productsReducer,
        auth: authReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch