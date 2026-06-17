'use client'

import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/lib/store'
import { addToCart } from '@/lib/cartSlice'
import { addToFavorites, removeFromFavorites } from '@/lib/favoritesSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping, faStar, faCheck } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
    Box, Typography, Chip, IconButton,
    Dialog, DialogTitle, DialogContent, DialogActions, Button
} from '@mui/material'
import { Product as ProductType } from '@/lib/types'
import toast from 'react-hot-toast'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { useRouter } from 'next/navigation'

export default function Product({ p }: { p: ProductType }) {
    const dispatch = useDispatch<AppDispatch>()
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [added, setAdded] = useState(false)
    const [hovered, setHovered] = useState(false)
    const [loginDialog, setLoginDialog] = useState(false)

    const token = useSelector((state: RootState) => state.auth.token)
    const favoritesIds = useSelector((state: RootState) => state.favorites.favoritesIds)
    const isFavorite = favoritesIds.includes(p._id)

    async function handleAddToCart(e: React.MouseEvent) {
        e.preventDefault()
        if (!token) {
            setLoginDialog(true)
            return
        }
        setIsLoading(true)
        await dispatch(addToCart(p._id))
        setIsLoading(false)
        setAdded(true)
        toast.success(`${p.title.split(' ').slice(0, 3).join(' ')} added to cart!`, {
            style: { borderRadius: '10px', background: '#303841', color: '#fff', fontWeight: 600 },
            iconTheme: { primary: '#FF5722', secondary: '#fff' },
        })
        setTimeout(() => setAdded(false), 2000)
    }

    async function handleFavorite(e: React.MouseEvent) {
        e.preventDefault()
        if (!token) {
            setLoginDialog(true)
            return
        }
        if (isFavorite) {
            await dispatch(removeFromFavorites(p._id))
            toast.success('Removed from favorites!', {
                style: { borderRadius: '10px', background: '#303841', color: '#fff', fontWeight: 600 },
                iconTheme: { primary: '#FF5722', secondary: '#fff' },
            })
        } else {
            await dispatch(addToFavorites(p._id))
            toast.success('Added to favorites!', {
                style: { borderRadius: '10px', background: '#303841', color: '#fff', fontWeight: 600 },
                iconTheme: { primary: '#FF5722', secondary: '#fff' },
            })
        }
    }

    return (
        <>
            <Box
                component={Link}
                href={`/products/${p._id}`}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                sx={{
                    textDecoration: 'none',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    bgcolor: '#fff',
                    border: '0.5px solid',
                    borderColor: hovered ? '#76ABAE' : '#e5e7eb',
                    boxShadow: hovered ? '0 12px 28px rgba(48,56,65,0.12)' : '0 2px 8px rgba(0,0,0,0.06)',
                    transition: 'transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease',
                    transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                {/* Image */}
                <Box sx={{ position: 'relative', width: '100%', height: 280, overflow: 'hidden', bgcolor: '#f3f4f6' }}>
                    {p.imageCover && (
                        <Image
                            src={p.imageCover}
                            alt={p.title}
                            fill
                            style={{
                                objectFit: 'cover',
                                transition: 'transform 0.35s ease',
                                transform: hovered ? 'scale(1.05)' : 'scale(1)',
                            }}
                        />
                    )}

                    {/* Badge */}
                    <Chip
                        label={p.category?.name}
                        size="small"
                        sx={{
                            position: 'absolute',
                            top: 12, left: 12,
                            bgcolor: 'rgba(118,171,174,0.15)',
                            color: '#76ABAE',
                            fontWeight: 500,
                            fontSize: '11px',
                            height: 24,
                            border: '0.5px solid #76ABAE',
                        }}
                    />

                    {/* Favorite Button */}
                    <IconButton
                        onClick={handleFavorite}
                        sx={{
                            position: 'absolute',
                            top: 8, right: 8,
                            bgcolor: 'rgba(255,255,255,0.9)',
                            width: 32, height: 32,
                            '&:hover': { bgcolor: '#fff' },
                        }}
                    >
                        {isFavorite
                            ? <FavoriteIcon sx={{ fontSize: 16, color: '#FF5722' }} />
                            : <FavoriteBorderIcon sx={{ fontSize: 16, color: '#6b7280' }} />
                        }
                    </IconButton>
                </Box>

                {/* Body */}
                <Box sx={{ p: '14px 16px 16px', display: 'flex', flexDirection: 'column', gap: 1.2, flexGrow: 1 }}>

                    <Typography sx={{ fontWeight: 600, fontSize: '14px', color: '#303841', lineHeight: 1.4 }}>
                        {p.title.split(' ').slice(0, 5).join(' ')}
                    </Typography>

                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <FontAwesomeIcon icon={faStar} style={{ color: '#FF5722', fontSize: '13px' }} />
                            <Typography sx={{ fontSize: '13px', fontWeight: 500, color: '#6b7280' }}>
                                {p.ratingsAverage}
                            </Typography>
                        </Box>
                        <Typography sx={{ fontSize: '12px', color: '#9ca3af' }}>
                            {p.ratingsQuantity} reviews
                        </Typography>
                    </Box>

                    <Box sx={{ height: '0.5px', bgcolor: '#f3f4f6' }} />

                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 'auto' }}>
                        <Typography sx={{ fontSize: '18px', fontWeight: 600, color: '#303841' }}>
                            {p.price}
                            <Typography component="span" sx={{ fontSize: '11px', fontWeight: 400, color: '#9ca3af', ml: 0.4 }}>
                                EGP
                            </Typography>
                        </Typography>

                        <Box
                            onClick={!isLoading ? handleAddToCart : undefined}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 0.8,
                                bgcolor: added ? '#0F6E56' : '#FF5722',
                                color: '#fff',
                                fontSize: '12px',
                                fontWeight: 500,
                                px: 1.8, py: 1,
                                borderRadius: '8px',
                                cursor: isLoading ? 'not-allowed' : 'pointer',
                                opacity: isLoading ? 0.7 : 1,
                                transition: 'background 0.2s ease',
                                '&:hover': { bgcolor: added ? '#085041' : '#e64a19' },
                            }}
                        >
                            <FontAwesomeIcon icon={added ? faCheck : faCartShopping} style={{ fontSize: '11px' }} />
                            {isLoading ? 'Adding...' : added ? 'Added' : 'Add'}
                        </Box>
                    </Box>
                </Box>
            </Box>

            {/* ===== Login Dialog ===== */}
            <Dialog
                open={loginDialog}
                onClose={() => setLoginDialog(false)}
                slotProps={{ paper: { sx: { borderRadius: 3, p: 1, maxWidth: 380 } } }}
            >
                <DialogTitle sx={{ fontWeight: 800, color: '#303841', textAlign: 'center', pt: 3 }}>
                     Login Required
                </DialogTitle>
                <DialogContent>
                    <Typography sx={{ color: '#6b7280', textAlign: 'center', fontSize: '14px' }}>
                        You need to login first to add items to your cart or favorites.
                    </Typography>
                </DialogContent>
                <DialogActions sx={{ display: 'flex', flexDirection: 'column', gap: 1, px: 3, pb: 3 }}>
                    <Button
                        fullWidth
                        variant="contained"
                        onClick={() => { setLoginDialog(false); router.push('/login') }}
                        sx={{
                            bgcolor: '#FF5722', color: '#fff', fontWeight: 700,
                            textTransform: 'none', borderRadius: 2, py: 1.2,
                            '&:hover': { bgcolor: '#e64a19' },
                        }}
                    >
                        Login Now
                    </Button>
                    <Button
                        fullWidth
                        variant="outlined"
                        onClick={() => { setLoginDialog(false); router.push('/register') }}
                        sx={{
                            borderColor: '#76ABAE', color: '#76ABAE', fontWeight: 700,
                            textTransform: 'none', borderRadius: 2, py: 1.2,
                            '&:hover': { bgcolor: 'rgba(118,171,174,0.05)' },
                        }}
                    >
                        Create Account
                    </Button>
                    <Button
                        fullWidth
                        onClick={() => setLoginDialog(false)}
                        sx={{ color: '#9ca3af', textTransform: 'none', fontWeight: 600 }}
                    >
                        Maybe Later
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}