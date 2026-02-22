import { useState } from 'react';
import { Link } from 'react-router-dom';
import { TOOL_LINKS } from '../../config/tools';

export default function Navbar() {
    const [mobileNavOpen, setMobileNavOpen] = useState(false);

    return (
        <header className="bg-white shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <Link to="/" className="text-xl font-bold text-slate-900 tracking-tight shrink-0">
                        StudentTools<span className="text-slate-600">Hub</span>
                    </Link>
                    <nav className="hidden md:flex items-center gap-1">
                        {TOOL_LINKS.slice(0, 5).map(({ to, label }) => (
                            <Link
                                key={to}
                                to={to}
                                className="text-slate-600 hover:text-slate-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                            >
                                {label}
                            </Link>
                        ))}
                        <Link
                            to="/tools/pdf"
                            className="text-slate-600 hover:text-slate-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                        >
                            PDF Tools
                        </Link>
                    </nav>
                    <button
                        type="button"
                        onClick={() => setMobileNavOpen((o) => !o)}
                        className="md:hidden p-2 rounded-md text-slate-600 hover:bg-slate-100"
                        aria-label="Toggle menu"
                    >
                        {mobileNavOpen ? (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        )}
                    </button>
                </div>
                {mobileNavOpen && (
                    <nav className="md:hidden py-4 border-t border-slate-200">
                        <ul className="space-y-1">
                            {TOOL_LINKS.map(({ to, label }) => (
                                <li key={to}>
                                    <Link
                                        to={to}
                                        onClick={() => setMobileNavOpen(false)}
                                        className="block py-2 px-3 rounded-md text-slate-700 hover:bg-slate-100 text-sm font-medium"
                                    >
                                        {label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                )}
            </div>
        </header>
    );
}
