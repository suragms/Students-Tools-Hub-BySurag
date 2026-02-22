import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { recordPageView } from '../utils/analytics';

export default function PageViewTracker() {
    const { pathname } = useLocation();

    useEffect(() => {
        const path = pathname || '/';
        recordPageView(path === '/' ? '/' : path);
    }, [pathname]);

    return null;
}
