import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
    const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/products')
    return data.data
})

const productsSlice = createSlice({
    name: 'products',
    initialState: {
        products: [] as any[],
        loading: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => { state.loading = true })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.products = action.payload
                state.loading = false
            })
    }
})

export default productsSlice.reducer