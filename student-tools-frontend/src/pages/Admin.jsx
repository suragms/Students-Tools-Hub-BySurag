import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SeoHead from '../components/SeoHead';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import { getStats } from '../utils/analytics';

const ADMIN_PASSWORD = 'Surag@789m#6sM';
const AUTH_KEY = 'admin_auth';

function AdminDashboard() {
    const [stats, setStats] = useState(null);

    useEffect(() => {
        setStats(getStats());
    }, []);

    if (!stats) return <p className="text-slate-500">Loading...</p>;

    const pageEntries = Object.entries(stats.pageViews || {}).sort((a, b) => b[1] - a[1]);
    const totalPageViews = stats.totalPageViews || 0;
    const totalSessions = stats.totalSessions || 0;

    return (
        <div className="space-y-6">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-md">
                    <h3 className="text-sm font-medium text-slate-500 uppercase tracking-wider">Total Page Views</h3>
                    <p className="mt-2 text-3xl font-bold text-slate-900">{totalPageViews.toLocaleString()}</p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-md">
                    <h3 className="text-sm font-medium text-slate-500 uppercase tracking-wider">Total Visitors</h3>
                    <p className="mt-2 text-3xl font-bold text-slate-900">{totalSessions.toLocaleString()}</p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-md">
                    <h3 className="text-sm font-medium text-slate-500 uppercase tracking-wider">Pages Tracked</h3>
                    <p className="mt-2 text-3xl font-bold text-slate-900">{pageEntries.length}</p>
                </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white shadow-md overflow-hidden">
                <h3 className="px-6 py-4 text-lg font-semibold text-slate-900 border-b border-slate-200">
                    Page Views by Route
                </h3>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-slate-200">
                        <thead>
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Page</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Views</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200">
                            {pageEntries.map(([path, views]) => (
                                <tr key={path}>
                                    <td className="px-6 py-4 text-sm text-slate-900">{path || '/'}</td>
                                    <td className="px-6 py-4 text-sm text-slate-600 text-right">{views.toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default function Admin() {
    const [authenticated, setAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        try {
            if (sessionStorage.getItem(AUTH_KEY) === '1') {
                setAuthenticated(true);
            }
        } catch {}
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        if (password === ADMIN_PASSWORD) {
            try {
                sessionStorage.setItem(AUTH_KEY, '1');
            } catch {}
            setAuthenticated(true);
        } else {
            setError('Invalid password');
        }
    };

    const handleLogout = () => {
        try {
            sessionStorage.removeItem(AUTH_KEY);
        } catch {}
        setAuthenticated(false);
        setPassword('');
        navigate('/');
    };

    return (
        <div className="max-w-4xl mx-auto">
            <SeoHead title="Admin" description="Admin dashboard" />
            <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Admin' }]} />

            {!authenticated ? (
                <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-md max-w-md">
                    <h1 className="text-2xl font-bold text-slate-900 mb-4">Admin Login</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="admin-pw" className="block text-sm font-medium text-slate-700 mb-2">
                            Password
                        </label>
                        <input
                            id="admin-pw"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full rounded-lg border border-slate-300 px-4 py-2 text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter admin password"
                            autoComplete="current-password"
                        />
                        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
                        <button
                            type="submit"
                            className="mt-4 w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                        >
                            Login
                        </button>
                    </form>
                </div>
            ) : (
                <>
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold text-slate-900">Analytics Dashboard</h1>
                        <button
                            onClick={handleLogout}
                            className="text-sm text-slate-600 hover:text-slate-900"
                        >
                            Logout
                        </button>
                    </div>
                    <AdminDashboard />
                </>
            )}
        </div>
    );
}
