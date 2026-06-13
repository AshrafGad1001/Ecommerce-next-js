import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const protectedRoutes = ['/cart', '/profile']
const authRoutes = ['/login', '/register']

export function middleware(request: NextRequest) {
    const token = request.cookies.get('userToken')?.value
    const { pathname } = request.nextUrl

    
    if (protectedRoutes.some(route => pathname.startsWith(route)) && !token) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    
    if (authRoutes.includes(pathname) && token) {
        return NextResponse.redirect(new URL('/products', request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/cart', '/profile', '/login', '/register'],
}