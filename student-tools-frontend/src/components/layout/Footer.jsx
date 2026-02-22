import { Link } from 'react-router-dom';
import { TOOL_LINKS } from '../../config/tools';

export default function Footer() {
    return (
        <footer className="bg-slate-800 text-white mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
                    <div>
                        <h3 className="text-lg font-bold mb-3">StudentTools Hub</h3>
                        <p className="text-slate-400 text-sm">Free smart tools for degree and PG students. No sign-up required.</p>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300 mb-3">Tools</h3>
                        <ul className="space-y-2">
                            {TOOL_LINKS.filter((t) => !t.to.startsWith('/tools/pdf/')).map(({ to, label }) => (
                                <li key={to}>
                                    <Link to={to} className="text-slate-400 hover:text-white text-sm transition-colors">
                                        {label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300 mb-3">PDF Tools</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/tools/pdf" className="text-slate-400 hover:text-white text-sm transition-colors">
                                    All PDF Tools
                                </Link>
                            </li>
                            <li>
                                <Link to="/tools/pdf/merge" className="text-slate-400 hover:text-white text-sm transition-colors">
                                    Merge PDF
                                </Link>
                            </li>
                            <li>
                                <Link to="/tools/pdf/delete" className="text-slate-400 hover:text-white text-sm transition-colors">
                                    Delete Pages
                                </Link>
                            </li>
                            <li>
                                <Link to="/tools/pdf/reorder" className="text-slate-400 hover:text-white text-sm transition-colors">
                                    Reorder Pages
                                </Link>
                            </li>
                            <li>
                                <Link to="/tools/pdf/extract" className="text-slate-400 hover:text-white text-sm transition-colors">
                                    Extract Pages
                                </Link>
                            </li>
                            <li>
                                <Link to="/tools/pdf/rotate" className="text-slate-400 hover:text-white text-sm transition-colors">
                                    Rotate Pages
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300 mb-3">For students</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/tools/cgpa" className="text-slate-400 hover:text-white text-sm transition-colors">
                                    For BCA / BSc / MCA
                                </Link>
                            </li>
                            <li>
                                <Link to="/tools/cgpa" className="text-slate-400 hover:text-white text-sm transition-colors">
                                    For BCom / BBA / MBA
                                </Link>
                            </li>
                            <li>
                                <Link to="/tools/cgpa" className="text-slate-400 hover:text-white text-sm transition-colors">
                                    For BTech
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300 mb-3">Company</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/about" className="text-slate-400 hover:text-white text-sm transition-colors">
                                    About
                                </Link>
                            </li>
                            <li>
                                <Link to="/privacy" className="text-slate-400 hover:text-white text-sm transition-colors">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact" className="text-slate-400 hover:text-white text-sm transition-colors">
                                    Contact
                                </Link>
                            </li>
                            <li>
                                <Link to="/" className="text-slate-400 hover:text-white text-sm transition-colors">
                                    Sitemap
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="mt-10 pt-8 border-t border-slate-700 text-center text-sm text-slate-400">
                    &copy; {new Date().getFullYear()} StudentTools Hub. Surag M S | Hexstack Ai Solutions
                </div>
            </div>
        </footer>
    );
}
