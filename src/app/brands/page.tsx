'use client'

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/lib/store'
import { fetchBrands } from '@/lib/brandsSlice'
import {
    Box, Container, Typography, Grid,
    Chip, CircularProgress, Paper
} from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'

export default function BrandsPage() {
    const dispatch = useDispatch<AppDispatch>()
    const { brands, loading } = useSelector((state: RootState) => state.brands)

    useEffect(() => {
        dispatch(fetchBrands())
    }, [dispatch])

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: '#F5F5F5', py: 8 }}>
            <Container maxWidth="xl">

                <Box sx={{ textAlign: 'center', mb: 6 }}>
                    <Chip
                        label="Our Brands"
                        sx={{ mb: 2, bgcolor: 'rgba(255,87,34,0.1)', color: '#FF5722', fontWeight: 600 }}
                    />
                    <Typography variant="h3" sx={{ fontWeight: 800, color: '#303841' }}>
                        Top{' '}
                        <Box component="span" sx={{ color: '#FF5722' }}>Brands</Box>
                    </Typography>
                </Box>

                {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
                        <CircularProgress sx={{ color: '#FF5722' }} />
                    </Box>
                ) : (
                    <Grid container spacing={3}>
                        {brands.map((brand) => (
                            <Grid size={{ xs: 6, sm: 4, md: 3, lg: 2 }} key={brand._id}>
                                <Paper
                                    component={Link}
                                    href={`/products?brand=${brand._id}`}
                                    elevation={0}
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: 1.5,
                                        p: 3,
                                        borderRadius: 3,
                                        border: '1px solid #e5e7eb',
                                        bgcolor: '#fff',
                                        textDecoration: 'none',
                                        transition: 'transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease',
                                        '&:hover': {
                                            transform: 'translateY(-4px)',
                                            boxShadow: '0 12px 28px rgba(48,56,65,0.12)',
                                            borderColor: '#76ABAE',
                                        },
                                    }}
                                >
                                    <Box sx={{ position: 'relative', width: 80, height: 80 }}>
                                        {brand.image && (
                                            <Image
                                                src={brand.image}
                                                alt={brand.name}
                                                fill
                                                style={{ objectFit: 'contain' }}
                                            />
                                        )}
                                    </Box>
                                    <Typography sx={{ fontWeight: 700, color: '#303841', fontSize: '14px', textAlign: 'center' }}>
                                        {brand.name}
                                    </Typography>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                )}
            </Container>
        </Box>
    )
}