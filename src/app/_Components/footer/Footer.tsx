'use client'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Divider from '@mui/material/Divider'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faTwitter, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'

export default function Footer() {
    return (
        <Box
            component="footer"
            sx={{ bgcolor: '#303841', color: '#F5F5F5', pt: 4, pb: 2 }}
        >
            <Box sx={{
                maxWidth: '1200px',
                mx: 'auto',
                px: 3,
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                alignItems: { xs: 'center', md: 'flex-start' },
                justifyContent: 'space-between',
                gap: 4,
                mb: 3,
            }}>

                {/* Logo + Description */}
                <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                    <Box sx={{
                        display: 'flex', alignItems: 'center', gap: 1, mb: 1,
                        justifyContent: { xs: 'center', md: 'flex-start' }
                    }}>
                        <FontAwesomeIcon icon={faCartShopping} style={{ fontSize: '20px', color: '#FF5722' }} />
                        <Typography variant="h6" sx={{ fontWeight: 800, color: '#F5F5F5' }}>
                            ClickShop
                        </Typography>
                    </Box>
                    <Typography variant="body2" sx={{ opacity: 0.6, maxWidth: 220, color: '#F5F5F5' }}>
                        Your one-stop shop for the best products at the best prices.
                    </Typography>
                </Box>

                {/* Nav Links */}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, alignItems: { xs: 'center', md: 'flex-start' } }}>
                    <Typography variant="body2" sx={{ fontWeight: 700, mb: 0.5, color: '#76ABAE' }}>
                        Quick Links
                    </Typography>
                    {[
                        { label: 'Home', href: '/' },
                        { label: 'Products', href: '/products' },
                        { label: 'Categories', href: '/categories' },
                        { label: 'Brands', href: '/brands' },
                    ].map((link) => (
                        <Typography
                            key={link.href}
                            component={Link}
                            href={link.href}
                            variant="body2"
                            sx={{
                                color: 'rgba(245,245,245,0.6)',
                                textDecoration: 'none',
                                '&:hover': { color: '#FF5722' },
                                transition: 'color 0.2s ease',
                            }}
                        >
                            {link.label}
                        </Typography>
                    ))}
                </Box>

                {/* Social */}
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: { xs: 'center', md: 'flex-start' }, gap: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: 700, mb: 0.5, color: '#76ABAE' }}>
                        Follow Us
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        {[
                            { icon: faFacebook, href: '#' },
                            { icon: faTwitter, href: '#' },
                            { icon: faLinkedin, href: '#' },
                        ].map((social, i) => (
                            <IconButton
                                key={i}
                                component={Link}
                                href={social.href}
                                sx={{
                                    color: '#F5F5F5',
                                    bgcolor: 'rgba(255,255,255,0.08)',
                                    width: 36,
                                    height: 36,
                                    '&:hover': { bgcolor: '#FF5722', color: '#fff' },
                                    transition: 'all 0.2s ease',
                                }}
                            >
                                <FontAwesomeIcon icon={social.icon} style={{ fontSize: '14px' }} />
                            </IconButton>
                        ))}
                    </Box>
                </Box>

            </Box>

            <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)', mx: 3 }} />

            <Typography
                variant="body2"
                suppressHydrationWarning
                sx={{ textAlign: 'center', py: 2, color: 'rgba(245,245,245,0.4)' }}
            >
                © {new Date().getFullYear()} ClickShop. All rights reserved.
            </Typography>

        </Box>
    )
}