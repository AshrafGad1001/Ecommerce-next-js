'use client'

import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'
import InputBase from '@mui/material/InputBase'
import Link from 'next/link'
import {
    Box, Badge, IconButton, Drawer, List,
    ListItem, ListItemButton, ListItemText, Divider, Typography
} from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import FavoriteIcon from '@mui/icons-material/Favorite'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'
import SearchIcon from '@mui/icons-material/Search'
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
    { label: 'Brands', href: '/brands' },
    { label: 'Orders', href: '/orders' }
]

export default function Navbar() {
    const dispatch = useDispatch<AppDispatch>()
    const router = useRouter()
    const token = useSelector((state: RootState) => state.auth.token)
    const username = useSelector((state: RootState) => state.auth.username)
    const cartCount = useSelector((state: RootState) => state.cart.cartCount)
    const favoritesIds = useSelector((state: RootState) => state.favorites.favoritesIds)
    const [drawerOpen, setDrawerOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const [searchOpen, setSearchOpen] = useState(false)

    useEffect(() => {
        dispatch(loadToken())
    }, [dispatch])

    function handleLogout() {
        dispatch(logout())
        router.push('/login')
        setDrawerOpen(false)
    }

    function handleSearch(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Enter' && searchQuery.trim()) {
            router.push(`/products?search=${searchQuery.trim()}`)
            setSearchQuery('')
            setSearchOpen(false)
        }
    }

    return (
        <>
            <AppBar 
                position="fixed"
                elevation={3}
                sx={{
                    bgcolor: '#303841',
                    borderRadius: { xs: '16px', md: '24px' },
                    mx: { xs: 1, md: 2 },
                    mt: { xs: 1, md: 1 },
                    width: 'auto',
                    left: 0,
                    right: 0,
                    overflow: 'hidden',
                    zIndex: 1100,
                }}
            >
                <Toolbar>

                    {/* Logo */}
                    <Box component={Link} href="/" sx={{ display: 'flex', alignItems: 'center', mr: 3, textDecoration: 'none' }}>
                        <Image src="/logo.png" alt="Logo" width={120} height={50} style={{ objectFit: 'contain' }} />
                    </Box>

                    {/* Nav Links - Desktop */}
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, gap: 1 }}>
                        {navLinks.map((link) => (
                            <Button
                                key={link.href}
                                component={Link}
                                href={link.href}
                                sx={{
                                    color: '#F5F5F5',
                                    fontWeight: 600,
                                    textTransform: 'none',
                                    '&:hover': { bgcolor: 'rgba(255,255,255,0.08)', color: '#76ABAE' },
                                    transition: 'all 0.2s ease',
                                }}
                            >
                                {link.label}
                            </Button>
                        ))}
                    </Box>

                    {/* Spacer Mobile */}
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }} />

                    {/* Search Bar - Desktop */}
                    <Box sx={{
                        display: { xs: 'none', md: 'flex' },
                        alignItems: 'center',
                        bgcolor: '#F5F5F5',
                        borderRadius: '999px',
                        px: 2,
                        py: 0.5,
                        mr: 2,
                        border: '1px solid rgba(0,0,0,0.05)',
                        '&:focus-within': { borderColor: '#76ABAE', bgcolor: '#FFFFFF' },
                        transition: 'all 0.2s ease',
                    }}>
                        <SearchIcon sx={{ color: 'rgba(48, 56, 65, 0.6)', fontSize: 18, mr: 1 }} />
                        <InputBase
                            placeholder="Search products..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={handleSearch}
                            sx={{
                                fontSize: '14px', 
                                width: 180, 
                                color: '#303841',
                                '& input::placeholder': { color: 'rgba(48, 56, 65, 0.5)', opacity: 1 } 
                            }}
                        />
                    </Box>

                    {/* Right Side - Desktop */}
                    <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 1.5 }}>
                        {token && (
                            <>
                                <Button
                                    component={Link}
                                    href="/profile"
                                    sx={{
                                        color: '#F5F5F5',
                                        fontWeight: 600,
                                        textTransform: 'none',
                                        '&:hover': { bgcolor: 'rgba(255,255,255,0.08)', color: '#76ABAE' },
                                    }}
                                >
                                    Hi, {username} 
                                </Button>

                                <IconButton component={Link} href="/favorites" sx={{
                                    color: '#FF5722',
                                    '&:hover': { bgcolor: 'rgba(255,87,34,0.1)' },
                                }}>
                                    <Badge badgeContent={favoritesIds.length} color="error">
                                        <FavoriteIcon />
                                    </Badge>
                                </IconButton>

                                <IconButton component={Link} href="/cart" sx={{
                                    color: '#76ABAE',
                                    '&:hover': { bgcolor: 'rgba(118,171,174,0.1)' },
                                }}>
                                    <Badge badgeContent={cartCount} color="error">
                                        <ShoppingCartIcon />
                                    </Badge>
                                </IconButton>

                                <IconButton
                                    onClick={handleLogout}
                                    sx={{
                                        color: 'rgba(255,255,255,0.7)',
                                        '&:hover': { color: '#FF5722', bgcolor: 'rgba(255,87,34,0.1)' },
                                        transition: 'all 0.2s ease',
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
                                        color: '#F5F5F5',
                                        fontWeight: 600,
                                        textTransform: 'none',
                                        '&:hover': { color: '#76ABAE' },
                                    }}
                                >
                                    Login
                                </Button>
                                <Button
                                    component={Link}
                                    href="/register"
                                    variant="contained"
                                    sx={{
                                        bgcolor: '#FF5722',
                                        color: '#fff',
                                        fontWeight: 600,
                                        textTransform: 'none',
                                        borderRadius: 2,
                                        '&:hover': { bgcolor: '#e64a19' },
                                    }}
                                >
                                    Register
                                </Button>
                            </>
                        )}
                    </Box>

                    {/* Mobile - Search + Favorites + Cart + Menu */}
                    <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center', gap: 1 }}>
                        <IconButton onClick={() => setSearchOpen(!searchOpen)} sx={{ color: '#F5F5F5' }}>
                            <SearchIcon />
                        </IconButton>

                        {token && (
                            <>
                                <IconButton component={Link} href="/favorites" sx={{ color: '#FF5722' }}>
                                    <Badge badgeContent={favoritesIds.length} color="error">
                                        <FavoriteIcon />
                                    </Badge>
                                </IconButton>
                                <IconButton component={Link} href="/cart" sx={{ color: '#76ABAE' }}>
                                    <Badge badgeContent={cartCount} color="error">
                                        <ShoppingCartIcon />
                                    </Badge>
                                </IconButton>
                            </>
                        )}

                        <IconButton onClick={() => setDrawerOpen(true)} sx={{ color: '#F5F5F5' }}>
                            <MenuIcon />
                        </IconButton>
                    </Box>

                </Toolbar>

                {/* Mobile Search Bar */}
                {searchOpen && (
                    <Box sx={{
                        display: { xs: 'flex', md: 'none' },
                        alignItems: 'center',
                        bgcolor: '#F5F5F5', 
                        mx: 2,
                        mb: 1.5,
                        px: 2,
                        py: 0.5,
                        borderRadius: '999px',
                        border: '1px solid rgba(0,0,0,0.05)',
                        '&:focus-within': { borderColor: '#76ABAE', bgcolor: '#FFFFFF' },
                    }}>
                        <SearchIcon sx={{ color: 'rgba(48, 56, 65, 0.6)', fontSize: 18, mr: 1 }} />
                        <InputBase
                            autoFocus
                            fullWidth
                            placeholder="Search products..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={handleSearch}
                            sx={{
                                fontSize: '14px',
                                color: '#303841',
                                '& input::placeholder': { color: 'rgba(48, 56, 65, 0.5)' }
                            }}
                        />
                    </Box>
                )}
            </AppBar>

            {/* MOBILE DRAWER */}
            <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
                <Box sx={{ width: 260, height: '100%', bgcolor: '#303841', display: 'flex', flexDirection: 'column' }}>

                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 2 }}>
                        <Image src="/logo.png" alt="Logo" width={90} height={38} style={{ objectFit: 'contain' }} />
                        <IconButton onClick={() => setDrawerOpen(false)} sx={{ color: '#F5F5F5' }}>
                            <CloseIcon />
                        </IconButton>
                    </Box>

                    <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)' }} />

                    <List>
                        {navLinks.map((link) => (
                            <ListItem key={link.href} disablePadding>
                                <ListItemButton
                                    component={Link}
                                    href={link.href}
                                    onClick={() => setDrawerOpen(false)}
                                    sx={{ '&:hover': { bgcolor: 'rgba(255,255,255,0.08)' } }}
                                >
                                    <ListItemText
                                        primary={link.label}
                                        slotProps={{ primary: { style: { fontWeight: 600, color: '#F5F5F5' } } }}
                                    />
                                </ListItemButton>
                            </ListItem>
                        ))}

                        {token && (
                            <>
                                <ListItem disablePadding>
                                    <ListItemButton
                                        component={Link}
                                        href="/favorites"
                                        onClick={() => setDrawerOpen(false)}
                                        sx={{ '&:hover': { bgcolor: 'rgba(255,255,255,0.08)' } }}
                                    >
                                        <ListItemText
                                            primary={`Favorites (${favoritesIds.length})`}
                                            slotProps={{ primary: { style: { fontWeight: 600, color: '#FF5722' } } }}
                                        />
                                    </ListItemButton>
                                </ListItem>
                                <ListItem disablePadding>
                                    <ListItemButton
                                        component={Link}
                                        href="/profile"
                                        onClick={() => setDrawerOpen(false)}
                                        sx={{ '&:hover': { bgcolor: 'rgba(255,255,255,0.08)' } }}
                                    >
                                        <ListItemText
                                            primary="Profile"
                                            slotProps={{ primary: { style: { fontWeight: 600, color: '#76ABAE' } } }}
                                        />
                                    </ListItemButton>
                                </ListItem>
                            </>
                        )}
                    </List>

                    <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)' }} />

                    <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 1.5, mt: 'auto' }}>
                        {token ? (
                            <>
                                <Typography sx={{ fontSize: '14px', fontWeight: 500, color: '#F5F5F5', textAlign: 'center' }}>
                                    Hi, {username} 
                                </Typography>
                                <Button
                                    fullWidth
                                    onClick={handleLogout}
                                    startIcon={<LogoutIcon />}
                                    sx={{
                                        color: '#FF5722', fontWeight: 600, textTransform: 'none',
                                        border: '1px solid #FF5722', borderRadius: 2,
                                        '&:hover': { bgcolor: 'rgba(255,87,34,0.1)' },
                                    }}
                                >
                                    Logout
                                </Button>
                            </>
                        ) : (
                            <>
                                <Button
                                    fullWidth component={Link} href="/login"
                                    onClick={() => setDrawerOpen(false)}
                                    sx={{
                                        color: '#F5F5F5', fontWeight: 600, textTransform: 'none',
                                        border: '1px solid rgba(255,255,255,0.2)', borderRadius: 2,
                                        '&:hover': { bgcolor: 'rgba(255,255,255,0.08)' },
                                    }}
                                >
                                    Login
                                </Button>
                                <Button
                                    fullWidth component={Link} href="/register"
                                    onClick={() => setDrawerOpen(false)}
                                    variant="contained"
                                    sx={{
                                        bgcolor: '#FF5722', color: '#fff', fontWeight: 600,
                                        textTransform: 'none', borderRadius: 2,
                                        '&:hover': { bgcolor: '#e64a19' },
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