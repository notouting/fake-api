'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/useStore';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
    const setLoggedIn = useAuthStore((state) => state.setLoggedIn);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        // Handle login logic
        fetch('https://fakestoreapi.com/auth/login', {
            headers: {
                "Content-Type": "application/json"
            },
            method: 'POST',
            body: JSON.stringify({
                username: "mor_2314",
                password: "83r5^_"
            })
        })
            .then(res => res.json())
            .then(json => {
                console.log(json.token);
                localStorage.setItem('token', json.token);
                setLoggedIn(true);
                router.push('/dashboard');
            })
            .catch(err => {
                console.log(err);
            });
    };

    return (
        <Card className="max-w-md mx-auto mt-8">
            <CardHeader>
                <h1 className="text-2xl font-bold mb-4">Login</h1>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium">Email</label>
                        <Input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium">Password</label>
                        <Input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <Button type="submit" className="w-full">
                        Login
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
