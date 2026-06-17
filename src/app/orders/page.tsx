'use client'

import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@/lib/store'
import axios from 'axios'
import {
    Box,
    Container,
    Typography,
    Paper,
    Chip,
    CircularProgress,
    Divider,
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import Image from 'next/image'
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined'
import Link from 'next/link'
import { Order } from '@/lib/types'

export default function OrdersPage() {
    const theme = useTheme()

    const token = useSelector(
        (state: RootState) => state.auth.token
    )

    const [orders, setOrders] = useState<Order[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchOrders() {
            try {
                const { data } = await axios.get(
                    'https://ecommerce.routemisr.com/api/v1/orders/userOrders',
                    {
                        headers: { token },
                    }
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

    if (loading)
        return (
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '100vh',
                }}
            >
                <CircularProgress
                    sx={{
                        color: theme.palette.primary.main,
                    }}
                />
            </Box>
        )

    if (orders.length === 0)
        return (
            <Box
                sx={{
                    minHeight: '100vh',
                    bgcolor: theme.palette.background.default,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 3,
                }}
            >
                <ShoppingBagOutlinedIcon
                    sx={{
                        fontSize: 80,
                        color: theme.palette.grey[300],
                    }}
                />

                <Typography
                    variant="h5"
                    sx={{
                        fontWeight: 700,
                        color: theme.palette.text.secondary,
                    }}
                >
                    No Orders Yet
                </Typography>

                <Chip
                    label="Browse Products"
                    component={Link}
                    href="/products"
                    clickable
                    sx={{
                        bgcolor: theme.palette.primary.main,
                        color: '#fff',
                        fontWeight: 600,
                        px: 2,
                        py: 2.5,
                        fontSize: '14px',

                        '&:hover': {
                            bgcolor: theme.palette.primary.dark,
                        },
                    }}
                />
            </Box>
        )

    return (
        <Box
            sx={{
                minHeight: '100vh',
                bgcolor: theme.palette.background.default,
                py: 8,
            }}
        >
            <Container maxWidth="lg">
                <Box sx={{ mb: 5 }}>
                    <Typography
                        variant="h4"
                        sx={{
                            fontWeight: 800,
                            color: theme.palette.text.primary,
                        }}
                    >
                        My Orders{' '}
                        <Chip
                            label={`${orders.length} orders`}
                            size="small"
                            sx={{
                                bgcolor: `${theme.palette.primary.main}15`,
                                color: theme.palette.primary.main,
                                fontWeight: 600,
                                ml: 1,
                            }}
                        />
                    </Typography>
                </Box>

                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 3,
                    }}
                >
                    {orders.map((order) => (
                        <Paper
                            key={order._id}
                            elevation={0}
                            sx={{
                                borderRadius: 3,
                                border: `1px solid ${theme.palette.divider}`,
                                bgcolor: theme.palette.background.paper,
                                overflow: 'hidden',
                            }}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    flexWrap: 'wrap',
                                    gap: 2,
                                    p: 3,
                                    bgcolor: theme.palette.background.default,
                                    borderBottom: `1px solid ${theme.palette.divider}`,
                                }}
                            >
                                <Box>
                                    <Typography
                                        sx={{
                                            fontWeight: 700,
                                            color: theme.palette.text.primary,
                                            fontSize: '14px',
                                        }}
                                    >
                                        Order #{order._id.slice(-6).toUpperCase()}
                                    </Typography>

                                    <Typography
                                        sx={{
                                            color: theme.palette.text.secondary,
                                            fontSize: '12px',
                                            mt: 0.3,
                                        }}
                                    >
                                        {new Date(order.createdAt).toLocaleDateString(
                                            'en-US',
                                            {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                            }
                                        )}
                                    </Typography>
                                </Box>

                                <Box
                                    sx={{
                                        display: 'flex',
                                        gap: 1,
                                        flexWrap: 'wrap',
                                    }}
                                >
                                    <Chip
                                        label={order.isPaid ? 'Paid' : 'Not Paid'}
                                        size="small"
                                        sx={{
                                            bgcolor: order.isPaid
                                                ? `${theme.palette.success.main}20`
                                                : `${theme.palette.error.main}20`,
                                            color: order.isPaid
                                                ? theme.palette.success.dark
                                                : theme.palette.error.dark,
                                            fontWeight: 600,
                                        }}
                                    />

                                    <Chip
                                        label={
                                            order.isDelivered
                                                ? 'Delivered'
                                                : 'Pending'
                                        }
                                        size="small"
                                        sx={{
                                            bgcolor: order.isDelivered
                                                ? `${theme.palette.info.main}20`
                                                : `${theme.palette.warning.main}20`,
                                            color: order.isDelivered
                                                ? theme.palette.info.dark
                                                : theme.palette.warning.dark,
                                            fontWeight: 600,
                                        }}
                                    />

                                    <Chip
                                        label={order.paymentMethodType}
                                        size="small"
                                        sx={{
                                            bgcolor: `${theme.palette.primary.main}15`,
                                            color: theme.palette.primary.main,
                                            fontWeight: 600,
                                        }}
                                    />
                                </Box>
                            </Box>

                            <Box
                                sx={{
                                    p: 3,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 2,
                                }}
                            >
                                {order.cartItems.map((item) => (
                                    <Box key={item._id}>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                gap: 2,
                                                alignItems: 'center',
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    position: 'relative',
                                                    width: 70,
                                                    height: 70,
                                                    borderRadius: 2,
                                                    overflow: 'hidden',
                                                    bgcolor: '#F1F5F9',
                                                    flexShrink: 0,
                                                }}
                                            >
                                                {item.product?.imageCover && (
                                                    <Image
                                                        src={item.product.imageCover}
                                                        alt={item.product.title ?? ''}
                                                        fill
                                                        style={{
                                                            objectFit: 'cover',
                                                        }}
                                                    />
                                                )}
                                            </Box>

                                            <Box sx={{ flex: 1 }}>
                                                <Typography
                                                    sx={{
                                                        fontWeight: 600,
                                                        fontSize: '14px',
                                                        color: theme.palette.text.primary,
                                                    }}
                                                >
                                                    {item.product?.title
                                                        ?.split(' ')
                                                        .slice(0, 5)
                                                        .join(' ')}
                                                </Typography>

                                                <Typography
                                                    sx={{
                                                        fontSize: '13px',
                                                        color:
                                                            theme.palette.text.secondary,
                                                        mt: 0.3,
                                                    }}
                                                >
                                                    Qty: {item.quantity} × {item.price} EGP
                                                </Typography>
                                            </Box>

                                            <Typography
                                                sx={{
                                                    fontWeight: 700,
                                                    color: theme.palette.primary.main,
                                                    fontSize: '15px',
                                                }}
                                            >
                                                {item.quantity * item.price} EGP
                                            </Typography>
                                        </Box>

                                        <Divider sx={{ mt: 2 }} />
                                    </Box>
                                ))}

                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'flex-end',
                                        pt: 1,
                                    }}
                                >
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            fontWeight: 800,
                                            color: theme.palette.text.primary,
                                        }}
                                    >
                                        Total:{' '}
                                        <Box
                                            component="span"
                                            sx={{
                                                color: theme.palette.primary.main,
                                            }}
                                        >
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