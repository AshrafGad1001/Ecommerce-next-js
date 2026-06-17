'use client'

import { useSelector, useDispatch } from 'react-redux'
import { RootState, AppDispatch } from '@/lib/store'
import { logout } from '@/lib/authSlice'
import { useRouter } from 'next/navigation'
import {
    Box,
    Container,
    Typography,
    Paper,
    Avatar,
    Button,
    Divider,
    Chip,
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import LogoutIcon from '@mui/icons-material/Logout'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import PersonIcon from '@mui/icons-material/Person'
import Link from 'next/link'

export default function ProfilePage() {
    const theme = useTheme()

    const dispatch = useDispatch<AppDispatch>()
    const router = useRouter()

    const username = useSelector(
        (state: RootState) => state.auth.username
    )

    const cartCount = useSelector(
        (state: RootState) => state.cart.cartCount
    )

    const cartData = useSelector(
        (state: RootState) => state.cart.cartData
    )

    function handleLogout() {
        dispatch(logout())
        router.push('/login')
    }

    return (
        <Box
            sx={{
                minHeight: '100vh',
                bgcolor: theme.palette.background.default,
                py: 8,
            }}
        >
            <Container maxWidth="sm">
                <Paper
                    elevation={0}
                    sx={{
                        p: 5,
                        borderRadius: 4,
                        border: `1px solid ${theme.palette.divider}`,
                        bgcolor: theme.palette.background.paper,
                        textAlign: 'center',
                        mb: 3,
                    }}
                >
                    <Avatar
                        sx={{
                            width: 90,
                            height: 90,
                            bgcolor: theme.palette.primary.main,
                            fontSize: '2rem',
                            fontWeight: 800,
                            mx: 'auto',
                            mb: 2,
                        }}
                    >
                        {username?.charAt(0).toUpperCase()}
                    </Avatar>

                    <Typography
                        variant="h5"
                        sx={{
                            fontWeight: 800,
                            color: theme.palette.text.primary,
                            mb: 0.5,
                        }}
                    >
                        {username}
                    </Typography>

                    <Chip
                        label="Active Member"
                        size="small"
                        sx={{
                            bgcolor: `${theme.palette.primary.main}15`,
                            color: theme.palette.primary.main,
                            fontWeight: 600,
                            mb: 3,
                        }}
                    />

                    <Divider sx={{ mb: 3 }} />

                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            gap: 6,
                        }}
                    >
                        <Box>
                            <Typography
                                variant="h5"
                                sx={{
                                    fontWeight: 900,
                                    color: theme.palette.primary.main,
                                }}
                            >
                                {cartCount}
                            </Typography>

                            <Typography
                                variant="body2"
                                sx={{
                                    color: theme.palette.text.secondary,
                                }}
                            >
                                Cart Items
                            </Typography>
                        </Box>

                        <Box>
                            <Typography
                                variant="h5"
                                sx={{
                                    fontWeight: 900,
                                    color: theme.palette.primary.main,
                                }}
                            >
                                {cartData?.data?.totalCartPrice ?? 0}
                            </Typography>

                            <Typography
                                variant="body2"
                                sx={{
                                    color: theme.palette.text.secondary,
                                }}
                            >
                                Total EGP
                            </Typography>
                        </Box>
                    </Box>
                </Paper>

                <Paper
                    elevation={0}
                    sx={{
                        p: 3,
                        borderRadius: 4,
                        border: `1px solid ${theme.palette.divider}`,
                        bgcolor: theme.palette.background.paper,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                    }}
                >
                    <Typography
                        variant="body2"
                        sx={{
                            fontWeight: 700,
                            color: theme.palette.text.secondary,
                            mb: 1,
                        }}
                    >
                        QUICK ACTIONS
                    </Typography>

                    <Button
                        component={Link}
                        href="/cart"
                        fullWidth
                        startIcon={<ShoppingCartIcon />}
                        sx={{
                            justifyContent: 'flex-start',
                            color: theme.palette.text.primary,
                            fontWeight: 600,
                            textTransform: 'none',
                            py: 1.5,
                            px: 2,
                            borderRadius: 2,
                            border: `1px solid ${theme.palette.divider}`,

                            '&:hover': {
                                bgcolor: theme.palette.background.default,
                                borderColor: theme.palette.primary.main,
                            },
                        }}
                    >
                        View My Cart

                        {cartCount > 0 && (
                            <Chip
                                label={cartCount}
                                size="small"
                                sx={{
                                    ml: 'auto',
                                    bgcolor: theme.palette.primary.main,
                                    color: '#fff',
                                    fontWeight: 700,
                                    height: 22,
                                }}
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
                            color: theme.palette.text.primary,
                            fontWeight: 600,
                            textTransform: 'none',
                            py: 1.5,
                            px: 2,
                            borderRadius: 2,
                            border: `1px solid ${theme.palette.divider}`,

                            '&:hover': {
                                bgcolor: theme.palette.background.default,
                                borderColor: theme.palette.primary.main,
                            },
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
                            color: theme.palette.error.main,
                            fontWeight: 600,
                            textTransform: 'none',
                            py: 1.5,
                            px: 2,
                            borderRadius: 2,
                            border: `1px solid ${theme.palette.error.light}`,

                            '&:hover': {
                                bgcolor: `${theme.palette.error.main}10`,
                                borderColor: theme.palette.error.main,
                            },
                        }}
                    >
                        Logout
                    </Button>
                </Paper>
            </Container>
        </Box>
    )
}