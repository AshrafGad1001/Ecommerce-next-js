'use client'

import { useSelector, useDispatch } from 'react-redux'
import { RootState, AppDispatch } from '@/lib/store'
import { logout } from '@/lib/authSlice'
import { useRouter } from 'next/navigation'
import {
    Box, Container, Typography, Paper,
    Avatar, Button, Divider, Chip
} from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import PersonIcon from '@mui/icons-material/Person'
import Link from 'next/link'

export default function ProfilePage() {
    const dispatch = useDispatch<AppDispatch>()
    const router = useRouter()
    const username = useSelector((state: RootState) => state.auth.username)
    const cartCount = useSelector((state: RootState) => state.cart.cartCount)
    const cartData = useSelector((state: RootState) => state.cart.cartData)

    function handleLogout() {
        dispatch(logout())
        router.push('/login')
    }

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: '#f8f7ff', py: 8 }}>
            <Container maxWidth="sm">

                {/* Profile Card */}
                <Paper elevation={0} sx={{
                    p: 5,
                    borderRadius: 4,
                    border: '1px solid #ede9fe',
                    bgcolor: '#fff',
                    textAlign: 'center',
                    mb: 3,
                }}>
                    {/* Avatar */}
                    <Avatar sx={{
                        width: 90,
                        height: 90,
                        bgcolor: '#7c3aed',
                        fontSize: '2rem',
                        fontWeight: 800,
                        mx: 'auto',
                        mb: 2,
                    }}>
                        {username?.charAt(0).toUpperCase()}
                    </Avatar>

                    <Typography variant="h5" sx={{ fontWeight: 800, color: '#1a1a2e', mb: 0.5 }}>
                        {username}
                    </Typography>

                    <Chip
                        label="Active Member"
                        size="small"
                        sx={{ bgcolor: '#ede9fe', color: '#7c3aed', fontWeight: 600, mb: 3 }}
                    />

                    <Divider sx={{ mb: 3 }} />

                    {/* Stats */}
                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 6 }}>
                        <Box>
                            <Typography variant="h5" sx={{ fontWeight: 900, color: '#7c3aed' }}>
                                {cartCount}
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                Cart Items
                            </Typography>
                        </Box>
                        <Box>
                            <Typography variant="h5" sx={{ fontWeight: 900, color: '#7c3aed' }}>
                                {cartData?.data?.totalCartPrice ?? 0}
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                Total EGP
                            </Typography>
                        </Box>
                    </Box>
                </Paper>

                {/* Actions */}
                <Paper elevation={0} sx={{
                    p: 3,
                    borderRadius: 4,
                    border: '1px solid #ede9fe',
                    bgcolor: '#fff',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                }}>
                    <Typography variant="body2" sx={{ fontWeight: 700, color: 'text.secondary', mb: 1 }}>
                        QUICK ACTIONS
                    </Typography>

                    <Button
                        component={Link}
                        href="/cart"
                        fullWidth
                        startIcon={<ShoppingCartIcon />}
                        sx={{
                            justifyContent: 'flex-start',
                            color: '#1a1a2e',
                            fontWeight: 600,
                            textTransform: 'none',
                            py: 1.5,
                            px: 2,
                            borderRadius: 2,
                            border: '1px solid #e5e7eb',
                            '&:hover': { bgcolor: '#f5f3ff', borderColor: '#7c3aed' },
                        }}
                    >
                        View My Cart
                        {cartCount > 0 && (
                            <Chip
                                label={cartCount}
                                size="small"
                                sx={{ ml: 'auto', bgcolor: '#7c3aed', color: '#fff', fontWeight: 700, height: 22 }}
                            />
                        )}
                    </Button>

                    <Button
                        component={Link}
                        href="/products"
                        fullWidth
                        startIcon={<PersonIcon />}
                        sx={{
                            justifyContent: 'flex-start',
                            color: '#1a1a2e',
                            fontWeight: 600,
                            textTransform: 'none',
                            py: 1.5,
                            px: 2,
                            borderRadius: 2,
                            border: '1px solid #e5e7eb',
                            '&:hover': { bgcolor: '#f5f3ff', borderColor: '#7c3aed' },
                        }}
                    >
                        Browse Products
                    </Button>

                    <Divider />

                    <Button
                        fullWidth
                        onClick={handleLogout}
                        startIcon={<LogoutIcon />}
                        sx={{
                            justifyContent: 'flex-start',
                            color: '#ef4444',
                            fontWeight: 600,
                            textTransform: 'none',
                            py: 1.5,
                            px: 2,
                            borderRadius: 2,
                            border: '1px solid #fecaca',
                            '&:hover': { bgcolor: '#fef2f2', borderColor: '#ef4444' },
                        }}
                    >
                        Logout
                    </Button>
                </Paper>

            </Container>
        </Box>
    )
}