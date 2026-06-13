'use client'

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/lib/store'
import { fetchCart, removeItem, updateQuantity } from '@/lib/cartSlice'
import {
    Box,
    Container,
    Typography,
    Button,
    CircularProgress,
    IconButton,
    Divider,
    Paper,
    Chip,
} from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined'
import { CartItem } from '@/lib/types'

export default function CartPage() {
    const dispatch = useDispatch<AppDispatch>()
    const { cartData, cartCount, loading } = useSelector((state: RootState) => state.cart)

    useEffect(() => {
        dispatch(fetchCart())
    }, [dispatch])

    if (loading) return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
            <CircularProgress sx={{ color: '#7c3aed' }} />
        </Box>
    )

    if (!cartData || cartCount === 0) return (
        <Box sx={{ minHeight: '100vh', bgcolor: '#f8f7ff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 3 }}>
            <ShoppingBagOutlinedIcon sx={{ fontSize: 80, color: '#d1d5db' }} />
            <Typography variant="h5" sx={{ fontWeight: 700, color: '#6b7280' }}>
                Your cart is empty
            </Typography>
            <Button
                component={Link}
                href="/products"
                variant="contained"
                sx={{
                    bgcolor: '#7c3aed',
                    borderRadius: 3,
                    px: 4,
                    py: 1.5,
                    textTransform: 'none',
                    fontWeight: 700,
                    '&:hover': { bgcolor: '#6d28d9' },
                }}
            >
                Browse Products
            </Button>
        </Box>
    )

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: '#f8f7ff', py: 6 }}>
            <Container maxWidth="lg">

                {/* Header */}
                <Typography variant="h4" sx={{ fontWeight: 800, color: '#1a1a2e', mb: 4 }}>
                    Cart Items{' '}
                    <Chip
                        label={`${cartCount} items`}
                        size="small"
                        sx={{ bgcolor: '#ede9fe', color: '#7c3aed', fontWeight: 600, ml: 1 }}
                    />
                </Typography>

                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', lg: 'row' }, gap: 4 }}>

                    {/* Products */}
                    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
                        {cartData.data.products.map((item: CartItem) => (
                            <Paper key={item._id} elevation={0} sx={{
                                p: 2.5,
                                borderRadius: 3,
                                border: '1px solid #ede9fe',
                                bgcolor: '#fff',
                                display: 'flex',
                                gap: 2,
                                alignItems: 'center',
                            }}>

                               {/* Image */}
<Box sx={{ position: 'relative', width: 90, height: 90, borderRadius: 2, overflow: 'hidden', flexShrink: 0 }}>
    {item.product?.imageCover && (
        <Image
            src={item.product.imageCover}
            alt={item.product?.title ?? ''}
            fill
            style={{ objectFit: 'cover' }}
        />
    )}
</Box>

                                {/* Info */}
                                <Box sx={{ flex: 1 }}>
                                    <Typography variant="body1" sx={{ fontWeight: 700, color: '#1a1a2e', mb: 0.5 }}>
                                        {item.product?.title?.split(' ').slice(0, 4).join(' ')}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: '#7c3aed', fontWeight: 700 }}>
                                        {item.price} EGP
                                    </Typography>

                                    {/* Quantity */}
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                                        <IconButton
                                            size="small"
                                            disabled={item.count <= 1}
                                            onClick={() => {
                                                if (item.count - 1 < 1) return
                                                dispatch(updateQuantity({ productId: item.product._id, count: item.count - 1 }))
                                            }}
                                            sx={{ border: '1px solid #e5e7eb', borderRadius: 1.5, p: 0.5 }}
                                        >
                                            <RemoveIcon fontSize="small" />
                                        </IconButton>
                                        <Typography variant="body2" sx={{ fontWeight: 700, minWidth: 24, textAlign: 'center' }}>
                                            {item.count}
                                        </Typography>
                                        <IconButton
                                            size="small"
                                            onClick={() => dispatch(updateQuantity({ productId: item.product._id, count: item.count + 1 }))}
                                            sx={{ border: '1px solid #e5e7eb', borderRadius: 1.5, p: 0.5 }}
                                        >
                                            <AddIcon fontSize="small" />
                                        </IconButton>
                                    </Box>
                                </Box>

                                {/* Total + Remove */}
                                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 1 }}>
                                    <Typography variant="body1" sx={{ fontWeight: 800, color: '#1a1a2e' }}>
                                        {item.price * item.count} EGP
                                    </Typography>
                                    
                                </Box>
                                <IconButton
                                        size="large"
                                        onClick={() => dispatch(removeItem(item.product._id))}
                                        sx={{ color: '#ef4444' }}
                                    >
                                        <DeleteOutlinedIcon fontSize="large" />
                                    </IconButton>

                            </Paper>
                        ))}
                    </Box>

                    {/* Summary */}
                    <Box sx={{ width: { xs: '100%', lg: 320 } }}>
                        <Paper elevation={0} sx={{
                            p: 3,
                            borderRadius: 3,
                            border: '1px solid #ede9fe',
                            bgcolor: '#fff',
                            position: 'sticky',
                            top: 20,
                        }}>
                            <Typography variant="h6" sx={{ fontWeight: 800, color: '#1a1a2e', mb: 3 }}>
                                Order Details
                            </Typography>

                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    Items ({cartCount})
                                </Typography>
                                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                    {cartData.data.totalCartPrice} EGP
                                </Typography>
                            </Box>

                            <Divider sx={{ my: 2 }} />

                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
                                <Typography variant="body1" sx={{ fontWeight: 800 }}>
                                    Total
                                </Typography>
                                <Typography variant="body1" sx={{ fontWeight: 800, color: '#7c3aed' }}>
                                    {cartData.data.totalCartPrice} EGP
                                </Typography>
                            </Box>

                            <Button
                                fullWidth
                                variant="contained"
                                size="large"
                                sx={{
                                    bgcolor: '#7c3aed',
                                    borderRadius: 3,
                                    py: 1.5,
                                    fontWeight: 700,
                                    textTransform: 'none',
                                    fontSize: '15px',
                                    '&:hover': { bgcolor: '#6d28d9' },
                                }}
                            >
                                Checkout
                            </Button>

                            <Button
                                fullWidth
                                component={Link}
                                href="/products"
                                variant="outlined"
                                size="large"
                                sx={{
                                    mt: 1.5,
                                    borderRadius: 3,
                                    py: 1.5,
                                    fontWeight: 700,
                                    textTransform: 'none',
                                    borderColor: '#7c3aed',
                                    color: '#7c3aed',
                                    '&:hover': { borderColor: '#6d28d9', bgcolor: '#f5f3ff' },
                                }}
                            >
                                Continue Shopping
                            </Button>

                        </Paper>
                    </Box>

                </Box>
            </Container>
        </Box>
    )
}   