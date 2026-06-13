import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './cartSlice'
import productsReducer from './productsSlice'
import authReducer from './authSlice'
import categoriesReducer from './categoriesSlice'

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        products: productsReducer,
        auth: authReducer,
        categories: categoriesReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch