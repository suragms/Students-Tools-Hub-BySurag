import { Link } from 'react-router-dom';
import SeoHead from '../components/SeoHead';
import FaqSection from '../components/FaqSection';

const NOTES_FAQ = [
    { q: 'What is Notes Maker?', a: 'Notes Maker will let you create, edit, and export study notes in Markdown. This tool is coming soon.' },
    { q: 'Who is it for?', a: 'For BCA, BSc, BCom, BTech, MCA, and university students who want to structure and organize notes in one place.' },
];

export default function NotesMaker() {
    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <SeoHead
                title="Notes Maker for Degree & PG Students (2026)"
                description="Create and organize study notes in Markdown. For BCA, BSc, BCom, MCA students. Coming soon."
            />
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Notes Maker</h1>
            <p className="text-slate-600 mb-6">
                For BCA, BSc, BCom, BTech, MCA, and university students: structure and organize your study notes in one place. Markdown editor coming soon.
            </p>
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 mb-8">
                <div className="p-8 border-2 border-dashed border-slate-200 rounded-lg text-center text-slate-400">
                    Markdown Editor Coming Soon
                </div>
            </div>
            <FaqSection faqs={NOTES_FAQ} />
            <section className="mt-12 pt-8 border-t border-slate-200">
                <h2 className="text-lg font-semibold text-slate-900 mb-3">Related tools</h2>
                <ul className="flex flex-wrap gap-3">
                    {[
                        { path: '/tools/planner', label: 'Study Planner' },
                        { path: '/tools/cgpa', label: 'CGPA Calculator' },
                        { path: '/tools/attendance', label: 'Attendance Calculator' },
                        { path: '/tools/pdf', label: 'PDF Tools' },
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
