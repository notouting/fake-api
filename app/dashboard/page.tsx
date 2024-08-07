'use client';
import { useEffect, useState } from 'react';
import Product from '@/components/Product';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
    const router = useRouter()
    const [products, setProducts] = useState([]);

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            router.push('/login')
        }

        const fetchProducts = async () => {
            const response = await fetch('https://fakestoreapi.com/products');
            const data = await response.json();
            setProducts(data);
        };

        fetchProducts();
    },);

    console.log(products)

    return (
        <div className="container mx-auto mt-8">
            <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {products.map((product: any) => (
                    <Product key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
}
