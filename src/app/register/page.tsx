'use client'

import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
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
import { useTheme } from '@mui/material/styles'
import Link from 'next/link'

const validationSchema = Yup.object({
    name: Yup.string()
        .min(3, 'Minimum 3 characters')
        .required('Name is required'),

    email: Yup.string()
        .email('Invalid email')
        .required('Email is required'),

    password: Yup.string()
        .min(6, 'Minimum 6 characters')
        .required('Password is required'),

    rePassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords do not match')
        .required('Confirm password is required'),

    phone: Yup.string()
        .matches(
            /^01[0125][0-9]{8}$/,
            'Invalid Egyptian phone number'
        )
        .required('Phone is required'),
})

export default function RegisterPage() {
    const theme = useTheme()

    const router = useRouter()
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            rePassword: '',
            phone: '',
        },

        validationSchema,

        async onSubmit(values) {
            setError('')

            try {
                await axios.post(
                    'https://ecommerce.routemisr.com/api/v1/auth/signup',
                    values
                )

                setSuccess(true)

                setTimeout(() => {
                    router.push('/login')
                }, 1500)
            } catch (err: any) {
                setError(
                    err.response?.data?.message ||
                    'Registration failed'
                )
            }
        },
    })

    return (
        <Box
            sx={{
                minHeight: '100vh',
                bgcolor: theme.palette.background.default,
                display: 'flex',
                alignItems: 'center',
                py: 6,
            }}
        >
            <Container maxWidth="sm">
                <Paper
                    elevation={0}
                    sx={{
                        p: 5,
                        borderRadius: 4,
                        border: `1px solid ${theme.palette.divider}`,
                        bgcolor: theme.palette.background.paper,
                    }}
                >
                    <Box
                        sx={{
                            textAlign: 'center',
                            mb: 4,
                        }}
                    >
                        <Typography
                            variant="h4"
                            sx={{
                                fontWeight: 800,
                                color: theme.palette.text.primary,
                                mb: 1,
                            }}
                        >
                            Create Account
                        </Typography>

                        <Typography
                            variant="body2"
                            sx={{
                                color: theme.palette.text.secondary,
                            }}
                        >
                            Create your new account and start shopping
                        </Typography>
                    </Box>

                    {error && (
                        <Alert
                            severity="error"
                            sx={{
                                mb: 3,
                                borderRadius: 2,
                            }}
                        >
                            {error}
                        </Alert>
                    )}

                    {success && (
                        <Alert
                            severity="success"
                            sx={{
                                mb: 3,
                                borderRadius: 2,
                            }}
                        >
                            Account created! Redirecting to login...
                        </Alert>
                    )}

                    <Box
                        component="form"
                        onSubmit={formik.handleSubmit}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 3,
                        }}
                    >
                        <TextField
                            label="Full Name"
                            name="name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={
                                formik.touched.name &&
                                Boolean(formik.errors.name)
                            }
                            helperText={
                                formik.touched.name &&
                                formik.errors.name
                            }
                            fullWidth
                        />

                        <TextField
                            label="Email"
                            name="email"
                            type="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={
                                formik.touched.email &&
                                Boolean(formik.errors.email)
                            }
                            helperText={
                                formik.touched.email &&
                                formik.errors.email
                            }
                            fullWidth
                        />

                        <TextField
                            label="Phone"
                            name="phone"
                            value={formik.values.phone}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={
                                formik.touched.phone &&
                                Boolean(formik.errors.phone)
                            }
                            helperText={
                                formik.touched.phone &&
                                formik.errors.phone
                            }
                            fullWidth
                        />

                        <TextField
                            label="Password"
                            name="password"
                            type="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={
                                formik.touched.password &&
                                Boolean(formik.errors.password)
                            }
                            helperText={
                                formik.touched.password &&
                                formik.errors.password
                            }
                            fullWidth
                        />

                        <TextField
                            label="Confirm Password"
                            name="rePassword"
                            type="password"
                            value={formik.values.rePassword}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={
                                formik.touched.rePassword &&
                                Boolean(formik.errors.rePassword)
                            }
                            helperText={
                                formik.touched.rePassword &&
                                formik.errors.rePassword
                            }
                            fullWidth
                        />

                        <Button
                            type="submit"
                            variant="contained"
                            size="large"
                            disabled={formik.isSubmitting}
                            sx={{
                                bgcolor: theme.palette.primary.main,
                                borderRadius: 3,
                                py: 1.5,
                                fontWeight: 700,
                                fontSize: '15px',
                                textTransform: 'none',

                                '&:hover': {
                                    bgcolor: theme.palette.primary.dark,
                                },
                            }}
                        >
                            {formik.isSubmitting ? (
                                <CircularProgress
                                    size={22}
                                    sx={{
                                        color: '#fff',
                                    }}
                                />
                            ) : (
                                'Create Account'
                            )}
                        </Button>
                    </Box>

                    <Typography
                        variant="body2"
                        sx={{
                            textAlign: 'center',
                            mt: 3,
                            color: theme.palette.text.secondary,
                        }}
                    >
                        Already have an account?{' '}
                        <Link
                            href="/login"
                            style={{
                                color: theme.palette.primary.main,
                                fontWeight: 600,
                                textDecoration: 'none',
                            }}
                        >
                            Login
                        </Link>
                    </Typography>
                </Paper>
            </Container>
        </Box>
    )
}