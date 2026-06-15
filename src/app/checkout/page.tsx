'use client'

import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, AppDispatch } from '@/lib/store'
import { fetchCart } from '@/lib/cartSlice'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import {
    Box, Container, Typography, Paper,
    TextField, Button, CircularProgress,
    Divider, Chip, ToggleButton, ToggleButtonGroup
} from '@mui/material'
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined'
import CreditCardIcon from '@mui/icons-material/CreditCard'
import MoneyIcon from '@mui/icons-material/Money'
import toast from 'react-hot-toast'
import Link from 'next/link'

export default function CheckoutPage() {
    const dispatch = useDispatch<AppDispatch>()
    const token = useSelector((state: RootState) => state.auth.token)
    const cartData = useSelector((state: RootState) => state.cart.cartData)
    const router = useRouter()

    const [paymentMethod, setPaymentMethod] = useState<'cash' | 'online'>('cash')
    const [submitting, setSubmitting] = useState(false)
    const [form, setForm] = useState({
        details: '',
        phone: '',
        city: '',
    })

    useEffect(() => {
        dispatch(fetchCart())
    }, [dispatch])

    const cartId = cartData?.data?._id

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    async function handleSubmit() {
        if (!form.details || !form.phone || !form.city) {
            toast.error('Please fill all fields!')
            return
        }
        if (!cartId) {
            toast.error('Your cart is empty!')
            return
        }

        setSubmitting(true)
        try {
            if (paymentMethod === 'cash') {
                await axios.post(
                    `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
                    { shippingAddress: form },
                    { headers: { token } }
                )
                toast.success('Order placed successfully!', {
                    style: { borderRadius: '10px', background: '#1a1a2e', color: '#fff', fontWeight: 600 },
                    iconTheme: { primary: '#7c3aed', secondary: '#fff' },
                })
                router.push('/orders')
            } else {
                const { data } = await axios.post(
                    `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${window.location.origin}`,
                    { shippingAddress: form },
                    { headers: { token } }
                )
                window.location.href = data.session.url
            }
        } catch (err) {
            if (axios.isAxiosError(err)) {
                toast.error(err.response?.data?.message || 'Failed to place order')
            } else {
                toast.error('Failed to place order')
            }
        } finally {
            setSubmitting(false)
        }
    }

    if (!cartData || cartData.data.products.length === 0) return (
        <Box sx={{
            minHeight: '100vh', bgcolor: '#f8f7ff',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', gap: 3
        }}>
            <Typography variant="h5" sx={{ fontWeight: 700, color: '#6b7280' }}>
                Your cart is empty!
            </Typography>
            <Chip
                label="Browse Products"
                component={Link}
                href="/products"
                clickable
                sx={{ bgcolor: '#7c3aed', color: '#fff', fontWeight: 600, px: 2, py: 2.5 }}
            />
        </Box>
    )

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: '#f8f7ff', py: 8 }}>
            <Container maxWidth="lg">
                <Typography variant="h4" sx={{ fontWeight: 800, color: '#1a1a2e', mb: 5 }}>
                    Checkout
                </Typography>

                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', lg: 'row' }, gap: 4 }}>

                    {/* Left - Form */}
                    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 3 }}>

                        {/* Shipping Address */}
                        <Paper elevation={0} sx={{ p: 3, borderRadius: 3, border: '1px solid #ede9fe', bgcolor: '#fff' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                                <LocalShippingOutlinedIcon sx={{ color: '#7c3aed' }} />
                                <Typography sx={{ fontWeight: 700, color: '#1a1a2e' }}>
                                    Shipping Address
                                </Typography>
                            </Box>

                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                <TextField
                                    label="Address Details"
                                    name="details"
                                    value={form.details}
                                    onChange={handleChange}
                                    fullWidth
                                    placeholder="Street, Building, Floor..."
                                />
                                <TextField
                                    label="City"
                                    name="city"
                                    value={form.city}
                                    onChange={handleChange}
                                    fullWidth
                                    placeholder="Cairo"
                                />
                                <TextField
                                    label="Phone"
                                    name="phone"
                                    value={form.phone}
                                    onChange={handleChange}
                                    fullWidth
                                    placeholder="01xxxxxxxxx"
                                />
                            </Box>
                        </Paper>

                        {/* Payment Method */}
                        <Paper elevation={0} sx={{ p: 3, borderRadius: 3, border: '1px solid #ede9fe', bgcolor: '#fff' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                                <CreditCardIcon sx={{ color: '#7c3aed' }} />
                                <Typography sx={{ fontWeight: 700, color: '#1a1a2e' }}>
                                    Payment Method
                                </Typography>
                            </Box>

                            <ToggleButtonGroup
                                value={paymentMethod}
                                exclusive
                                onChange={(_, val) => val && setPaymentMethod(val)}
                                fullWidth
                            >
                                <ToggleButton value="cash" sx={{
                                    py: 1.5, fontWeight: 600, textTransform: 'none',
                                    '&.Mui-selected': { bgcolor: '#ede9fe', color: '#7c3aed', borderColor: '#7c3aed' }
                                }}>
                                    <MoneyIcon sx={{ mr: 1 }} />
                                    Cash on Delivery
                                </ToggleButton>
                                <ToggleButton value="online" sx={{
                                    py: 1.5, fontWeight: 600, textTransform: 'none',
                                    '&.Mui-selected': { bgcolor: '#ede9fe', color: '#7c3aed', borderColor: '#7c3aed' }
                                }}>
                                    <CreditCardIcon sx={{ mr: 1 }} />
                                    Online Payment
                                </ToggleButton>
                            </ToggleButtonGroup>
                        </Paper>
                    </Box>

                    {/* Right - Order Summary */}
                    <Box sx={{ width: { xs: '100%', lg: 340 } }}>
                        <Paper elevation={0} sx={{
                            p: 3, borderRadius: 3, border: '1px solid #ede9fe',
                            bgcolor: '#fff', position: 'sticky', top: 20,
                        }}>
                            <Typography variant="h6" sx={{ fontWeight: 800, color: '#1a1a2e', mb: 3 }}>
                                Order Summary
                            </Typography>

                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mb: 2 }}>
                                {cartData.data.products.map((item) => (
                                    <Box key={item._id} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <Typography variant="body2" sx={{ color: '#6b7280' }}>
                                            {item.product?.title?.split(' ').slice(0, 3).join(' ')} × {item.count}
                                        </Typography>
                                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                            {item.price * item.count} EGP
                                        </Typography>
                                    </Box>
                                ))}
                            </Box>

                            <Divider sx={{ my: 2 }} />

                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
                                <Typography sx={{ fontWeight: 800 }}>Total</Typography>
                                <Typography sx={{ fontWeight: 800, color: '#7c3aed' }}>
                                    {cartData.data.totalCartPrice} EGP
                                </Typography>
                            </Box>

                            <Button
                                fullWidth
                                variant="contained"
                                size="large"
                                onClick={handleSubmit}
                                disabled={submitting}
                                sx={{
                                    bgcolor: '#7c3aed', color: '#fff', fontWeight: 700,
                                    textTransform: 'none', borderRadius: 3, py: 1.5, fontSize: '15px',
                                    '&:hover': { bgcolor: '#6d28d9' },
                                }}
                            >
                                {submitting
                                    ? <CircularProgress size={22} sx={{ color: '#fff' }} />
                                    : paymentMethod === 'cash' ? 'Place Order' : 'Pay Online'
                                }
                            </Button>
                        </Paper>
                    </Box>

                </Box>
            </Container>
        </Box>
    )
}