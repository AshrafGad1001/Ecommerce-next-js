'use client'

import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/lib/store'
import { addToCart } from '@/lib/cartSlice'
import { addToFavorites, removeFromFavorites } from '@/lib/favoritesSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping, faStar, faEye, faCheck } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Box, Typography, Chip, IconButton } from '@mui/material'
import { Product as ProductType } from '@/lib/types'
import toast from 'react-hot-toast'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'

export default function Product({ p }: { p: ProductType }) {
    const dispatch = useDispatch<AppDispatch>()
    const [isLoading, setIsLoading] = useState(false)
    const [added, setAdded] = useState(false)
    const [hovered, setHovered] = useState(false)

    const favoritesIds = useSelector((state: RootState) => state.favorites.favoritesIds)
    const isFavorite = favoritesIds.includes(p._id)

    async function handleAddToCart() {
        setIsLoading(true)
        await dispatch(addToCart(p._id))
        setIsLoading(false)
        setAdded(true)
        toast.success(`${p.title.split(' ').slice(0, 3).join(' ')} added to cart!`, {
            style: { borderRadius: '10px', background: '#1a1a2e', color: '#fff', fontWeight: 600 },
            iconTheme: { primary: '#7c3aed', secondary: '#fff' },
        })
        setTimeout(() => setAdded(false), 2000)
    }

    async function handleFavorite() {
        if (isFavorite) {
            await dispatch(removeFromFavorites(p._id))
            toast.success('Removed from favorites!', {
                style: { borderRadius: '10px', background: '#1a1a2e', color: '#fff', fontWeight: 600 },
                iconTheme: { primary: '#ef4444', secondary: '#fff' },
            })
        } else {
            await dispatch(addToFavorites(p._id))
            toast.success('Added to favorites!', {
                style: { borderRadius: '10px', background: '#1a1a2e', color: '#fff', fontWeight: 600 },
                iconTheme: { primary: '#ef4444', secondary: '#fff' },
            })
        }
    }

    return (
        <Box
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            sx={{
                borderRadius: '16px',
                overflow: 'hidden',
                bgcolor: '#fff',
                border: '0.5px solid',
                borderColor: hovered ? '#d1d5db' : '#e5e7eb',
                boxShadow: hovered ? '0 12px 28px rgba(0,0,0,0.10)' : '0 2px 8px rgba(0,0,0,0.06)',
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
                        top: 12,
                        left: 12,
                        bgcolor: '#EEEDFE',
                        color: '#3C3489',
                        fontWeight: 500,
                        fontSize: '11px',
                        height: 24,
                        border: '0.5px solid #AFA9EC',
                    }}
                />

                {/* Favorite Button */}
                <IconButton
                    onClick={handleFavorite}
                    sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        bgcolor: 'rgba(255,255,255,0.9)',
                        width: 32,
                        height: 32,
                        '&:hover': { bgcolor: '#fff' },
                    }}
                >
                    {isFavorite
                        ? <FavoriteIcon sx={{ fontSize: 16, color: '#ef4444' }} />
                        : <FavoriteBorderIcon sx={{ fontSize: 16, color: '#6b7280' }} />
                    }
                </IconButton>

                {/* View Button */}
                <Link href={`/products/${p._id}`} style={{ textDecoration: 'none' }}>
                    <Box sx={{
                        position: 'absolute',
                        bottom: 12,
                        right: 12,
                        bgcolor: 'rgba(255,255,255,0.92)',
                        color: '#534AB7',
                        fontSize: '12px',
                        fontWeight: 500,
                        px: 1.5,
                        py: 0.7,
                        borderRadius: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.6,
                        border: '0.5px solid #AFA9EC',
                        opacity: hovered ? 1 : 0,
                        transform: hovered ? 'translateY(0)' : 'translateY(6px)',
                        transition: 'opacity 0.25s ease, transform 0.25s ease',
                        cursor: 'pointer',
                    }}>
                        <FontAwesomeIcon icon={faEye} style={{ fontSize: '11px' }} />
                        View
                    </Box>
                </Link>
            </Box>

            {/* Body */}
            <Box sx={{ p: '14px 16px 16px', display: 'flex', flexDirection: 'column', gap: 1.2, flexGrow: 1 }}>

                {/* Title */}
                <Typography sx={{ fontWeight: 600, fontSize: '14px', color: '#111827', lineHeight: 1.4 }}>
                    {p.title.split(' ').slice(0, 5).join(' ')}
                </Typography>

                {/* Rating + Reviews */}
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <FontAwesomeIcon icon={faStar} style={{ color: '#BA7517', fontSize: '13px' }} />
                        <Typography sx={{ fontSize: '13px', fontWeight: 500, color: '#6b7280' }}>
                            {p.ratingsAverage}
                        </Typography>
                    </Box>
                    <Typography sx={{ fontSize: '12px', color: '#9ca3af' }}>
                        {p.ratingsQuantity} reviews
                    </Typography>
                </Box>

                {/* Divider */}
                <Box sx={{ height: '0.5px', bgcolor: '#f3f4f6' }} />

                {/* Price + Cart */}
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 'auto' }}>
                    <Typography sx={{ fontSize: '18px', fontWeight: 600, color: '#534AB7' }}>
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
                            bgcolor: added ? '#0F6E56' : '#534AB7',
                            color: added ? '#E1F5EE' : '#EEEDFE',
                            fontSize: '12px',
                            fontWeight: 500,
                            px: 1.8,
                            py: 1,
                            borderRadius: '8px',
                            cursor: isLoading ? 'not-allowed' : 'pointer',
                            opacity: isLoading ? 0.7 : 1,
                            transition: 'background 0.2s ease',
                            '&:hover': {
                                bgcolor: added ? '#085041' : '#3C3489',
                            },
                        }}
                    >
                        <FontAwesomeIcon icon={added ? faCheck : faCartShopping} style={{ fontSize: '11px' }} />
                        {isLoading ? 'Adding...' : added ? 'Added' : 'Add'}
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}