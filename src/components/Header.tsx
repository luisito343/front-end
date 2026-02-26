import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navLinkStyles = ({ isActive }: { isActive: boolean }) =>
        `transition-all duration-300 hover:text-blue-400 ${isActive ? 'text-blue-500 font-semibold border-b-2 border-blue-500' : 'text-gray-600'}`;

    return (
        <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                {/* Logo */}
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-xl">I</span>
                    </div>
                    <h1 className="text-xl font-bold tracking-tight text-gray-800">
                        Inventory<span className="text-blue-600">Lab</span>
                    </h1>
                </div>

                {/* Navigation */}
                <nav className="hidden md:flex gap-8 items-center text-sm uppercase tracking-wider">
                    <NavLink to="/" className={navLinkStyles}>
                        Products
                    </NavLink>
                    <NavLink
                        to="/add-product"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full transition-all shadow-md hover:shadow-blue-200 active:scale-95"
                    >
                        Add Product
                    </NavLink>
                </nav>

                <button
                    type="button"
                    className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-100 transition-colors"
                    aria-label="Toggle menu"
                    aria-expanded={isMenuOpen}
                    onClick={() => setIsMenuOpen((prev) => !prev)}
                >
                    <span className="sr-only">Open menu</span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="w-5 h-5"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>

            {isMenuOpen && (
                <nav className="md:hidden px-6 pb-4 flex flex-col gap-3 text-sm uppercase tracking-wider border-t border-gray-100 bg-white/95">
                    <NavLink
                        to="/"
                        className={navLinkStyles}
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Products
                    </NavLink>
                    <NavLink
                        to="/add-product"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full transition-all shadow-md hover:shadow-blue-200 active:scale-95 text-center"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Add Product
                    </NavLink>
                </nav>
            )}
        </header>
    );
};

export default Header;