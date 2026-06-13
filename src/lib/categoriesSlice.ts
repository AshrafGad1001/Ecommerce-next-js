import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchCategories = createAsyncThunk('categories/fetchCategories', async () => {
    const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/categories')
    return data.data
})

const categoriesSlice = createSlice({
    name: 'categories',
    initialState: {
        categories: [] as any[],
        loading: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.pending, (state) => { state.loading = true })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.categories = action.payload
                state.loading = false
            })
    }
})

export default categoriesSlice.reducer