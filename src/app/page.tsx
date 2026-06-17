'use client'

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/lib/store'
import { fetchProducts } from '@/lib/productsSlice'
import { fetchCategories } from '@/lib/categoriesSlice'
import { fetchBrands } from '@/lib/brandsSlice'
import Product from './_Components/product/Product'
import Link from 'next/link'
import Image from 'next/image'
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
    Paper
} from '@mui/material'

export default function Home() {
    const dispatch = useDispatch<AppDispatch>()
    const { products, loading: productsLoading } = useSelector((state: RootState) => state.products)
    const { categories } = useSelector((state: RootState) => state.categories)
    const { brands } = useSelector((state: RootState) => state.brands)
    const token = useSelector((state: RootState) => state.auth.token)

    useEffect(() => {
        dispatch(fetchProducts())
        dispatch(fetchCategories())
        dispatch(fetchBrands())
    }, [dispatch])

    const featured = products.slice(0, 8)

    return (
        <Box sx={{ bgcolor: '#F5F5F5', minHeight: '100vh' }}>

            {/*  HERO SECTION  */}
            <Box sx={{
                background: 'linear-gradient(135deg, #F4F6F8 0%, #E9ECEF 100%)',
                color: '#303841',
                py: { xs: 8, md: 12 },
                overflow: 'hidden',
                position: 'relative',
            }}>

                <Box sx={{ position: 'absolute', top: -80, right: -80, width: 300, height: 300, borderRadius: '50%', bgcolor: 'rgba(118,171,174,0.12)' }} />
                <Box sx={{ position: 'absolute', bottom: -60, left: -60, width: 220, height: 220, borderRadius: '50%', bgcolor: 'rgba(255,87,34,0.1)' }} />

                <Container maxWidth="lg">
                    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', gap: { xs: 6, md: 8 } }}>

                        <Box sx={{ flex: 1, textAlign: { xs: 'center', md: 'left' }, zIndex: 1 }}>
                            <Chip
                                label="New Collection 2026"
                                sx={{ mb: 3, bgcolor: 'rgba(118,171,174,0.15)', color: '#76ABAE', fontWeight: 600, fontSize: '13px', border: '1px solid rgba(118,171,174,0.3)' }}
                            />
                            <Typography variant="h2" sx={{ fontWeight: 900, fontSize: { xs: '2rem', md: '3.2rem' }, lineHeight: 1.2, mb: 2, color: '#303841' }}>
                                Discover Your
                                <Box component="span" sx={{ display: 'block', color: '#FF5722' }}>
                                    Perfect Style
                                </Box>
                            </Typography>
                            <Typography sx={{ color: '#5A6A75', fontSize: { xs: '1rem', md: '1.1rem' }, mb: 4, maxWidth: 420, mx: { xs: 'auto', md: 0 }, lineHeight: 1.7 }}>
                                Shop the latest fashion trends with free shipping on orders over 500 EGP.
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: { xs: 'center', md: 'flex-start' } }}>
                                <Button component={Link} href="/products" variant="contained" size="large" sx={{ bgcolor: '#FF5722', color: '#fff', fontWeight: 800, px: 4, py: 1.5, borderRadius: 3, fontSize: '15px', textTransform: 'none', '&:hover': { bgcolor: '#e64a19' } }}>
                                    Shop Now →
                                </Button>
                                {!token && (
                                    <Button component={Link} href="/register" variant="outlined" size="large" sx={{ borderColor: '#76ABAE', color: '#76ABAE', fontWeight: 700, px: 4, py: 1.5, borderRadius: 3, fontSize: '15px', textTransform: 'none', '&:hover': { borderColor: '#598b8e', bgcolor: 'rgba(118,171,174,0.05)' } }}>
                                        Create Account
                                    </Button>
                                )}
                            </Box>
                            {/* Stats */}
                            <Box sx={{ display: 'flex', gap: 4, mt: 5, justifyContent: { xs: 'center', md: 'flex-start' } }}>
                                {[
                                    { number: '10K+', label: 'Products' },
                                    { number: '50K+', label: 'Customers' },
                                    { number: '4.9★', label: 'Rating' },
                                ].map((stat) => (
                                    <Box key={stat.label}>
                                        <Typography sx={{ fontWeight: 900, fontSize: '1.5rem', color: '#FF5722' }}>{stat.number}</Typography>
                                        <Typography sx={{ color: '#7A8B94', fontSize: '12px', fontWeight: 600 }}>{stat.label}</Typography>
                                    </Box>
                                ))}
                            </Box>
                        </Box>
                        {/* Right - Image */}
                        <Box sx={{ flex: 1, zIndex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Box sx={{ width: { xs: 260, md: 420 }, height: { xs: 260, md: 420 }, borderRadius: '30px', overflow: 'hidden', boxShadow: '0 20px 50px rgba(48,56,65,0.12)', border: '4px solid #fff', bgcolor: '#fff' }}>
                                <img src="/hero-image.jpg" alt="Fashion Collection" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </Box>
                        </Box>
                    </Box>
                </Container>
            </Box>



            {/*   FEATURED PRODUCTS   */}
            <Box sx={{ py: { xs: 4, md: 8 } }}>
                <Container maxWidth="xl">
                    <Box sx={{ textAlign: 'center', mb: { xs: 4, md: 6 } }}>
                        <Chip label="Featured" sx={{ mb: 1.5, bgcolor: 'rgba(255,87,34,0.1)', color: '#FF5722', fontWeight: 600, fontSize: '12px' }} />
                        <Typography sx={{ fontWeight: 800, color: '#303841', fontSize: { xs: '1.6rem', md: '2.2rem' } }}>
                            Top <Box component="span" sx={{ color: '#FF5722' }}>Products</Box>
                        </Typography>
                        <Typography sx={{ color: '#76ABAE', mt: 0.5, fontWeight: 500, fontSize: { xs: '12px', md: '14px' } }}>
                            Hand-picked products just for you
                        </Typography>
                    </Box>

                    {productsLoading || products.length === 0 ? (
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
                                spaceBetween={16}
                                slidesPerView={1.2}
                                breakpoints={{
                                    480: { slidesPerView: 2 },
                                    768: { slidesPerView: 3 },
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

                            <Box sx={{ textAlign: 'center', mt: 1 }}>
                                <Button component={Link} href="/products" variant="outlined" size="large" sx={{ borderColor: '#FF5722', color: '#FF5722', fontWeight: 700, px: { xs: 4, md: 5 }, py: 1.2, borderRadius: 3, textTransform: 'none', fontSize: { xs: '13px', md: '15px' }, '&:hover': { bgcolor: 'rgba(255,87,34,0.05)', borderColor: '#e64a19' } }}>
                                    View All Products →
                                </Button>
                            </Box>
                        </>
                    )}
                </Container>
            </Box>


            {/*   CATEGORIES SLIDER   */}
            <Box sx={{ bgcolor: '#fff', py: { xs: 4, md: 6 }, borderBottom: '1px solid #e5e7eb' }}>
                <Container maxWidth="xl">
                    <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography sx={{ fontWeight: 800, color: '#303841', fontSize: { xs: '1.4rem', md: '2.2rem' } }}>
                            Shop by <Box component="span" sx={{ color: '#FF5722' }}>Category</Box>
                        </Typography>
                        <Button component={Link} href="/categories" sx={{ color: '#76ABAE', fontWeight: 600, textTransform: 'none', fontSize: { xs: '13px', md: '16px' } }}>
                            See All →
                        </Button>
                    </Box>

                    <Swiper
                        modules={[Autoplay]}
                        autoplay={{ delay: 2500, disableOnInteraction: false }}
                        spaceBetween={12}
                        slidesPerView={2.3} // كارتين وجزء بسيط من الثالث لجمالية الحركة على الموبايل
                        breakpoints={{
                            500: { slidesPerView: 3, spaceBetween: 16 },
                            768: { slidesPerView: 4, spaceBetween: 16 },
                            1024: { slidesPerView: 5, spaceBetween: 18 },
                            1400: { slidesPerView: 6, spaceBetween: 18 },
                        }}
                    >
                        {categories.map((cat) => (
                            <SwiperSlide key={cat._id}>
                                <Box
                                    component={Link}
                                    href={`/products?category=${cat._id}`}
                                    sx={{
                                        textDecoration: 'none',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: 1,
                                        p: 1,
                                        borderRadius: 3,
                                        bgcolor: '#F9FAFB',
                                        border: '1px solid #f3f4f6',
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            transform: 'translateY(-5px)',
                                            boxShadow: '0 10px 25px rgba(0,0,0,0.06)',
                                            borderColor: '#FF5722'
                                        }
                                    }}
                                >
                                    <Box sx={{
                                        width: '100%',
                                        height: { xs: 110, sm: 130, md: 150 }, // ارتفاع مرن متناسق مع عرض الشاشة
                                        borderRadius: 2.5,
                                        overflow: 'hidden',
                                        position: 'relative',
                                        bgcolor: '#fff'
                                    }}>
                                        <Image src={cat.image} alt={cat.name} fill style={{ objectFit: 'cover' }} />
                                    </Box>
                                    <Typography sx={{ fontWeight: 700, fontSize: { xs: '12px', md: '14px' }, color: '#303841', textAlign: 'center', pb: 0.5, px: 0.5, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                        {cat.name}
                                    </Typography>
                                </Box>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </Container>
            </Box>


            {/*   BRANDS SLIDER   */}
            <Box sx={{ bgcolor: '#fff', py: { xs: 4, md: 6 }, borderBottom: '1px solid #e5e7eb' }}>
                <Container maxWidth="xl">
                    <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography sx={{ fontWeight: 800, color: '#303841', fontSize: { xs: '1.4rem', md: '2.2rem' } }}>
                            Popular <Box component="span" sx={{ color: '#FF5722' }}>Brands</Box>
                        </Typography>
                        <Button component={Link} href="/brands" sx={{ color: '#76ABAE', fontWeight: 600, textTransform: 'none', fontSize: { xs: '13px', md: '16px' } }}>
                            All Brands →
                        </Button>
                    </Box>

                    <Swiper
                        modules={[Autoplay]}
                        autoplay={{ delay: 2000, disableOnInteraction: false }}
                        spaceBetween={12}
                        slidesPerView={3.4}
                        breakpoints={{
                            480: { slidesPerView: 4, spaceBetween: 15 },
                            768: { slidesPerView: 5, spaceBetween: 15 },
                            1024: { slidesPerView: 6, spaceBetween: 15 },
                            1400: { slidesPerView: 8, spaceBetween: 15 },
                        }}
                    >
                        {brands.map((brand) => (
                            <SwiperSlide key={brand._id}>
                                <Paper
                                    component={Link}
                                    href={`/products?brand=${brand._id}`}
                                    elevation={0}
                                    sx={{
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        p: { xs: 1, md: 1.5 },
                                        height: { xs: 55, md: 70 },
                                        borderRadius: 2, border: '1px solid #e5e7eb',
                                        textDecoration: 'none', transition: 'all 0.2s ease',
                                        '&:hover': { borderColor: '#76ABAE', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', transform: 'translateY(-2px)' }
                                    }}
                                >
                                    <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
                                        <Image src={brand.image} alt={brand.name} fill style={{ objectFit: 'contain' }} />
                                    </Box>
                                </Paper>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </Container>
            </Box>



        </Box>
    )
}