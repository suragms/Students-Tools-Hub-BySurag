import { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TOOLS, PDF_TOOLS, CATEGORIES } from '../config/tools';
import Badge from './ui/Badge';
import Card from './ui/Card';
import Button from './ui/Button';
import AdBanner from './layout/AdBanner';
import { useToast } from './ui/Toast';

function Icon({ d }) {
    return (
        <svg className="w-8 h-8 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={d} />
        </svg>
    );
}

function ToolCard({ tool, onComingSoonClick }) {
    const isComingSoon = tool.comingSoon;
    const handleClick = (e) => {
        if (isComingSoon) {
            e.preventDefault();
            onComingSoonClick?.();
        }
    };

    const content = (
        <div className="group flex flex-col h-full p-6">
            <div className="flex items-start justify-between mb-4">
                <div className="text-slate-400 group-hover:text-slate-600 transition-colors">
                    <Icon d={tool.icon} />
                </div>
                {tool.badge && (
                    <Badge variant={tool.badge}>
                        {tool.badge === 'popular' ? 'Popular' : tool.badge === 'new' ? 'New' : 'Coming Soon'}
                    </Badge>
                )}
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-1 group-hover:text-slate-700">
                {tool.title}
            </h3>
            <p className="text-sm text-slate-600 flex-grow">{tool.description}</p>
            <span className="mt-4 inline-flex items-center text-sm font-medium text-slate-900 group-hover:underline">
                {isComingSoon ? 'Coming soon' : 'Use tool'}
                <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </span>
        </div>
    );

    if (isComingSoon) {
        return (
            <div
                role="button"
                tabIndex={0}
                onClick={handleClick}
                onKeyDown={(e) => e.key === 'Enter' && handleClick(e)}
                className="cursor-pointer"
            >
                <Card hover className="h-full border-slate-200 bg-slate-50/50 hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2">
                    {content}
                </Card>
            </div>
        );
    }

    return (
        <Link to={tool.path}>
            <Card hover className="h-full border-slate-200 bg-slate-50/50 hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2 block">
                {content}
            </Card>
        </Link>
    );
}

function CategorySection({ title, tools, onComingSoonClick }) {
    if (tools.length === 0) return null;

    return (
        <section className="mb-12">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">{title}</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {tools.map((tool) => (
                    <ToolCard key={tool.path} tool={tool} onComingSoonClick={onComingSoonClick} />
                ))}
            </div>
        </section>
    );
}

const FEATURES = [
    { icon: 'M13 10V3L4 14h7v7l9-11h-7z', title: 'Instant calculation', desc: 'Get results as you type. No reload, no wait.' },
    { icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z', title: 'No login required', desc: 'Use any tool without creating an account.' },
    { icon: 'M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z', title: 'Mobile friendly', desc: 'Works great on phones and tablets.' },
    { icon: 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z', title: '100% free', desc: 'No subscriptions or hidden costs.' },
];

const Welcome = () => {
    const [search, setSearch] = useState('');
    const showToast = useToast().showToast;
    const navigate = useNavigate();

    const handleComingSoon = () => {
        showToast('This tool is launching soon. Stay tuned!');
    };

    const allTools = useMemo(() => TOOLS, []);
    const filteredTools = useMemo(() => {
        if (!search.trim()) return allTools;
        const q = search.trim().toLowerCase();
        return allTools.filter(
            (t) =>
                t.title.toLowerCase().includes(q) ||
                (t.description && t.description.toLowerCase().includes(q))
        );
    }, [allTools, search]);

    const academicTools = useMemo(() => filteredTools.filter((t) => t.category === CATEGORIES.academic), [filteredTools]);
    const pdfTools = useMemo(() => filteredTools.filter((t) => t.category === CATEGORIES.pdf), [filteredTools]);
    const productivityTools = useMemo(() => filteredTools.filter((t) => t.category === CATEGORIES.productivity), [filteredTools]);
    const upcomingTools = useMemo(() => filteredTools.filter((t) => t.category === CATEGORIES.upcoming), [filteredTools]);
    const hasNoResults = search.trim() && filteredTools.length === 0;

    return (
        <div className="min-h-[80vh]">
            <section className="max-w-4xl mx-auto pt-16 pb-12 px-4 sm:px-6">
                <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight leading-tight mb-6">
                    Free Smart Tools for Degree & PG Students
                </h1>
                <p className="text-xl text-slate-600 leading-relaxed max-w-2xl mb-10">
                    No Login. No Signup. Instant Results.
                </p>
                <p className="text-slate-600 mb-10 max-w-2xl">
                    For BCA, BSc, BCom, BTech, MCA, MSc, MBA and university students. CGPA, attendance, internal marks, study planner, exam countdown—one-click, use, get result, done.
                </p>
                <div className="flex flex-wrap gap-4">
                    <Button variant="primary" onClick={() => navigate('/tools/cgpa')}>
                        Explore tools
                        <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Button>
                    <Button variant="secondary" onClick={() => navigate('/tools/pdf')}>
                        View PDF Tools
                        <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                    </Button>
                </div>
            </section>

            <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-6">
                <label htmlFor="tool-search" className="sr-only">Find a tool</label>
                <input
                    id="tool-search"
                    type="search"
                    placeholder="Find a tool (e.g. CGPA, attendance, countdown, PDF)"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full max-w-xl block rounded-xl border border-slate-300 px-4 py-3 text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
            </section>

            <section className="border-t border-slate-200 bg-white">
                <div className="max-w-6xl mx-auto py-16 px-4 sm:px-6">
                    <h2 className="text-2xl font-semibold text-slate-900 mb-2">Tools</h2>
                    <p className="text-slate-600 mb-10 max-w-xl">No sign-up required. Use what you need, when you need it.</p>

                    <CategorySection title={CATEGORIES.academic} tools={academicTools} onComingSoonClick={handleComingSoon} />
                    <CategorySection title={CATEGORIES.pdf} tools={pdfTools} onComingSoonClick={handleComingSoon} />
                    <CategorySection title={CATEGORIES.productivity} tools={productivityTools} onComingSoonClick={handleComingSoon} />
                    <CategorySection title={CATEGORIES.upcoming} tools={upcomingTools} onComingSoonClick={handleComingSoon} />

                    {hasNoResults && (
                        <p className="text-slate-500">No tools match &quot;{search}&quot;. Try another search.</p>
                    )}
                </div>
            </section>

            <AdBanner position="in-content" />

            <section className="max-w-6xl mx-auto py-16 px-4 sm:px-6">
                <h2 className="text-2xl font-semibold text-slate-900 mb-8 text-center">Why Students Love Us</h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {FEATURES.map((f) => (
                        <div key={f.title} className="text-center">
                            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-100 text-blue-600 mb-4">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={f.icon} />
                                </svg>
                            </div>
                            <h3 className="font-semibold text-slate-900 mb-1">{f.title}</h3>
                            <p className="text-sm text-slate-600">{f.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="max-w-4xl mx-auto py-12 px-4 sm:px-6 text-center">
                <p className="text-slate-500 text-sm">Free to use. No account required. Built for students.</p>
            </section>
        </div>
    );
};

export default Welcome;
