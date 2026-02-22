import { Link } from 'react-router-dom';
import SeoHead from '../components/SeoHead';
import FaqSection from '../components/FaqSection';
import AdBanner from '../components/layout/AdBanner';

const PDF_TOOLS = [
    { title: 'Merge PDF', description: 'Combine multiple PDFs into one. Reorder before merging.', path: '/tools/pdf/merge', icon: 'M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4' },
    { title: 'Delete Pages', description: 'Remove specific pages from a PDF.', path: '/tools/pdf/delete', icon: 'M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16' },
    { title: 'Reorder Pages', description: 'Drag and drop to reorder PDF pages.', path: '/tools/pdf/reorder', icon: 'M4 6h16M4 10h16M4 14h16M4 18h16' },
    { title: 'Extract Pages', description: 'Select pages to extract into a new PDF.', path: '/tools/pdf/extract', icon: 'M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4' },
    { title: 'Rotate Pages', description: 'Rotate pages 90, 180, or 270 degrees.', path: '/tools/pdf/rotate', icon: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15' },
];

const PDF_FAQ = [
    { q: 'Are my files uploaded to a server?', a: 'No. All PDF processing happens in your browser. Files never leave your device.' },
    { q: 'Is there a file size limit?', a: 'We recommend PDFs under 50MB for best performance. Very large files may slow down your browser.' },
    { q: 'Do I need to sign up?', a: 'No. All tools work without login. Just upload, edit, and download.' },
    { q: 'Who are these tools for?', a: 'Degree and PG students: BCA, BSc, BCom, BTech, MCA, MBA—anyone who needs quick PDF edits for assignments and reports.' },
];

export default function PDFTools() {
    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <SeoHead
                title="Free Online PDF Tools for Students (2026)"
                description="Merge, delete, reorder, extract, and rotate PDF pages. Free browser-based tools for BCA, BSc, BCom, MCA students. No signup, no upload to server."
            />
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Free Online PDF Tools for Students</h1>
            <p className="text-slate-600 mb-10">
                For BCA, BSc, BCom, BTech, MCA, and university students: merge, delete, reorder, extract, and rotate PDF pages. All processing in your browser—no upload to server, no signup.
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {PDF_TOOLS.map((tool) => (
                    <Link
                        key={tool.path}
                        to={tool.path}
                        className="group flex flex-col p-6 rounded-xl border border-slate-200 bg-white hover:border-slate-300 hover:shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2"
                    >
                        <div className="mb-4 text-slate-500 group-hover:text-slate-700">
                            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={tool.icon} />
                            </svg>
                        </div>
                        <h2 className="text-lg font-semibold text-slate-900 mb-1">{tool.title}</h2>
                        <p className="text-sm text-slate-600 flex-grow mb-4">{tool.description}</p>
                        <span className="inline-flex items-center text-sm font-medium text-slate-900 group-hover:underline">
                            Use tool
                            <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </span>
                    </Link>
                ))}
            </div>

            <AdBanner position="in-content" />

            <FaqSection faqs={PDF_FAQ} />
            <section className="mt-12 pt-8 border-t border-slate-200">
                <h2 className="text-lg font-semibold text-slate-900 mb-3">Related tools</h2>
                <ul className="flex flex-wrap gap-3">
                    {[
                        { path: '/tools/notes', label: 'Notes Maker' },
                        { path: '/tools/planner', label: 'Study Planner' },
                        { path: '/tools/cgpa', label: 'CGPA Calculator' },
                        { path: '/tools/attendance', label: 'Attendance Calculator' },
                    ].map(({ path, label }) => (
                        <li key={path}>
                            <Link to={path} className="text-blue-600 hover:underline font-medium">
                                {label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );
}
