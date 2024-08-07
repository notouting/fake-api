'use client';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useAuthStore } from '@/lib/useStore';

export default function Header() {
    const loggedIn = useAuthStore((state) => state.loggedIn);
    const setLoggedIn = useAuthStore((state) => state.setLoggedIn);

    const handleRemoveToken = () => {
        localStorage.removeItem('token');
        setLoggedIn(false);
    };

    return (
        <header className="bg-purple-500 p-4 text-white">
            <div className="container mx-auto flex justify-between items-center">
                <Link href="/">
                    <h1 className="text-xl font-bold">Fake Store</h1>
                </Link>
                <nav>
                    <Link href="/dashboard">
                        <Button className="mr-4 text-purple-500">Dashboard</Button>
                    </Link>
                    <Link href="/add-product">
                        <Button className='bg-white text-purple-500 mr-4'>Add Product</Button>
                    </Link>
                    {loggedIn ? (
                        <Button onClick={handleRemoveToken} className='bg-purple-500 border-white border text-white'>
                            Logout
                        </Button>
                    ) : (
                        <Link href="/login">
                            <Button className='bg-white text-purple-500 mr-4'>Login</Button>
                        </Link>
                    )}
                </nav>
            </div>
        </header>
    );
}
