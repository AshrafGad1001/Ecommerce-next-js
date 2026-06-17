'use client'

import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/lib/store'
import { fetchProducts } from '@/lib/productsSlice'
import { fetchCategories } from '@/lib/categoriesSlice'
import Product from '../_Components/product/Product'
import { useSearchParams } from 'next/navigation'
import InboxIcon from '@mui/icons-material/Inbox'
import { useTheme } from '@mui/material/styles'
import {
    Box, Container, Typography, Grid,
    Chip, CircularProgress
} from '@mui/material'
import { Suspense } from 'react'
import ThemeRegistry from '../_Components/ThemeRegistry'

function ProductsContent() {
    const theme = useTheme()
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
        <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', py: 8 }}>
            <Container maxWidth="xl">

                {/* Header */}
                <Box sx={{ textAlign: 'center', mb: 4 }}>
                    <Chip
                        label="Our Collection"
                        sx={{
                            mb: 2,
                            bgcolor: `${theme.palette.primary.main}22`,
                            color: theme.palette.primary.main,
                            fontWeight: 600,
                        }}
                    />
                    <Typography variant="h3" sx={{ fontWeight: 800, color: 'text.primary' }}>
                        {searchParam ? (
                            <>
                                Results for{' '}
                                <Box component="span" sx={{ color: 'primary.main' }}>
                                    &ldquo;{searchParam}&rdquo;
                                </Box>
                            </>
                        ) : (
                            <>
                                Latest{' '}
                                <Box component="span" sx={{ color: 'primary.main' }}>Products</Box>
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
                                borderColor: !activeCategory ? 'primary.main' : '#e5e7eb',
                                bgcolor: !activeCategory ? 'primary.main' : '#fff',
                                color: !activeCategory ? '#fff' : 'text.secondary',
                                transition: 'all 0.2s ease',
                                '&:hover': {
                                    borderColor: 'primary.main',
                                    color: !activeCategory ? '#fff' : 'primary.main',
                                    bgcolor: !activeCategory
                                        ? theme.palette.primary.dark
                                        : `${theme.palette.primary.main}11`,
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
                                    borderColor: activeCategory === cat._id ? 'primary.main' : '#e5e7eb',
                                    bgcolor: activeCategory === cat._id ? 'primary.main' : '#fff',
                                    color: activeCategory === cat._id ? '#fff' : 'text.secondary',
                                    transition: 'all 0.2s ease',
                                    '&:hover': {
                                        borderColor: 'primary.main',
                                        color: activeCategory === cat._id ? '#fff' : 'primary.main',
                                        bgcolor: activeCategory === cat._id
                                            ? theme.palette.primary.dark
                                            : `${theme.palette.primary.main}11`,
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
                        <CircularProgress color="primary" />
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
                        <InboxIcon sx={{ fontSize: '5rem', color: 'text.disabled' }} />
                        <Typography variant="h6" sx={{ fontWeight: 700, color: 'text.secondary' }}>
                            {searchParam ? `No results for ${searchParam}` : 'No Products in this Category'}
                        </Typography>
                        <Chip
                            label="Show All Products"
                            onClick={() => setSelected(null)}
                            sx={{
                                bgcolor: 'primary.main',
                                color: '#fff',
                                fontWeight: 600,
                                cursor: 'pointer',
                                px: 2,
                                py: 2.5,
                                fontSize: '14px',
                                '&:hover': { bgcolor: 'primary.dark' },
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
        <ThemeRegistry>
            <Suspense fallback={
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
                    <CircularProgress color="primary" />
                </Box>
            }>
                <ProductsContent />
            </Suspense>
        </ThemeRegistry>
    )
}