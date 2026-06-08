'use client'

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/lib/store'
import { fetchProducts } from '@/lib/productsSlice'
import Product from '../_Components/product/Product' 
import { Box, Container, Typography, Grid, Chip, CircularProgress } from '@mui/material'

export default function ProductsPage() {
    const dispatch = useDispatch<AppDispatch>()
    const { products, loading } = useSelector((state: RootState) => state.products)

    useEffect(() => {
        dispatch(fetchProducts())
    }, [dispatch])

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: '#f8f7ff', py: 8 }}>
            <Container maxWidth="xl">
                <Box sx={{ textAlign: 'center', mb: 6 }}>
                    <Chip
                        label="Our Collection"
                        sx={{ mb: 2, bgcolor: '#ede9fe', color: '#7c3aed', fontWeight: 600, fontSize: '13px' }}
                    />
                    <Typography variant="h3" sx={{ fontWeight: 800, color: '#1a1a2e', mb: 1 }}>
                        Latest{' '}
                        <Box component="span" sx={{ color: '#7c3aed' }}>Products</Box>
                    </Typography>
                </Box>

                {loading || products.length === 0 ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
                        <CircularProgress sx={{ color: '#7c3aed' }} />
                    </Box>
                ) : (
                    <Grid container spacing={3}>
                        {products.map((product) => (
                            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={product._id}>
                                <Product p={product} />
                            </Grid>
                        ))}
                    </Grid>
                )}
            </Container>
        </Box>
    )
}