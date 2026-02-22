export default function Badge({ variant = 'default', children, className = '' }) {
    const variants = {
        popular: 'bg-amber-100 text-amber-800',
        new: 'bg-emerald-100 text-emerald-800',
        comingSoon: 'bg-slate-100 text-slate-600',
        default: 'bg-slate-100 text-slate-700',
    };
    return (
        <span
            className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium ${variants[variant] || variants.default} ${className}`}
        >
            {children}
        </span>
    );
}
