'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useEffect } from 'react';
import Navbar from "./components/navbar/page";
import Footer from "./components/footer/page";

export default function ClientLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const router = useRouter();
    const { user, isLoading } = useAuth();

    const isAuthPage = pathname === '/authentication';
    const isPublicPage = pathname === '/';

    // Protected routes logic
    useEffect(() => {
        if (isLoading) return;

        // Redirect to login if accessing protected route without user
        if (!user && !isAuthPage && !isPublicPage) {
            router.push('/authentication');
        }

        // Redirect to home if accessing auth page while logged in
        if (user && isAuthPage) {
            router.push('/');
        }
    }, [user, isLoading, isAuthPage, isPublicPage, router]);

    // Show generic loading state or specific page loader
    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-brand-beige">
                <div className="w-12 h-12 border-4 border-brand-orange/30 border-t-brand-rust rounded-full animate-spin"></div>
            </div>
        );
    }

    if (isAuthPage) {
        return <>{children}</>;
    }

    // If protected route and no user, return nothing while redirecting
    if (!user && !isPublicPage) {
        return null;
    }

    return (
        <>
            <Navbar />
            {children}
            <Footer />
        </>
    );
}
