'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/lib/store'
import { addToCart } from '@/lib/cartSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping, faStar } from '@fortawesome/free-solid-svg-icons'
import Image from 'next/image'
import { Box, Container, Typography, Chip, CircularProgress } from '@mui/material'
import { Product as ProductType } from '@/lib/types'
import axios from 'axios'

export default function ProductDetailsPage() {
    const { id } = useParams()
    const dispatch = useDispatch<AppDispatch>()
    const [product, setProduct] = useState<ProductType | null>(null)
    const [loading, setLoading] = useState(true)
    const [isAdding, setIsAdding] = useState(false)
    const [added, setAdded] = useState(false)

    useEffect(() => {
        async function fetchProduct() {
            try {
                const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
                setProduct(data.data)
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        }
        fetchProduct()
    }, [id])

    async function handleAddToCart() {
        if (!product) return
        setIsAdding(true)
        await dispatch(addToCart(product._id))
        setIsAdding(false)
        setAdded(true)
        setTimeout(() => setAdded(false), 2000)
    }

    if (loading) return (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
            <CircularProgress sx={{ color: '#7c3aed' }} />
        </Box>
    )

    if (!product) return (
        <Box sx={{ textAlign: 'center', mt: 10 }}>
            <Typography>Product not found</Typography>
        </Box>
    )

    return (
        <Container maxWidth="lg" sx={{ py: 8 }}>
            <Box sx={{ display: 'flex', gap: 6, flexDirection: { xs: 'column', md: 'row' } }}>

                {/* Image */}
                <Box sx={{ position: 'relative', width: { xs: '100%', md: '45%' }, height: 400, borderRadius: 3, overflow: 'hidden' }}>
                    {product.imageCover && (
                        <Image src={product.imageCover} alt={product.title} fill style={{ objectFit: 'cover' }} />
                    )}
                </Box>

                {/* Info */}
                <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Chip label={product.category?.name} sx={{ bgcolor: '#ede9fe', color: '#7c3aed', fontWeight: 600, width: 'fit-content' }} />

                    <Typography variant="h4" sx={{ fontWeight: 800, color: '#1a1a2e' }}>
                        {product.title}
                    </Typography>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <FontAwesomeIcon icon={faStar} style={{ color: '#f59e0b' }} />
                        <Typography sx={{ fontWeight: 600 }}>{product.ratingsAverage}</Typography>
                    </Box>

                    <Typography variant="h5" sx={{ fontWeight: 800, color: '#7c3aed' }}>
                        {product.price} EGP
                    </Typography>

                    <Box
                        onClick={handleAddToCart}
                        sx={{
                            display: 'flex', alignItems: 'center', gap: 1,
                            bgcolor: added ? '#10b981' : '#7c3aed',
                            color: '#fff', fontWeight: 700, px: 3, py: 1.5,
                            borderRadius: 2, cursor: isAdding ? 'not-allowed' : 'pointer',
                            width: 'fit-content', transition: 'background 0.3s ease',
                            '&:hover': { bgcolor: added ? '#059669' : '#6d28d9' },
                        }}
                    >
                        <FontAwesomeIcon icon={faCartShopping} />
                        {isAdding ? 'Adding...' : added ? 'Added ✓' : 'Add to Cart'}
                    </Box>
                </Box>
            </Box>
        </Container>
    )
}