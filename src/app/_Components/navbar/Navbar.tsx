'use client'

import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Link from 'next/link'
import { Box, Badge, IconButton } from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, AppDispatch } from '@/lib/store'
import { logout, loadToken } from '@/lib/authSlice'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Navbar() {
    const dispatch = useDispatch<AppDispatch>()
    const router = useRouter()
    const token = useSelector((state: RootState) => state.auth.token)
    const username = useSelector((state: RootState) => state.auth.username)
    const cartCount = useSelector((state: RootState) => state.cart.cartCount)

    useEffect(() => {
        dispatch(loadToken())
    }, [dispatch])

    function handleLogout() {
        dispatch(logout())
        router.push('/login')
    }

    return (
        <AppBar position="static" sx={{ bgcolor: '#7c3aed' }}>
            <Toolbar>

                <Typography variant="h6" sx={{ flexGrow: 0, mr: 2, fontWeight: 800 }}>
                    MyApp
                </Typography>

                {/* Nav Links */}
                <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', gap: 2 }}>
                    <Button color="inherit" component={Link} href="/products">Products</Button>
                </Box>

                {/* Auth Buttons */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>

                    {token && (
                        <>
                            {/* Username */}
                            <Typography sx={{
                                color: 'rgba(255,255,255,0.9)',
                                fontSize: '14px',
                                fontWeight: 500,
                            }}>
                                Hi, {username}
                            </Typography>

                            {/* Cart */}
                            <IconButton color="inherit" component={Link} href="/cart">
                                <Badge badgeContent={cartCount} color="error">
                                    <ShoppingCartIcon />
                                </Badge>
                            </IconButton>
                        </>
                    )}

                    {token ? (
                        <IconButton
                            onClick={handleLogout}
                            sx={{
                                color: 'rgba(255,255,255,0.9)',
                                '&:hover': { color: '#fff', bgcolor: 'rgba(255,255,255,0.1)' },
                            }}
                        >
                            <LogoutIcon />
                        </IconButton>
                    ) : (
                        <>
                            <Button color="inherit" component={Link} href="/login">
                                Login
                            </Button>
                            <Button
                                color="inherit"
                                variant="outlined"
                                component={Link}
                                href="/register"
                                sx={{ borderColor: 'rgba(255,255,255,0.5)' }}
                            >
                                Register
                            </Button>
                        </>
                    )}

                </Box>

            </Toolbar>
        </AppBar>
    )
}