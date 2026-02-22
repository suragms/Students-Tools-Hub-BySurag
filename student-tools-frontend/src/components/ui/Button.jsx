export default function Button({ children, variant = 'primary', className = '', disabled, ...props }) {
    const base = 'inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
    const variants = {
        primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-600',
        secondary: 'bg-slate-100 text-slate-900 hover:bg-slate-200 focus:ring-slate-500',
        ghost: 'bg-transparent text-slate-700 hover:bg-slate-100 focus:ring-slate-400',
    };
    return (
        <button
            className={`${base} ${variants[variant] || variants.primary} ${className}`}
            disabled={disabled}
            {...props}
        >
            {children}
        </button>
    );
}
