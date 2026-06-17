'use client'

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/lib/store'
import { fetchCategories } from '@/lib/categoriesSlice'
import { Box, Container, Typography, Grid, Chip, CircularProgress } from '@mui/material'
import Link from 'next/link'
import Image from 'next/image'

export default function CategoriesPage() {
    const dispatch = useDispatch<AppDispatch>()
    const { categories, loading } = useSelector((state: RootState) => state.categories)

    useEffect(() => {
        dispatch(fetchCategories())
    }, [dispatch])

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: '#F5F5F5', py: 8 }}>
            <Container maxWidth="xl">

                <Box sx={{ textAlign: 'center', mb: 6 }}>
                    <Chip
                        label="Browse"
                        sx={{ mb: 2, bgcolor: 'rgba(255,87,34,0.1)', color: '#FF5722', fontWeight: 600 }}
                    />
                    <Typography variant="h3" sx={{ fontWeight: 800, color: '#303841' }}>
                        All{' '}
                        <Box component="span" sx={{ color: '#FF5722' }}>Categories</Box>
                    </Typography>
                </Box>

                {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
                        <CircularProgress sx={{ color: '#FF5722' }} />
                    </Box>
                ) : (
                    <Grid container spacing={3}>
                        {categories.map((cat) => (
                            <Grid size={{ xs: 6, sm: 4, md: 3 }} key={cat._id}>
                                <Box
                                    component={Link}
                                    href={`/products?category=${cat._id}`}
                                    sx={{ textDecoration: 'none', display: 'block' }}
                                >
                                    <Box sx={{
                                        borderRadius: 4,
                                        overflow: 'hidden',
                                        position: 'relative',
                                        height: 220,
                                        cursor: 'pointer',
                                        '&:hover .overlay': { opacity: 1 },
                                        '&:hover img': { transform: 'scale(1.08)' },
                                    }}>
                                        <Image
                                            src={cat.image}
                                            alt={cat.name}
                                            fill
                                            style={{ objectFit: 'cover', transition: 'transform 0.35s ease' }}
                                        />

                                        {/* Dark Overlay */}
                                        <Box sx={{
                                            position: 'absolute', inset: 0,
                                            background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.1) 60%)',
                                        }} />

                                        {/* Hover Overlay */}
                                        <Box className="overlay" sx={{
                                            position: 'absolute', inset: 0,
                                            bgcolor: 'rgba(255,87,34,0.45)',
                                            opacity: 0,
                                            transition: 'opacity 0.3s ease',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        }}>
                                            <Typography sx={{
                                                color: '#fff', fontWeight: 700, fontSize: '14px',
                                                border: '2px solid #fff', px: 2, py: 0.8, borderRadius: 2,
                                            }}>
                                                Shop Now →
                                            </Typography>
                                        </Box>

                                        {/* Category Name */}
                                        <Box sx={{ position: 'absolute', bottom: 0, left: 0, right: 0, p: 2 }}>
                                            <Typography sx={{
                                                color: '#fff', fontWeight: 800, fontSize: '16px',
                                                textShadow: '0 1px 4px rgba(0,0,0,0.4)',
                                            }}>
                                                {cat.name}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                )}
            </Container>
        </Box>
    )
}