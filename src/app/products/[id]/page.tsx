'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/lib/store'
import { addToCart } from '@/lib/cartSlice'
import { addToFavorites, removeFromFavorites } from '@/lib/favoritesSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping, faCheck } from '@fortawesome/free-solid-svg-icons'
import Image from 'next/image'
import {
    Box, Container, Typography, Chip, CircularProgress,
    TextField, Button, Avatar, Divider, Rating, Paper
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { Product as ProductType, Review } from '@/lib/types'
import axios from 'axios'
import toast from 'react-hot-toast'
import ThemeRegistry from '../../_Components/ThemeRegistry'

function ProductDetailsContent() {
    const theme = useTheme()
    const { id } = useParams()
    const dispatch = useDispatch<AppDispatch>()
    const token = useSelector((state: RootState) => state.auth.token)
    const favoritesIds = useSelector((state: RootState) => state.favorites.favoritesIds)

    const [product, setProduct] = useState<ProductType | null>(null)
    const [loading, setLoading] = useState(true)
    const [isAdding, setIsAdding] = useState(false)
    const [added, setAdded] = useState(false)
    const [activeImage, setActiveImage] = useState<string>('')

    const [reviews, setReviews] = useState<Review[]>([])
    const [reviewsLoading, setReviewsLoading] = useState(true)
    const [comment, setComment] = useState('')
    const [rating, setRating] = useState<number>(5)
    const [submitting, setSubmitting] = useState(false)

    const isFavorite = favoritesIds.includes(product?._id ?? '')

    useEffect(() => {
        async function fetchProduct() {
            try {
                const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
                setProduct(data.data)
                setActiveImage(data.data.imageCover)
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        }
        fetchProduct()
    }, [id])

    useEffect(() => {
        async function fetchReviews() {
            try {
                const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}/reviews`)
                setReviews(data.data)
            } catch (err) {
                console.error(err)
            } finally {
                setReviewsLoading(false)
            }
        }
        fetchReviews()
    }, [id])

    async function handleAddToCart() {
        if (!product) return
        setIsAdding(true)
        await dispatch(addToCart(product._id))
        setIsAdding(false)
        setAdded(true)
        toast.success(`${product.title.split(' ').slice(0, 3).join(' ')} added to cart!`, {
            style: { borderRadius: '10px', background: theme.palette.text.primary, color: '#fff', fontWeight: 600 },
            iconTheme: { primary: theme.palette.primary.main, secondary: '#fff' },
        })
        setTimeout(() => setAdded(false), 2000)
    }

    async function handleFavorite() {
        if (!product) return
        if (isFavorite) {
            await dispatch(removeFromFavorites(product._id))
            toast.success('Removed from favorites!', {
                style: { borderRadius: '10px', background: theme.palette.text.primary, color: '#fff', fontWeight: 600 },
                iconTheme: { primary: '#ef4444', secondary: '#fff' },
            })
        } else {
            await dispatch(addToFavorites(product._id))
            toast.success('Added to favorites!', {
                style: { borderRadius: '10px', background: theme.palette.text.primary, color: '#fff', fontWeight: 600 },
                iconTheme: { primary: '#ef4444', secondary: '#fff' },
            })
        }
    }

    async function handleSubmitReview() {
        if (!comment.trim()) return
        if (!token) {
            toast.error('Please login to submit a review!')
            return
        }
        setSubmitting(true)
        try {
            const { data } = await axios.post(
                `https://ecommerce.routemisr.com/api/v1/products/${id}/reviews`,
                { comment, ratings: rating },
                { headers: { token } }
            )
            setReviews((prev) => [data.data, ...prev])
            setComment('')
            setRating(5)
            toast.success('Review submitted!', {
                style: { borderRadius: '10px', background: theme.palette.text.primary, color: '#fff', fontWeight: 600 },
                iconTheme: { primary: theme.palette.primary.main, secondary: '#fff' },
            })
        } catch (err) {
            if (axios.isAxiosError(err)) {
                toast.error(err.response?.data?.message || 'Failed to submit review')
            } else {
                toast.error('Failed to submit review')
            }
        } finally {
            setSubmitting(false)
        }
    }

    if (loading) return (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
            <CircularProgress color="primary" />
        </Box>
    )

    if (!product) return (
        <Box sx={{ textAlign: 'center', mt: 10 }}>
            <Typography>Product not found</Typography>
        </Box>
    )

    const allImages = [product.imageCover, ...(product.images ?? [])]

    return (
        <Container maxWidth="lg" sx={{ py: 8 }}>

            {/* ===== Product Details ===== */}
            <Box sx={{ display: 'flex', gap: 6, flexDirection: { xs: 'column', md: 'row' } }}>

                {/* Images Column */}
                <Box sx={{ width: { xs: '100%', md: '45%' }, display: 'flex', flexDirection: 'column', gap: 2 }}>

                    {/* Main Image */}
                    <Box sx={{
                        position: 'relative', width: '100%', height: 400,
                        borderRadius: 3, overflow: 'hidden',
                        border: '2px solid', borderColor: 'divider',
                    }}>
                        <Image
                            src={activeImage}
                            alt={product.title}
                            fill
                            style={{ objectFit: 'cover', transition: 'opacity 0.3s ease' }}
                        />
                    </Box>

                    {/* Thumbnails */}
                    {allImages.length > 1 && (
                        <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
                            {allImages.map((img, index) => (
                                <Box
                                    key={index}
                                    onClick={() => setActiveImage(img)}
                                    sx={{
                                        position: 'relative',
                                        width: 72, height: 72,
                                        borderRadius: 2,
                                        overflow: 'hidden',
                                        cursor: 'pointer',
                                        border: '2px solid',
                                        borderColor: activeImage === img
                                            ? 'primary.main'
                                            : 'divider',
                                        transition: 'border-color 0.2s ease',
                                        '&:hover': {
                                            borderColor: 'primary.main',
                                        },
                                    }}
                                >
                                    <Image
                                        src={img}
                                        alt={`${product.title} ${index + 1}`}
                                        fill
                                        style={{ objectFit: 'cover' }}
                                    />
                                </Box>
                            ))}
                        </Box>
                    )}
                </Box>

                {/* Info */}
                <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Chip
                        label={product.category?.name}
                        sx={{
                            bgcolor: `${theme.palette.primary.main}22`,
                            color: 'primary.main',
                            fontWeight: 600,
                            width: 'fit-content',
                        }}
                    />

                    <Typography variant="h4" sx={{ fontWeight: 800, color: 'text.primary' }}>
                        {product.title}
                    </Typography>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Rating value={product.ratingsAverage} precision={0.5} readOnly size="small" />
                        <Typography sx={{ fontWeight: 600, color: 'text.secondary', fontSize: '14px' }}>
                            ({product.ratingsQuantity} reviews)
                        </Typography>
                    </Box>

                    <Typography variant="h5" sx={{ fontWeight: 800, color: 'primary.main' }}>
                        {product.price} EGP
                    </Typography>

                    <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
                        {/* Add to Cart */}
                        <Box
                            onClick={handleAddToCart}
                            sx={{
                                display: 'flex', alignItems: 'center', gap: 1,
                                bgcolor: added ? '#10b981' : 'primary.main',
                                color: '#fff', fontWeight: 700, px: 3, py: 1.5,
                                borderRadius: 2, cursor: isAdding ? 'not-allowed' : 'pointer',
                                transition: 'background 0.3s ease',
                                '&:hover': { bgcolor: added ? '#059669' : 'primary.dark' },
                            }}
                        >
                            <FontAwesomeIcon icon={added ? faCheck : faCartShopping} />
                            {isAdding ? 'Adding...' : added ? 'Added ✓' : 'Add to Cart'}
                        </Box>

                        {/* Favorite */}
                        <Box
                            onClick={handleFavorite}
                            sx={{
                                display: 'flex', alignItems: 'center', gap: 1,
                                border: '2px solid',
                                borderColor: isFavorite ? '#ef4444' : 'divider',
                                color: isFavorite ? '#ef4444' : 'text.secondary',
                                fontWeight: 700, px: 3, py: 1.5,
                                borderRadius: 2, cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                '&:hover': { borderColor: '#ef4444', color: '#ef4444' },
                            }}
                        >
                            {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                            {isFavorite ? 'Saved' : 'Save'}
                        </Box>
                    </Box>
                </Box>
            </Box>

            {/* ===== Reviews Section ===== */}
            <Box sx={{ mt: 8 }}>
                <Typography variant="h5" sx={{ fontWeight: 800, color: 'text.primary', mb: 4 }}>
                    Reviews{' '}
                    <Chip
                        label={reviews.length}
                        size="small"
                        sx={{
                            bgcolor: `${theme.palette.primary.main}22`,
                            color: 'primary.main',
                            fontWeight: 600,
                        }}
                    />
                </Typography>

                {/* Add Review */}
                {token && (
                    <Paper elevation={0} sx={{
                        p: 3, borderRadius: 3,
                        border: '1px solid', borderColor: 'divider',
                        mb: 4,
                    }}>
                        <Typography sx={{ fontWeight: 700, mb: 2, color: 'text.primary' }}>
                            Write a Review
                        </Typography>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                            <Typography sx={{ color: 'text.secondary', fontSize: '14px' }}>Rating:</Typography>
                            <Rating value={rating} onChange={(_, val) => setRating(val ?? 5)} />
                        </Box>

                        <TextField
                            fullWidth
                            multiline
                            rows={3}
                            placeholder="Share your thoughts about this product..."
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            sx={{ mb: 2 }}
                        />

                        <Button
                            variant="contained"
                            onClick={handleSubmitReview}
                            disabled={submitting || !comment.trim()}
                            sx={{
                                bgcolor: 'primary.main', color: '#fff', fontWeight: 700,
                                textTransform: 'none', borderRadius: 2,
                                '&:hover': { bgcolor: 'primary.dark' },
                            }}
                        >
                            {submitting ? 'Submitting...' : 'Submit Review'}
                        </Button>
                    </Paper>
                )}

                {/* Reviews List */}
                {reviewsLoading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                        <CircularProgress color="primary" />
                    </Box>
                ) : reviews.length === 0 ? (
                    <Box sx={{ textAlign: 'center', py: 6 }}>
                        <Typography sx={{ color: 'text.secondary', fontWeight: 600 }}>
                            No reviews yet. Be the first to review!
                        </Typography>
                    </Box>
                ) : (
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        {reviews.map((review) => (
                            <Paper key={review._id} elevation={0} sx={{
                                p: 3, borderRadius: 3,
                                border: '1px solid', borderColor: 'divider',
                                bgcolor: 'background.paper',
                            }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1.5 }}>
                                    <Avatar sx={{
                                        bgcolor: 'primary.main',
                                        width: 38, height: 38, fontSize: '14px',
                                    }}>
                                        {review.user?.name?.charAt(0).toUpperCase()}
                                    </Avatar>
                                    <Box>
                                        <Typography sx={{ fontWeight: 700, color: 'text.primary', fontSize: '14px' }}>
                                            {review.user?.name}
                                        </Typography>
                                        <Typography sx={{ color: 'text.disabled', fontSize: '12px' }}>
                                            {new Date(review.createdAt).toLocaleDateString()}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ ml: 'auto' }}>
                                        <Rating value={review.ratings} readOnly size="small" />
                                    </Box>
                                </Box>
                                <Divider sx={{ mb: 1.5 }} />
                                <Typography sx={{ color: 'text.secondary', fontSize: '14px', lineHeight: 1.7 }}>
                                    {review.comment}
                                </Typography>
                            </Paper>
                        ))}
                    </Box>
                )}
            </Box>

        </Container>
    )
}

export default function ProductDetailsPage() {
    return (
        <ThemeRegistry>
            <ProductDetailsContent />
        </ThemeRegistry>
    )
}