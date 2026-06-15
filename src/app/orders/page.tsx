'use client'

import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@/lib/store'
import axios from 'axios'
import {
    Box, Container, Typography, Paper,
    Chip, CircularProgress, Divider
} from '@mui/material'
import Image from 'next/image'
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined'
import Link from 'next/link'
import { Order } from '@/lib/types'

export default function OrdersPage() {
    const token = useSelector((state: RootState) => state.auth.token)
    const [orders, setOrders] = useState<Order[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchOrders() {
            try {
                const { data } = await axios.get(
                    'https://ecommerce.routemisr.com/api/v1/orders/userOrders',
                    { headers: { token } }
                )
                setOrders(data.data)
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        }
        fetchOrders()
    }, [token])

    if (loading) return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
            <CircularProgress sx={{ color: '#7c3aed' }} />
        </Box>
    )

    if (orders.length === 0) return (
        <Box sx={{
            minHeight: '100vh', bgcolor: '#f8f7ff',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', gap: 3
        }}>
            <ShoppingBagOutlinedIcon sx={{ fontSize: 80, color: '#d1d5db' }} />
            <Typography variant="h5" sx={{ fontWeight: 700, color: '#6b7280' }}>
                No Orders Yet
            </Typography>
            <Chip
                label="Browse Products"
                component={Link}
                href="/products"
                clickable
                sx={{ bgcolor: '#7c3aed', color: '#fff', fontWeight: 600, px: 2, py: 2.5, fontSize: '14px' }}
            />
        </Box>
    )

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: '#f8f7ff', py: 8 }}>
            <Container maxWidth="lg">

                {/* Header */}
                <Box sx={{ mb: 5 }}>
                    <Typography variant="h4" sx={{ fontWeight: 800, color: '#1a1a2e' }}>
                        My Orders{' '}
                        <Chip
                            label={`${orders.length} orders`}
                            size="small"
                            sx={{ bgcolor: '#ede9fe', color: '#7c3aed', fontWeight: 600, ml: 1 }}
                        />
                    </Typography>
                </Box>

                {/* Orders List */}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    {orders.map((order) => (
                        <Paper key={order._id} elevation={0} sx={{
                            borderRadius: 3,
                            border: '1px solid #ede9fe',
                            bgcolor: '#fff',
                            overflow: 'hidden',
                        }}>
                            {/* Order Header */}
                            <Box sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                flexWrap: 'wrap',
                                gap: 2,
                                p: 3,
                                bgcolor: '#f8f7ff',
                                borderBottom: '1px solid #ede9fe',
                            }}>
                                <Box>
                                    <Typography sx={{ fontWeight: 700, color: '#1a1a2e', fontSize: '14px' }}>
                                        Order #{order._id.slice(-6).toUpperCase()}
                                    </Typography>
                                    <Typography sx={{ color: '#9ca3af', fontSize: '12px', mt: 0.3 }}>
                                        {new Date(order.createdAt).toLocaleDateString('en-US', {
                                            year: 'numeric', month: 'long', day: 'numeric'
                                        })}
                                    </Typography>
                                </Box>

                                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                                    <Chip
                                        label={order.isPaid ? 'Paid' : 'Not Paid'}
                                        size="small"
                                        sx={{
                                            bgcolor: order.isPaid ? '#d1fae5' : '#fee2e2',
                                            color: order.isPaid ? '#065f46' : '#991b1b',
                                            fontWeight: 600,
                                        }}
                                    />
                                    <Chip
                                        label={order.isDelivered ? 'Delivered' : 'Pending'}
                                        size="small"
                                        sx={{
                                            bgcolor: order.isDelivered ? '#dbeafe' : '#fef3c7',
                                            color: order.isDelivered ? '#1e40af' : '#92400e',
                                            fontWeight: 600,
                                        }}
                                    />
                                    <Chip
                                        label={order.paymentMethodType}
                                        size="small"
                                        sx={{ bgcolor: '#ede9fe', color: '#7c3aed', fontWeight: 600 }}
                                    />
                                </Box>
                            </Box>

                            {/* Order Items */}
                            <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
                                {order.cartItems.map((item) => (
                                    <Box key={item._id}>
                                        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                                            {/* Image */}
                                            <Box sx={{
                                                position: 'relative', width: 70, height: 70,
                                                borderRadius: 2, overflow: 'hidden',
                                                bgcolor: '#f3f4f6', flexShrink: 0,
                                            }}>
                                                {item.product?.imageCover && (
                                                    <Image
                                                        src={item.product.imageCover}
                                                        alt={item.product.title ?? ''}
                                                        fill
                                                        style={{ objectFit: 'cover' }}
                                                    />
                                                )}
                                            </Box>

                                            {/* Info */}
                                            <Box sx={{ flex: 1 }}>
                                                <Typography sx={{ fontWeight: 600, fontSize: '14px', color: '#1a1a2e' }}>
                                                    {item.product?.title?.split(' ').slice(0, 5).join(' ')}
                                                </Typography>
                                                <Typography sx={{ fontSize: '13px', color: '#6b7280', mt: 0.3 }}>
                                                    Qty: {item.quantity} × {item.price} EGP
                                                </Typography>
                                            </Box>

                                            {/* Total */}
                                            <Typography sx={{ fontWeight: 700, color: '#7c3aed', fontSize: '15px' }}>
                                                {item.quantity * item.price} EGP
                                            </Typography>
                                        </Box>
                                        <Divider sx={{ mt: 2 }} />
                                    </Box>
                                ))}

                                {/* Order Total */}
                                <Box sx={{ display: 'flex', justifyContent: 'flex-end', pt: 1 }}>
                                    <Typography variant="h6" sx={{ fontWeight: 800, color: '#1a1a2e' }}>
                                        Total:{' '}
                                        <Box component="span" sx={{ color: '#7c3aed' }}>
                                            {order.totalOrderPrice} EGP
                                        </Box>
                                    </Typography>
                                </Box>
                            </Box>
                        </Paper>
                    ))}
                </Box>
            </Container>
        </Box>
    )
}