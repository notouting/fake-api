'use client';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardContent } from '@/components/ui/card';

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function AddProductForm() {
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [category, setCategory] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [open, setOpen] = useState(false);
    const router = useRouter()

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            router.push('/dashboard')
        }
    },)

    const handleAddProduct = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch('https://fakestoreapi.com/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title,
                    price,
                    description,
                    image,
                    category,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to add product');
            }

            if (title && price && description && image && category) {
                setOpen(true);
            }

            const data = await response.json();
            console.log(data);
        } catch (err) {
            setError('Error adding product');
        }
    };
    const handleDialogChange = () => {
        setOpen(false)
        setTitle('');
        setPrice('');
        setDescription('');
        setImage('');
        setCategory('');
        setSuccess('Your product has been added successfully');
    }

    return (
        <>
            <Dialog open={open} onOpenChange={() => handleDialogChange()}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Your Product</DialogTitle>
                    </DialogHeader>
                    <Card className="border rounded-lg p-4 flex flex-col justify-between">
                        <Image src={image} width={300} height={300} alt={title} className="w-full h-48 object-contain mb-1" />
                        <CardContent className='flex flex-col justify-between h-[150px]'>
                            <h2 className="text-lg font-bold">{title.slice(0, 25)}.</h2>
                            <p className="text-gray-700 text-sm">{description.slice(0, 30)}</p>
                            <p className="text-gray-900 block font-bold px-3 py-2 bg-blue-400 rounded-md mt-auto">${price}</p>
                        </CardContent>
                    </Card>
                </DialogContent>
            </Dialog>

            <Card className="max-w-md mx-auto mt-8">
                <CardHeader>
                    <h1 className="text-2xl font-bold mb-1">Add Product</h1>
                </CardHeader>
                <CardContent>
                    {error && <p className="text-red-500 mb-1">{error}</p>}
                    {success && <p className="text-green-500 mb-1">{success}</p>}
                    <form onSubmit={handleAddProduct}>
                        <div className="mb-1">
                            <label className="block text-sm font-medium">Product Name</label>
                            <Input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                        <div className="mb-1">
                            <label className="block text-sm font-medium">Price</label>
                            <Input
                                type="number"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </div>
                        <div className="mb-1">
                            <label className="block text-sm font-medium">Description</label>
                            <Textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            ></Textarea>
                        </div>
                        <div className="mb-1">
                            <label className="block text-sm font-medium">Image URL</label>
                            <Input
                                type="text"
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                            />
                        </div>
                        <div className="mb-1">
                            <label className="block text-sm font-medium">Category</label>
                            <Input
                                type="text"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            />
                        </div>
                        <Button type="submit" className="w-full">
                            Add Product
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </>
    );
}
