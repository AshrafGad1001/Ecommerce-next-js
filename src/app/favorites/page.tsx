'use client'

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/lib/store'
import { fetchFavorites, removeFromFavorites } from '@/lib/favoritesSlice'
import { addToCart } from '@/lib/cartSlice'
import {
    Box, Container, Typography, Grid,
    CircularProgress, IconButton, Chip, Paper
} from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import FavoriteIcon from '@mui/icons-material/Favorite'
import toast from 'react-hot-toast'

export default function FavoritesPage() {
    const dispatch = useDispatch<AppDispatch>()
    const { favoritesData, loading } = useSelector((state: RootState) => state.favorites)

    useEffect(() => {
        dispatch(fetchFavorites())
    }, [dispatch])

    async function handleAddToCart(productId: string) {
        await dispatch(addToCart(productId))
        toast.success('Added to cart!', {
            style: { borderRadius: '10px', background: '#1a1a2e', color: '#fff', fontWeight: 600 },
            iconTheme: { primary: '#7c3aed', secondary: '#fff' },
        })
    }

    async function handleRemove(productId: string) {
        await dispatch(removeFromFavorites(productId))
        toast.success('Removed from favorites!', {
            style: { borderRadius: '10px', background: '#1a1a2e', color: '#fff', fontWeight: 600 },
            iconTheme: { primary: '#ef4444', secondary: '#fff' },
        })
    }

    if (loading) return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
            <CircularProgress sx={{ color: '#7c3aed' }} />
        </Box>
    )

    if (favoritesData.length === 0) return (
        <Box sx={{ minHeight: '100vh', bgcolor: '#f8f7ff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 3 }}>
            <FavoriteIcon sx={{ fontSize: 80, color: '#d1d5db' }} />
            <Typography variant="h5" sx={{ fontWeight: 700, color: '#6b7280' }}>
                No Favorites Yet
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
            <Container maxWidth="xl">

                <Box sx={{ mb: 5 }}>
                    <Typography variant="h4" sx={{ fontWeight: 800, color: '#1a1a2e' }}>
                        My Favorites{' '}
                        <Chip
                            label={`${favoritesData.length} items`}
                            size="small"
                            sx={{ bgcolor: '#ede9fe', color: '#7c3aed', fontWeight: 600, ml: 1 }}
                        />
                    </Typography>
                </Box>

                <Grid container spacing={3}>
                    {favoritesData.map((product) => (
                        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={product._id}>
                            <Paper elevation={0} sx={{
                                borderRadius: 3,
                                border: '1px solid #ede9fe',
                                bgcolor: '#fff',
                                overflow: 'hidden',
                                transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                                '&:hover': {
                                    transform: 'translateY(-4px)',
                                    boxShadow: '0 12px 28px rgba(124,58,237,0.12)',
                                },
                            }}>
                                <Box
                                    component={Link}
                                    href={`/products/${product._id}`}
                                    sx={{ display: 'block', position: 'relative', height: 220, bgcolor: '#f3f4f6' }}
                                >
                                    {product.imageCover && (
                                        <Image
                                            src={product.imageCover}
                                            alt={product.title}
                                            fill
                                            style={{ objectFit: 'cover' }}
                                        />
                                    )}
                                </Box>

                                <Box sx={{ p: 2 }}>
                                    <Typography sx={{ fontWeight: 700, fontSize: '14px', color: '#1a1a2e', mb: 0.5 }}>
                                        {product.title?.split(' ').slice(0, 5).join(' ')}
                                    </Typography>
                                    <Typography sx={{ fontWeight: 800, color: '#7c3aed', fontSize: '16px', mb: 2 }}>
                                        {product.price} EGP
                                    </Typography>

                                    <Box sx={{ display: 'flex', gap: 1 }}>
                                        <Box
                                            onClick={() => handleAddToCart(product._id)}
                                            sx={{
                                                flex: 1,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                gap: 1,
                                                bgcolor: '#7c3aed',
                                                color: '#fff',
                                                fontWeight: 600,
                                                fontSize: '13px',
                                                py: 1,
                                                borderRadius: 2,
                                                cursor: 'pointer',
                                                '&:hover': { bgcolor: '#6d28d9' },
                                                transition: 'background 0.2s ease',
                                            }}
                                        >
                                            <ShoppingCartIcon sx={{ fontSize: 16 }} />
                                            Add to Cart
                                        </Box>
                                        <IconButton
                                            onClick={() => handleRemove(product._id)}
                                            sx={{
                                                color: '#ef4444',
                                                border: '1px solid #fecaca',
                                                borderRadius: 2,
                                                '&:hover': { bgcolor: '#fef2f2' },
                                            }}
                                        >
                                            <DeleteOutlinedIcon fontSize="small" />
                                        </IconButton>
                                    </Box>
                                </Box>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    )
}