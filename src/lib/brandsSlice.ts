import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchBrands = createAsyncThunk('brands/fetchBrands', async () => {
    const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/brands')
    return data.data
})

const brandsSlice = createSlice({
    name: 'brands',
    initialState: {
        brands: [] as any[],
        loading: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchBrands.pending, (state) => { state.loading = true })
            .addCase(fetchBrands.fulfilled, (state, action) => {
                state.brands = action.payload
                state.loading = false
            })
    }
})

export default brandsSlice.reducer