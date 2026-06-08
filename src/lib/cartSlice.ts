import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { RootState } from './store'

export const fetchCart = createAsyncThunk('cart/fetchCart', async (_, { getState }) => {
    const token = (getState() as RootState).auth.token
    const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/cart', {
        headers: { token }
    })
    return data
})

export const addToCart = createAsyncThunk('cart/addToCart', async (productId: string, { getState }) => {
    const token = (getState() as RootState).auth.token
    const { data } = await axios.post(
        'https://ecommerce.routemisr.com/api/v1/cart',
        { productId },
        { headers: { token } }
    )
    return data
})

export const removeItem = createAsyncThunk('cart/removeItem', async (productId: string, { getState }) => {
    const token = (getState() as RootState).auth.token
    const { data } = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        { headers: { token } }
    )
    return data
})

export const updateQuantity = createAsyncThunk(
    'cart/updateQuantity',
    async ({ productId, count }: { productId: string; count: number }, { getState }) => {
        const token = (getState() as RootState).auth.token
        const { data } = await axios.put(
            `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
            { count },
            { headers: { token } }
        )
        return data
    }
)

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartData: null as any,
        cartCount: 0,
        loading: false,
        error: null as string | null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCart.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.cartData = action.payload
                state.cartCount = action.payload.numOfCartItems
                state.loading = false
            })
            .addCase(fetchCart.rejected, (state) => {
                state.loading = false
                state.error = 'Failed to fetch cart'
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                if (!action.payload) return
                state.cartData = action.payload
                state.cartCount = action.payload.numOfCartItems
            })
            .addCase(removeItem.fulfilled, (state, action) => {
                if (!action.payload) return
                state.cartData = action.payload
                state.cartCount = action.payload.numOfCartItems
            })
            .addCase(updateQuantity.fulfilled, (state, action) => {
                if (!action.payload) return
                state.cartData = action.payload
            })
    }
})

export default cartSlice.reducer