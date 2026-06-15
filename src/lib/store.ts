import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './cartSlice'
import productsReducer from './productsSlice'
import authReducer from './authSlice'
import categoriesReducer from './categoriesSlice'
import favoritesReducer from './favoritesSlice'
import brandsReducer from './brandsSlice'

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        products: productsReducer,
        auth: authReducer,
        categories: categoriesReducer,
        favorites: favoritesReducer,
        brands: brandsReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch