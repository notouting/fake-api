'use client'
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';

export default function Product({ product }: any) {
    return (
        <Card className="border rounded-lg p-4 flex flex-col justify-between">
            <Image src={product.image} width={300} height={300} alt={product.title} className="w-full h-48 object-contain mb-4" />
            <CardContent className='flex flex-col justify-between h-[170px]'>
                <h2 className="text-lg font-bold">{product.title.slice(0, 25)}.</h2>
                <p className="text-gray-700 text-sm">{product.description.slice(0, 30)}</p>
                <p className="text-white block font-bold px-3 py-2 bg-purple-500 rounded-md mt-auto">${product.price}</p>
            </CardContent>
        </Card>
    );
}
