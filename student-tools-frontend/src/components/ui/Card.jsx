export default function Card({ children, className = '', hover = false, ...props }) {
    return (
        <div
            className={`rounded-xl border border-slate-200 bg-white shadow-md ${hover ? 'hover:shadow-xl transition-shadow duration-200' : ''} ${className}`}
            {...props}
        >
            {children}
        </div>
    );
}
