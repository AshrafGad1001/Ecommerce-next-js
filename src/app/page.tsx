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
import 'swiper/css/navigation'
import {
  Box,
  Container,
  Typography,
  Button,
  CircularProgress,
  Chip,
} from '@mui/material'

const slides = [
  {
    title: 'Shop the Best',
    highlight: 'Products Online',
    description: 'Discover thousands of products at unbeatable prices. Fast shipping, easy returns.',
    bg: 'linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)',
    accent: '#fbbf24',
  },
  {
    title: 'New Season',
    highlight: 'New Arrivals',
    description: 'Fresh styles just landed. Be the first to get the latest trends.',
    bg: 'linear-gradient(135deg, #0f766e 0%, #0369a1 100%)',
    accent: '#fbbf24',
  },
  {
    title: 'Best Deals',
    highlight: 'Limited Offers',
    description: 'Grab the hottest deals before they are gone. Save big today!',
    bg: 'linear-gradient(135deg, #b45309 0%, #dc2626 100%)',
    accent: '#fbbf24',
  },
]

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
      {/*  HERO SECTION  */}
      <Box sx={{
        background: 'linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)',
        color: '#fff',
        py: { xs: 8, md: 12 },
        overflow: 'hidden',
        position: 'relative',
      }}>
        {/* Background circles */}
        <Box sx={{
          position: 'absolute', top: -80, right: -80,
          width: 300, height: 300, borderRadius: '50%',
          bgcolor: 'rgba(255,255,255,0.05)',
        }} />
        <Box sx={{
          position: 'absolute', bottom: -60, left: -60,
          width: 220, height: 220, borderRadius: '50%',
          bgcolor: 'rgba(255,255,255,0.05)',
        }} />

        <Container maxWidth="lg">
          <Box sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            gap: { xs: 6, md: 8 },
          }}>

            {/* Left section  - Text */}
            <Box sx={{ flex: 1, textAlign: { xs: 'center', md: 'left' }, zIndex: 1 }}>
              <Chip
                label="👗 New Collection 2025"
                sx={{
                  mb: 3,
                  bgcolor: 'rgba(255,255,255,0.15)',
                  color: '#fff',
                  fontWeight: 600,
                  fontSize: '13px',
                  border: '1px solid rgba(255,255,255,0.3)',
                }}
              />

              <Typography variant="h2" sx={{
                fontWeight: 900,
                fontSize: { xs: '2rem', md: '3.2rem' },
                lineHeight: 1.2,
                mb: 2,
              }}>
                Discover Your
                <Box component="span" sx={{ display: 'block', color: '#fbbf24' }}>
                  Perfect Style
                </Box>
              </Typography>

              <Typography sx={{
                opacity: 0.85,
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
                    bgcolor: '#fbbf24',
                    color: '#1a1a2e',
                    fontWeight: 800,
                    px: 4,
                    py: 1.5,
                    borderRadius: 3,
                    fontSize: '15px',
                    textTransform: 'none',
                    '&:hover': { bgcolor: '#f59e0b' },
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
                      borderColor: 'rgba(255,255,255,0.6)',
                      color: '#fff',
                      fontWeight: 700,
                      px: 4,
                      py: 1.5,
                      borderRadius: 3,
                      fontSize: '15px',
                      textTransform: 'none',
                      '&:hover': { borderColor: '#fff', bgcolor: 'rgba(255,255,255,0.1)' },
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
                    <Typography sx={{ fontWeight: 900, fontSize: '1.5rem', color: '#fbbf24' }}>
                      {stat.number}
                    </Typography>
                    <Typography sx={{ opacity: 0.75, fontSize: '12px' }}>
                      {stat.label}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>

            {/* Right section - Image */}
            <Box sx={{
              flex: 1,
              zIndex: 1,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <Box sx={{
                width: { xs: 260, md: 420 },
                height: { xs: 260, md: 420 },
                borderRadius: '30px',
                overflow: 'hidden',
                boxShadow: '0 25px 60px rgba(0,0,0,0.3)',
                border: '4px solid rgba(255,255,255,0.2)',
                bgcolor: 'rgba(255,255,255,0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>

                <img
                  src="/hero-image.jpg"
                  alt="Fashion Collection"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </Box>
            </Box>

          </Box>
        </Container>
      </Box>
      {/* FEATURED PRODUCTS  */}
      <Box sx={{ bgcolor: '#f8f7ff', py: 10 }}>
        <Container maxWidth="xl">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Chip
              label="Featured"
              sx={{ mb: 2, bgcolor: '#ede9fe', color: '#7c3aed', fontWeight: 600 }}
            />
            <Typography variant="h4" sx={{ fontWeight: 800, color: '#1a1a2e' }}>
              Top{' '}
              <Box component="span" sx={{ color: '#7c3aed' }}>Products</Box>
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
              Hand-picked products just for you
            </Typography>
          </Box>

          {loading || products.length === 0 ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
              <CircularProgress sx={{ color: '#7c3aed' }} />
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
                    borderColor: '#7c3aed',
                    color: '#7c3aed',
                    fontWeight: 700,
                    px: 5,
                    py: 1.5,
                    borderRadius: 3,
                    textTransform: 'none',
                    fontSize: '15px',
                    '&:hover': { bgcolor: '#f5f3ff', borderColor: '#6d28d9' },
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