'use client'
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter()
  if (localStorage.getItem('token')) {
    router.push('/dashboard')
  }
  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">Welcome to FakeStore</h1>
      <p className="mb-4">This is a sample e-commerce application using Next.js, Tailwind CSS, TypeScript, and shadcn/ui.</p>
      <div className="flex space-x-4">
        <Link href="/login">
          <p className="bg-blue-500 text-white py-2 px-4 rounded-md">Login</p>
        </Link>
      </div>
    </div>
  );
}
