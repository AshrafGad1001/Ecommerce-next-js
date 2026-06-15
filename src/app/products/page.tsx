'use client'

import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/lib/store'
import { fetchProducts } from '@/lib/productsSlice'
import { fetchCategories } from '@/lib/categoriesSlice'
import Product from '../_Components/product/Product'
import { useSearchParams } from 'next/navigation'
import InboxIcon from '@mui/icons-material/Inbox'
import {
    Box, Container, Typography, Grid,
    Chip, CircularProgress
} from '@mui/material'
import { Suspense } from 'react'

function ProductsContent() {
    const dispatch = useDispatch<AppDispatch>()
    const { products, loading } = useSelector((state: RootState) => state.products)
    const { categories } = useSelector((state: RootState) => state.categories)
    const searchParams = useSearchParams()
    const categoryParam = searchParams.get('category')
    const brandParam = searchParams.get('brand')
    const searchParam = searchParams.get('search')
    const [selected, setSelected] = useState<string | null>(null)

    const activeCategory = categoryParam ?? selected

    useEffect(() => {
        dispatch(fetchProducts())
        dispatch(fetchCategories())
    }, [dispatch])

    const filtered = products.filter((p) => {
        const matchCategory = activeCategory ? p.category?._id === activeCategory : true
        const matchBrand = brandParam ? p.brand?._id === brandParam : true
        const matchSearch = searchParam
            ? p.title.toLowerCase().includes(searchParam.toLowerCase())
            : true
        return matchCategory && matchBrand && matchSearch
    })

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: '#f8f7ff', py: 8 }}>
            <Container maxWidth="xl">

                {/* Header */}
                <Box sx={{ textAlign: 'center', mb: 4 }}>
                    <Chip
                        label="Our Collection"
                        sx={{ mb: 2, bgcolor: '#ede9fe', color: '#7c3aed', fontWeight: 600 }}
                    />
                    <Typography variant="h3" sx={{ fontWeight: 800, color: '#1a1a2e' }}>
                        {searchParam ? (
                            <>
                                Results for{' '}
                                <Box component="span" sx={{ color: '#7c3aed' }}>&ldquo;{searchParam}&rdquo;</Box>
                            </>
                        ) : (
                            <>
                                Latest{' '}
                                <Box component="span" sx={{ color: '#7c3aed' }}>Products</Box>
                            </>
                        )}
                    </Typography>
                </Box>

                {/* Category Filter */}
                {!searchParam && (
                    <Box sx={{
                        display: 'flex',
                        gap: 1.5,
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        mb: 5,
                    }}>
                        <Box
                            onClick={() => setSelected(null)}
                            sx={{
                                px: 2.5, py: 1,
                                borderRadius: '999px',
                                cursor: 'pointer',
                                fontWeight: 600,
                                fontSize: '13px',
                                border: '2px solid',
                                borderColor: !activeCategory ? '#7c3aed' : '#e5e7eb',
                                bgcolor: !activeCategory ? '#7c3aed' : '#fff',
                                color: !activeCategory ? '#fff' : '#6b7280',
                                transition: 'all 0.2s ease',
                                '&:hover': {
                                    borderColor: '#7c3aed',
                                    color: !activeCategory ? '#fff' : '#7c3aed',
                                    bgcolor: !activeCategory ? '#6d28d9' : '#f5f3ff',
                                },
                            }}
                        >
                            All
                        </Box>

                        {categories.map((cat) => (
                            <Box
                                key={cat._id}
                                onClick={() => setSelected(cat._id)}
                                sx={{
                                    px: 2.5, py: 1,
                                    borderRadius: '999px',
                                    cursor: 'pointer',
                                    fontWeight: 600,
                                    fontSize: '13px',
                                    border: '2px solid',
                                    borderColor: activeCategory === cat._id ? '#7c3aed' : '#e5e7eb',
                                    bgcolor: activeCategory === cat._id ? '#7c3aed' : '#fff',
                                    color: activeCategory === cat._id ? '#fff' : '#6b7280',
                                    transition: 'all 0.2s ease',
                                    '&:hover': {
                                        borderColor: '#7c3aed',
                                        color: activeCategory === cat._id ? '#fff' : '#7c3aed',
                                        bgcolor: activeCategory === cat._id ? '#6d28d9' : '#f5f3ff',
                                    },
                                }}
                            >
                                {cat.name}
                            </Box>
                        ))}
                    </Box>
                )}

                {/* Products */}
                {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
                        <CircularProgress sx={{ color: '#7c3aed' }} />
                    </Box>
                ) : filtered.length === 0 ? (
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        py: 10,
                        gap: 2,
                    }}>
                        <InboxIcon sx={{ fontSize: '5rem', color: '#d1d5db' }} />
                        <Typography variant="h6" sx={{ fontWeight: 700, color: '#6b7280' }}>
                            {searchParam ? `No results for ${searchParam}` : 'No Products in this Category'}
                        </Typography>
                        <Chip
                            label="Show All Products"
                            onClick={() => setSelected(null)}
                            sx={{
                                bgcolor: '#7c3aed',
                                color: '#fff',
                                fontWeight: 600,
                                cursor: 'pointer',
                                px: 2,
                                py: 2.5,
                                fontSize: '14px',
                                '&:hover': { bgcolor: '#6d28d9' },
                            }}
                        />
                    </Box>
                ) : (
                    <Grid container spacing={3}>
                        {filtered.map((product) => (
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

export default function ProductsPage() {
    return (
        <Suspense fallback={
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
                <CircularProgress sx={{ color: '#7c3aed' }} />
            </Box>
        }>
            <ProductsContent />
        </Suspense>
    )
}