import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { RootState } from './store'

export const fetchFavorites = createAsyncThunk('favorites/fetchFavorites', async (_, { getState }) => {
    const token = (getState() as RootState).auth.token
    const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/wishlist', {
        headers: { token }
    })
    return data
})

export const addToFavorites = createAsyncThunk('favorites/addToFavorites', async (productId: string, { getState }) => {
    const token = (getState() as RootState).auth.token
    const { data } = await axios.post(
        'https://ecommerce.routemisr.com/api/v1/wishlist',
        { productId },
        { headers: { token } }
    )
    return data
})

export const removeFromFavorites = createAsyncThunk('favorites/removeFromFavorites', async (productId: string, { getState }) => {
    const token = (getState() as RootState).auth.token
    const { data } = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
        { headers: { token } }
    )
    return data
})

const favoritesSlice = createSlice({
    name: 'favorites',
    initialState: {
        favoritesData: [] as any[],
        favoritesIds: [] as string[],
        loading: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchFavorites.pending, (state) => { state.loading = true })
            .addCase(fetchFavorites.fulfilled, (state, action) => {
                state.favoritesData = action.payload.data
                state.favoritesIds = action.payload.data.map((p: any) => p._id)
                state.loading = false
            })
            .addCase(addToFavorites.fulfilled, (state, action) => {
                state.favoritesIds = action.payload.data
            })
            .addCase(removeFromFavorites.fulfilled, (state, action) => {
                state.favoritesIds = action.payload.data
                state.favoritesData = state.favoritesData.filter(
                    (p) => action.payload.data.includes(p._id)
                )
            })
    }
})

export default favoritesSlice.reducer