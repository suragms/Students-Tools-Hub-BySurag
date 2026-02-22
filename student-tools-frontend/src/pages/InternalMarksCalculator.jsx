import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { calculateInternalMarks, UNIVERSITY_PRESETS } from '../utils/internalMarksUtils';
import SeoHead from '../components/SeoHead';
import FaqSection from '../components/FaqSection';

const PRESET_OPTIONS = Object.entries(UNIVERSITY_PRESETS);

const INTERNAL_MARKS_FAQ = [
    { q: 'How are internal marks calculated?', a: 'Internal marks are usually a weighted combination of assignments, tests, and attendance. Enter your scores and the maximum marks for each component; the calculator applies the selected university weight pattern to get your total internal score.' },
    { q: 'What if my university uses different weights?', a: 'Choose the preset closest to your syllabus or use "Default" and we use equal weights (33.33% each). You can request more presets for specific universities.' },
    { q: 'Is attendance part of internal assessment?', a: 'In many degree and PG programs, a portion of internal marks is from attendance (e.g. 5–10 marks). Enter your attendance marks and the maximum to include it in the total.' },
];

export default function InternalMarksCalculator() {
    const [assignmentTotal, setAssignmentTotal] = useState('');
    const [assignmentMax, setAssignmentMax] = useState('25');
    const [testTotal, setTestTotal] = useState('');
    const [testMax, setTestMax] = useState('50');
    const [attendanceMarks, setAttendanceMarks] = useState('');
    const [attendanceMax, setAttendanceMax] = useState('5');
    const [presetKey, setPresetKey] = useState('default');
    const [result, setResult] = useState(null);

    const preset = UNIVERSITY_PRESETS[presetKey];

    useEffect(() => {
        if (
            (assignmentTotal !== '' || testTotal !== '' || attendanceMarks !== '') &&
            assignmentMax && testMax && attendanceMax
        ) {
            const r = calculateInternalMarks(
                assignmentTotal,
                assignmentMax,
                testTotal,
                testMax,
                attendanceMarks,
                attendanceMax,
                preset
            );
            setResult(r);
        } else {
            setResult(null);
        }
    }, [assignmentTotal, assignmentMax, testTotal, testMax, attendanceMarks, attendanceMax, presetKey]);

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <SeoHead
                title="Internal Marks Calculator for BCA, BSc, BCom & MCA (2026)"
                description="Calculate your internal assessment marks from assignments, tests, and attendance. Free tool for degree and PG students."
            />
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Internal Marks Calculator</h1>
            <p className="text-slate-600 mb-8">
                For BCA, BSc, BCom, BTech, MCA, and university students: enter your assignment, test, and attendance marks to get your total internal score instantly.
            </p>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 mb-8">
                <h2 className="text-lg font-semibold text-slate-900 mb-4">Enter your marks</h2>
                <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Assignment (obtained / max)</label>
                        <div className="flex gap-2">
                            <input
                                type="number"
                                min="0"
                                step="0.01"
                                placeholder="Obtained"
                                value={assignmentTotal}
                                onChange={(e) => setAssignmentTotal(e.target.value)}
                                className="flex-1 rounded-lg border border-slate-300 px-3 py-2 focus:ring-2 focus:ring-slate-900 focus:border-slate-900"
                            />
                            <input
                                type="number"
                                min="1"
                                step="0.01"
                                value={assignmentMax}
                                onChange={(e) => setAssignmentMax(e.target.value)}
                                className="w-20 rounded-lg border border-slate-300 px-3 py-2 focus:ring-2 focus:ring-slate-900 focus:border-slate-900"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Test (obtained / max)</label>
                        <div className="flex gap-2">
                            <input
                                type="number"
                                min="0"
                                step="0.01"
                                placeholder="Obtained"
                                value={testTotal}
                                onChange={(e) => setTestTotal(e.target.value)}
                                className="flex-1 rounded-lg border border-slate-300 px-3 py-2 focus:ring-2 focus:ring-slate-900 focus:border-slate-900"
                            />
                            <input
                                type="number"
                                min="1"
                                step="0.01"
                                value={testMax}
                                onChange={(e) => setTestMax(e.target.value)}
                                className="w-20 rounded-lg border border-slate-300 px-3 py-2 focus:ring-2 focus:ring-slate-900 focus:border-slate-900"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Attendance (obtained / max)</label>
                        <div className="flex gap-2">
                            <input
                                type="number"
                                min="0"
                                step="0.01"
                                placeholder="Obtained"
                                value={attendanceMarks}
                                onChange={(e) => setAttendanceMarks(e.target.value)}
                                className="flex-1 rounded-lg border border-slate-300 px-3 py-2 focus:ring-2 focus:ring-slate-900 focus:border-slate-900"
                            />
                            <input
                                type="number"
                                min="1"
                                step="0.01"
                                value={attendanceMax}
                                onChange={(e) => setAttendanceMax(e.target.value)}
                                className="w-20 rounded-lg border border-slate-300 px-3 py-2 focus:ring-2 focus:ring-slate-900 focus:border-slate-900"
                            />
                        </div>
                    </div>
                    <div className="sm:col-span-2">
                        <label className="block text-sm font-medium text-slate-700 mb-1">University format</label>
                        <select
                            value={presetKey}
                            onChange={(e) => setPresetKey(e.target.value)}
                            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:ring-2 focus:ring-slate-900 focus:border-slate-900"
                        >
                            {PRESET_OPTIONS.map(([key, p]) => (
                                <option key={key} value={key}>{p.name}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {result && (
                <div className="bg-slate-900 text-white rounded-xl p-6 mb-8">
                    <h2 className="text-lg font-semibold mb-4">Your internal score</h2>
                    <p className="text-4xl font-bold mb-2">{result.total} / 100</p>
                    <p className="text-slate-300 text-sm">
                        Assignment: {result.assignmentPct}% · Test: {result.testPct}% · Attendance: {result.attendancePct}%
                    </p>
                </div>
            )}

            <FaqSection faqs={INTERNAL_MARKS_FAQ} />
            <RelatedTools current="internal-marks" />
        </div>
    );
}

function RelatedTools({ current }) {
    const tools = [
        { path: '/tools/cgpa', label: 'CGPA Calculator' },
        { path: '/tools/attendance', label: 'Attendance Calculator' },
        { path: '/tools/planner', label: 'Study Planner' },
        { path: '/tools/exam-countdown', label: 'Exam Countdown' },
    ].filter((t) => !t.path.includes(current));
    return (
        <section className="mt-12 pt-8 border-t border-slate-200">
            <h2 className="text-lg font-semibold text-slate-900 mb-3">Related tools</h2>
            <ul className="flex flex-wrap gap-3">
                {tools.map((t) => (
                    <li key={t.path}>
                        <Link to={t.path} className="text-blue-600 hover:underline font-medium">
                            {t.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </section>
    );
}
