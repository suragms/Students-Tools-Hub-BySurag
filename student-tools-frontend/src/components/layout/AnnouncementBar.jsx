import { useState, useEffect } from 'react';

const STORAGE_KEY = 'announcement-dismissed';
const DEFAULT_MESSAGE = 'New PDF Rotate Tool Live Now! Try it free.';

export default function AnnouncementBar({ message = DEFAULT_MESSAGE }) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        try {
            const dismissed = localStorage.getItem(STORAGE_KEY);
            if (!dismissed) setVisible(true);
        } catch {
            setVisible(true);
        }
    }, []);

    const dismiss = () => {
        setVisible(false);
        try {
            localStorage.setItem(STORAGE_KEY, 'true');
        } catch {}
    };

    if (!visible) return null;

    return (
        <div className="bg-blue-600 text-white py-2 px-4">
            <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
                <p className="text-sm font-medium truncate">{message}</p>
                <button
                    type="button"
                    onClick={dismiss}
                    className="shrink-0 p-1 rounded hover:bg-blue-700 transition-colors"
                    aria-label="Dismiss"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
        </div>
    );
}
