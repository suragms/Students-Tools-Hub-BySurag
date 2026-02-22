import { createContext, useContext, useState, useCallback } from 'react';

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
    const [toast, setToast] = useState(null);

    const showToast = useCallback((message, duration = 4000) => {
        setToast(message);
        const id = setTimeout(() => setToast(null), duration);
        return () => clearTimeout(id);
    }, []);

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            {toast && (
                <div
                    role="alert"
                    className="fixed bottom-6 right-6 z-[100] animate-in slide-in-from-bottom-4 fade-in rounded-lg bg-slate-900 text-white px-4 py-3 shadow-lg max-w-sm"
                    style={{
                        animation: 'toastSlideIn 0.3s ease-out',
                    }}
                >
                    <p className="text-sm">{toast}</p>
                </div>
            )}
        </ToastContext.Provider>
    );
}

export function useToast() {
    const ctx = useContext(ToastContext);
    if (!ctx) throw new Error('useToast must be used within ToastProvider');
    return ctx;
}
