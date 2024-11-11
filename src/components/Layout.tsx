// components/Layout.tsx
import { ReactNode } from 'react';
import NavBar from './Navbar';
import Footer from './Footer';

interface LayoutProps {
    children: ReactNode;
}

function Layout({ children }: LayoutProps) {
    return (
        <>
            <NavBar />
            <main>
                {children}
            </main>
            <Footer />
        </>
    );
}

export default Layout;