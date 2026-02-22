import { Outlet } from 'react-router-dom';
import Navbar from './layout/Navbar';
import Footer from './layout/Footer';
import AdBanner from './layout/AdBanner';
import AnnouncementBar from './layout/AnnouncementBar';
import PageViewTracker from './PageViewTracker';

const Layout = () => {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
            <PageViewTracker />
            <AnnouncementBar />
            <Navbar />
            <div className="border-b border-slate-200">
                <AdBanner position="top" />
            </div>
            <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
                <Outlet />
            </main>
            <AdBanner position="bottom" />
            <Footer />
        </div>
    );
};

export default Layout;
