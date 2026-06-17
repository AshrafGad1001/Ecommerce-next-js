'use client'

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/lib/store'
import { fetchProducts } from '@/lib/productsSlice'
import Product from './_Components/product/Product'
import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import {
    Box,
    Container,
    Typography,
    Button,
    CircularProgress,
    Chip,
} from '@mui/material'

export default function Home() {
    const dispatch = useDispatch<AppDispatch>()
    const { products, loading } = useSelector((state: RootState) => state.products)
    const token = useSelector((state: RootState) => state.auth.token)

    useEffect(() => {
        dispatch(fetchProducts())
    }, [dispatch])

    const featured = products.slice(0, 8)

    return (
        <Box>

            {/* ===== HERO SECTION ===== */}
            <Box sx={{
                background: 'linear-gradient(135deg, #303841 0%, #3d4a54 100%)',
                color: '#fff',
                py: { xs: 8, md: 12 },
                overflow: 'hidden',
                position: 'relative',
            }}>
                {/* Background circles */}
                <Box sx={{
                    position: 'absolute', top: -80, right: -80,
                    width: 300, height: 300, borderRadius: '50%',
                    bgcolor: 'rgba(118,171,174,0.08)',
                }} />
                <Box sx={{
                    position: 'absolute', bottom: -60, left: -60,
                    width: 220, height: 220, borderRadius: '50%',
                    bgcolor: 'rgba(255,87,34,0.08)',
                }} />

                <Container maxWidth="lg">
                    <Box sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', md: 'row' },
                        alignItems: 'center',
                        gap: { xs: 6, md: 8 },
                    }}>

                        {/* Left - Text */}
                        <Box sx={{ flex: 1, textAlign: { xs: 'center', md: 'left' }, zIndex: 1 }}>
                            <Chip
                                label=" New Collection 2026"
                                sx={{
                                    mb: 3,
                                    bgcolor: 'rgba(118,171,174,0.15)',
                                    color: '#76ABAE',
                                    fontWeight: 600,
                                    fontSize: '13px',
                                    border: '1px solid rgba(118,171,174,0.3)',
                                }}
                            />

                            <Typography variant="h2" sx={{
                                fontWeight: 900,
                                fontSize: { xs: '2rem', md: '3.2rem' },
                                lineHeight: 1.2,
                                mb: 2,
                            }}>
                                Discover Your
                                <Box component="span" sx={{ display: 'block', color: '#FF5722' }}>
                                    Perfect Style
                                </Box>
                            </Typography>

                            <Typography sx={{
                                opacity: 0.75,
                                fontSize: { xs: '1rem', md: '1.1rem' },
                                mb: 4,
                                maxWidth: 420,
                                mx: { xs: 'auto', md: 0 },
                                lineHeight: 1.7,
                            }}>
                                Shop the latest fashion trends with free shipping on orders over 500 EGP.
                            </Typography>

                            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: { xs: 'center', md: 'flex-start' } }}>
                                <Button
                                    component={Link}
                                    href="/products"
                                    variant="contained"
                                    size="large"
                                    sx={{
                                        bgcolor: '#FF5722',
                                        color: '#fff',
                                        fontWeight: 800,
                                        px: 4,
                                        py: 1.5,
                                        borderRadius: 3,
                                        fontSize: '15px',
                                        textTransform: 'none',
                                        '&:hover': { bgcolor: '#e64a19' },
                                    }}
                                >
                                    Shop Now →
                                </Button>

                                {!token && (
                                    <Button
                                        component={Link}
                                        href="/register"
                                        variant="outlined"
                                        size="large"
                                        sx={{
                                            borderColor: 'rgba(118,171,174,0.6)',
                                            color: '#76ABAE',
                                            fontWeight: 700,
                                            px: 4,
                                            py: 1.5,
                                            borderRadius: 3,
                                            fontSize: '15px',
                                            textTransform: 'none',
                                            '&:hover': { borderColor: '#76ABAE', bgcolor: 'rgba(118,171,174,0.1)' },
                                        }}
                                    >
                                        Create Account
                                    </Button>
                                )}
                            </Box>

                            {/* Stats */}
                            <Box sx={{
                                display: 'flex',
                                gap: 4,
                                mt: 5,
                                justifyContent: { xs: 'center', md: 'flex-start' },
                            }}>
                                {[
                                    { number: '10K+', label: 'Products' },
                                    { number: '50K+', label: 'Customers' },
                                    { number: '4.9★', label: 'Rating' },
                                ].map((stat) => (
                                    <Box key={stat.label}>
                                        <Typography sx={{ fontWeight: 900, fontSize: '1.5rem', color: '#FF5722' }}>
                                            {stat.number}
                                        </Typography>
                                        <Typography sx={{ opacity: 0.6, fontSize: '12px' }}>
                                            {stat.label}
                                        </Typography>
                                    </Box>
                                ))}
                            </Box>
                        </Box>

                        {/* Right - Image */}
                        <Box sx={{
                            flex: 1, zIndex: 1,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            <Box sx={{
                                width: { xs: 260, md: 420 },
                                height: { xs: 260, md: 420 },
                                borderRadius: '30px',
                                overflow: 'hidden',
                                boxShadow: '0 25px 60px rgba(0,0,0,0.4)',
                                border: '4px solid rgba(118,171,174,0.2)',
                                bgcolor: 'rgba(255,255,255,0.05)',
                            }}>
                                <img
                                    src="/hero-image.jpg"
                                    alt="Fashion Collection"
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                            </Box>
                        </Box>

                    </Box>
                </Container>
            </Box>

            {/* ===== FEATURED PRODUCTS ===== */}
            <Box sx={{ bgcolor: '#F5F5F5', py: 10 }}>
                <Container maxWidth="xl">
                    <Box sx={{ textAlign: 'center', mb: 6 }}>
                        <Chip
                            label="Featured"
                            sx={{ mb: 2, bgcolor: 'rgba(255,87,34,0.1)', color: '#FF5722', fontWeight: 600 }}
                        />
                        <Typography variant="h4" sx={{ fontWeight: 800, color: '#303841' }}>
                            Top{' '}
                            <Box component="span" sx={{ color: '#FF5722' }}>Products</Box>
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#76ABAE', mt: 1, fontWeight: 500 }}>
                            Hand-picked products just for you
                        </Typography>
                    </Box>

                    {loading || products.length === 0 ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
                            <CircularProgress sx={{ color: '#FF5722' }} />
                        </Box>
                    ) : (
                        <>
                            <Swiper
                                modules={[Autoplay, Pagination]}
                                autoplay={{ delay: 3000, disableOnInteraction: false }}
                                pagination={{ clickable: true }}
                                loop
                                spaceBetween={20}
                                slidesPerView={1}
                                breakpoints={{
                                    600: { slidesPerView: 2 },
                                    900: { slidesPerView: 3 },
                                    1200: { slidesPerView: 4 },
                                }}
                                style={{ paddingBottom: '40px' }}
                            >
                                {featured.map((product) => (
                                    <SwiperSlide key={product._id}>
                                        <Product p={product} />
                                    </SwiperSlide>
                                ))}
                            </Swiper>

                            <Box sx={{ textAlign: 'center', mt: 2 }}>
                                <Button
                                    component={Link}
                                    href="/products"
                                    variant="outlined"
                                    size="large"
                                    sx={{
                                        borderColor: '#FF5722',
                                        color: '#FF5722',
                                        fontWeight: 700,
                                        px: 5,
                                        py: 1.5,
                                        borderRadius: 3,
                                        textTransform: 'none',
                                        fontSize: '15px',
                                        '&:hover': { bgcolor: 'rgba(255,87,34,0.05)', borderColor: '#e64a19' },
                                    }}
                                >
                                    View All Products →
                                </Button>
                            </Box>
                        </>
                    )}
                </Container>
            </Box>

        </Box>
    )
}