// lib/types.ts

export interface Product {
    _id: string
    title: string
    price: number
    imageCover: string
    ratingsAverage: number
    ratingsQuantity: number
    category?: {
        name: string
    }
}

export interface CartItem {
    _id: string
    product: Product
    count: number
    price: number
}

export interface CartData {
    data: {
        products: CartItem[]
        totalCartPrice: number
        _id: string
    }
}

export interface Category {
    _id: string
    name: string
    image: string
    slug: string
}


export interface Review {
    _id: string
    comment: string
    ratings: number
    user: {
        _id: string
        name: string
    }
    createdAt: string
}