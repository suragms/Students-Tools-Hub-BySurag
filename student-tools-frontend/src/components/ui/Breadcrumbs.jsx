import { Link } from 'react-router-dom';

export default function Breadcrumbs({ items = [] }) {
    if (!items.length) return null;
    return (
        <nav aria-label="Breadcrumb" className="text-sm text-slate-600 mb-6">
            <ol className="flex flex-wrap items-center gap-1">
                {items.map((item, i) => (
                    <li key={i} className="flex items-center gap-1">
                        {i > 0 && (
                            <span className="text-slate-400" aria-hidden="true">
                                /
                            </span>
                        )}
                        {item.to ? (
                            <Link to={item.to} className="hover:text-slate-900 transition-colors">
                                {item.label}
                            </Link>
                        ) : (
                            <span className="text-slate-900 font-medium">{item.label}</span>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
}
