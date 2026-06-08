'use client'

import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/lib/store'
import { setToken } from '@/lib/authSlice'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import {
    Box,
    Container,
    Typography,
    TextField,
    Button,
    CircularProgress,
    Alert,
    Paper,
} from '@mui/material'
import Link from 'next/link'

const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(6, 'Minimum 6 characters').required('Password is required'),
})

export default function LoginPage() {
    const dispatch = useDispatch<AppDispatch>()
    const router = useRouter()
    const [error, setError] = useState('')

    const formik = useFormik({
        initialValues: { email: '', password: '' },
        validationSchema,
        async onSubmit(values) {
            setError('')
            try {
                const { data } = await axios.post(
                    'https://ecommerce.routemisr.com/api/v1/auth/signin',
                    values
                )
                dispatch(setToken({ token: data.token, username: data.user.name }))
                router.push('/products')
            } catch (err: any) {
                setError(err.response?.data?.message || 'Login failed')
            }
        },
    })

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: '#f8f7ff', display: 'flex', alignItems: 'center' }}>
            <Container maxWidth="sm">
                <Paper elevation={0} sx={{
                    p: 5,
                    borderRadius: 4,
                    border: '1px solid #ede9fe',
                    bgcolor: '#fff',
                }}>

                    {/* Header */}
                    <Box sx={{ textAlign: 'center', mb: 4 }}>
                        <Typography variant="h4" sx={{ fontWeight: 800, color: '#1a1a2e', mb: 1 }}>
                            Welcome Back 
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            Login to your account
                        </Typography>
                    </Box>

                    {/* Error */}
                    {error && (
                        <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
                            {error}
                        </Alert>
                    )}

                    {/* Form */}
                    <Box component="form" onSubmit={formik.handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>

                        <TextField
                            label="Email"
                            name="email"
                            type="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                            fullWidth
                        />

                        <TextField
                            label="Password"
                            name="password"
                            type="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
                            fullWidth
                        />

                        <Button
                            type="submit"
                            variant="contained"
                            size="large"
                            disabled={formik.isSubmitting}
                            sx={{
                                bgcolor: '#7c3aed',
                                borderRadius: 3,
                                py: 1.5,
                                fontWeight: 700,
                                fontSize: '15px',
                                textTransform: 'none',
                                '&:hover': { bgcolor: '#6d28d9' },
                            }}
                        >
                            {formik.isSubmitting ? <CircularProgress size={22} sx={{ color: '#fff' }} /> : 'Login'}
                        </Button>

                    </Box>

                    {/* Footer */}
                    <Typography variant="body2" sx={{ textAlign: 'center', mt: 3, color: 'text.secondary' }}>
                        Don&apos;t have an account?{' '}
                        <Link href="/register" style={{ color: '#7c3aed', fontWeight: 600, textDecoration: 'none' }}>
                            Register
                        </Link>
                    </Typography>

                </Paper>
            </Container>
        </Box>
    )
}