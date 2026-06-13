'use client'

import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'
import Link from 'next/link'
import {
    Box, Badge, IconButton, Drawer, List,
    ListItem, ListItemButton, ListItemText, Divider, Typography
} from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, AppDispatch } from '@/lib/store'
import { logout, loadToken } from '@/lib/authSlice'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Image from 'next/image'

const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: 'Categories', href: '/categories' },
]

export default function Navbar() {
    const dispatch = useDispatch<AppDispatch>()
    const router = useRouter()
    const token = useSelector((state: RootState) => state.auth.token)
    const username = useSelector((state: RootState) => state.auth.username)
    const cartCount = useSelector((state: RootState) => state.cart.cartCount)
    const [drawerOpen, setDrawerOpen] = useState(false)

    useEffect(() => {
        dispatch(loadToken())
    }, [dispatch])

    function handleLogout() {
        dispatch(logout())
        router.push('/login')
        setDrawerOpen(false)
    }

    return (
        <>
            <AppBar
                position="static"
                elevation={0}
                sx={{
                    bgcolor: '#EDEDE9',
                    borderBottom: '1px solid #d6d5d0',
                }}
            >
                <Toolbar>
                    <Box
                        component={Link}
                        href="/"
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            mr: 3,
                            textDecoration: 'none',
                        }}
                    >
                        <Image
                            src="/logo.png"
                            alt="Logo"
                            width={120}
                            height={50}
                            style={{ objectFit: 'contain' }}
                        />
                    </Box>

                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: 'none', md: 'flex' },
                            gap: 1,
                        }}
                    >
                        {navLinks.map((link) => (
                            <Button
                                key={link.href}
                                component={Link}
                                href={link.href}
                                sx={{
                                    color: '#1a1a2e',
                                    fontWeight: 600,
                                    textTransform: 'none',
                                    '&:hover': {
                                        bgcolor: 'rgba(0,0,0,0.05)',
                                    },
                                }}
                            >
                                {link.label}
                            </Button>
                        ))}
                    </Box>

                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: 'flex', md: 'none' },
                        }}
                    />

                    <Box
                        sx={{
                            display: { xs: 'none', md: 'flex' },
                            alignItems: 'center',
                            gap: 1.5,
                        }}
                    >
                        {token && (
                            <>
                                <Button
                                    component={Link}
                                    href="/profile"
                                    sx={{
                                        color: '#1a1a2e',
                                        fontWeight: 600,
                                        textTransform: 'none',
                                        '&:hover': {
                                            bgcolor: 'rgba(0,0,0,0.05)',
                                        },
                                    }}
                                >
                                    Hi, {username} 👤
                                </Button>

                                <IconButton
                                    component={Link}
                                    href="/cart"
                                    sx={{ color: '#7c3aed' }}
                                >
                                    <Badge
                                        badgeContent={cartCount}
                                        color="error"
                                    >
                                        <ShoppingCartIcon />
                                    </Badge>
                                </IconButton>

                                <IconButton
                                    onClick={handleLogout}
                                    sx={{
                                        color: '#1a1a2e',
                                        '&:hover': {
                                            color: '#7c3aed',
                                            bgcolor:
                                                'rgba(124,58,237,0.05)',
                                        },
                                    }}
                                >
                                    <LogoutIcon />
                                </IconButton>
                            </>
                        )}

                        {!token && (
                            <>
                                <Button
                                    component={Link}
                                    href="/login"
                                    sx={{
                                        color: '#1a1a2e',
                                        fontWeight: 600,
                                        textTransform: 'none',
                                    }}
                                >
                                    Login
                                </Button>

                                <Button
                                    component={Link}
                                    href="/register"
                                    variant="contained"
                                    sx={{
                                        bgcolor: '#7c3aed',
                                        color: '#fff',
                                        fontWeight: 600,
                                        textTransform: 'none',
                                        borderRadius: 2,
                                        '&:hover': {
                                            bgcolor: '#6d28d9',
                                        },
                                    }}
                                >
                                    Register
                                </Button>
                            </>
                        )}
                    </Box>

                    <Box
                        sx={{
                            display: { xs: 'flex', md: 'none' },
                            alignItems: 'center',
                            gap: 1,
                        }}
                    >
                        {token && (
                            <IconButton
                                component={Link}
                                href="/cart"
                                sx={{ color: '#7c3aed' }}
                            >
                                <Badge
                                    badgeContent={cartCount}
                                    color="error"
                                >
                                    <ShoppingCartIcon />
                                </Badge>
                            </IconButton>
                        )}

                        <IconButton
                            onClick={() => setDrawerOpen(true)}
                            sx={{ color: '#1a1a2e' }}
                        >
                            <MenuIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>

            <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
            >
                <Box
                    sx={{
                        width: 260,
                        height: '100%',
                        bgcolor: '#EDEDE9',
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            p: 2,
                        }}
                    >
                        <Image
                            src="/logo.png"
                            alt="Logo"
                            width={90}
                            height={38}
                            style={{ objectFit: 'contain' }}
                        />

                        <IconButton
                            onClick={() => setDrawerOpen(false)}
                            sx={{ color: '#1a1a2e' }}
                        >
                            <CloseIcon />
                        </IconButton>
                    </Box>

                    <Divider sx={{ borderColor: '#d6d5d0' }} />

                    <List>
                        {navLinks.map((link) => (
                            <ListItem key={link.href} disablePadding>
                                <ListItemButton
                                    component={Link}
                                    href={link.href}
                                    onClick={() => setDrawerOpen(false)}
                                    sx={{
                                        '&:hover': {
                                            bgcolor:
                                                'rgba(0,0,0,0.05)',
                                        },
                                    }}
                                >
                                    <ListItemText
                                        primary={link.label}
                                        slotProps={{
                                            primary: {
                                                style: {
                                                    fontWeight: 600,
                                                    color: '#1a1a2e',
                                                },
                                            },
                                        }}
                                    />
                                </ListItemButton>
                            </ListItem>
                        ))}

                        {token && (
                            <ListItem disablePadding>
                                <ListItemButton
                                    component={Link}
                                    href="/profile"
                                    onClick={() => setDrawerOpen(false)}
                                    sx={{
                                        '&:hover': {
                                            bgcolor:
                                                'rgba(0,0,0,0.05)',
                                        },
                                    }}
                                >
                                    <ListItemText
                                        primary="Profile"
                                        slotProps={{
                                            primary: {
                                                style: {
                                                    fontWeight: 600,
                                                    color: '#7c3aed',
                                                },
                                            },
                                        }}
                                    />
                                </ListItemButton>
                            </ListItem>
                        )}
                    </List>

                    <Divider sx={{ borderColor: '#d6d5d0' }} />

                    <Box
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 1.5,
                            mt: 'auto',
                        }}
                    >
                        {token ? (
                            <>
                                <Typography
                                    sx={{
                                        fontSize: '14px',
                                        fontWeight: 500,
                                        color: '#1a1a2e',
                                        textAlign: 'center',
                                    }}
                                >
                                    Hi, {username} 👋
                                </Typography>

                                <Button
                                    fullWidth
                                    onClick={handleLogout}
                                    startIcon={<LogoutIcon />}
                                    sx={{
                                        color: '#ef4444',
                                        fontWeight: 600,
                                        textTransform: 'none',
                                        border: '1px solid #ef4444',
                                        borderRadius: 2,
                                        '&:hover': {
                                            bgcolor:
                                                'rgba(239,68,68,0.05)',
                                        },
                                    }}
                                >
                                    Logout
                                </Button>
                            </>
                        ) : (
                            <>
                                <Button
                                    fullWidth
                                    component={Link}
                                    href="/login"
                                    onClick={() => setDrawerOpen(false)}
                                    sx={{
                                        color: '#1a1a2e',
                                        fontWeight: 600,
                                        textTransform: 'none',
                                        border: '1px solid #d6d5d0',
                                        borderRadius: 2,
                                        '&:hover': {
                                            bgcolor:
                                                'rgba(0,0,0,0.05)',
                                        },
                                    }}
                                >
                                    Login
                                </Button>

                                <Button
                                    fullWidth
                                    component={Link}
                                    href="/register"
                                    onClick={() => setDrawerOpen(false)}
                                    variant="contained"
                                    sx={{
                                        bgcolor: '#7c3aed',
                                        color: '#fff',
                                        fontWeight: 600,
                                        textTransform: 'none',
                                        borderRadius: 2,
                                        '&:hover': {
                                            bgcolor: '#6d28d9',
                                        },
                                    }}
                                >
                                    Register
                                </Button>
                            </>
                        )}
                    </Box>
                </Box>
            </Drawer>
        </>
    )
}