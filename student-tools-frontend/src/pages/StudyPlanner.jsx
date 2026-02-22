import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SeoHead from '../components/SeoHead';
import FaqSection from '../components/FaqSection';

const STUDY_PLANNER_FAQ = [
    { q: 'How does the study planner work?', a: 'Enter your subjects and exam date. We split the days from today until the exam equally across subjects and show a day-by-day schedule. You can add or remove subjects anytime.' },
    { q: 'Can I change the exam date?', a: 'Yes. Change the exam date and the schedule updates instantly. The planner counts only weekdays, or all days depending on your preference.' },
    { q: 'How many subjects can I add?', a: 'Add as many as you need. Each subject gets a fair share of days. You can also give more days to harder subjects by adding them multiple times or adjusting later.' },
];

function getDaysBetween(start, end, weekdaysOnly = false) {
    const days = [];
    const d = new Date(start);
    d.setHours(0, 0, 0, 0);
    const endDate = new Date(end);
    endDate.setHours(0, 0, 0, 0);
    while (d <= endDate) {
        if (!weekdaysOnly || (d.getDay() !== 0 && d.getDay() !== 6)) {
            days.push(new Date(d));
        }
        d.setDate(d.getDate() + 1);
    }
    return days;
}

function formatDate(d) {
    return d.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' });
}

export default function StudyPlanner() {
    const today = new Date().toISOString().slice(0, 10);
    const defaultExamDate = (() => {
        const d = new Date();
        d.setDate(d.getDate() + 30);
        return d.toISOString().slice(0, 10);
    })();

    const [subjects, setSubjects] = useState([{ id: 1, name: '' }, { id: 2, name: '' }]);
    const [examDate, setExamDate] = useState(defaultExamDate);
    const [weekdaysOnly, setWeekdaysOnly] = useState(false);
    const [schedule, setSchedule] = useState([]);

    useEffect(() => {
        const start = new Date();
        start.setHours(0, 0, 0, 0);
        const end = new Date(examDate);
        end.setHours(0, 0, 0, 0);
        if (end <= start) {
            setSchedule([]);
            return;
        }
        const days = getDaysBetween(start, end, weekdaysOnly);
        const validSubjects = subjects.filter((s) => s.name.trim());
        if (validSubjects.length === 0 || days.length === 0) {
            setSchedule([]);
            return;
        }
        const daysPerSubject = Math.max(1, Math.floor(days.length / validSubjects.length));
        const result = [];
        let dayIndex = 0;
        validSubjects.forEach((sub, i) => {
            const isLast = i === validSubjects.length - 1;
            const count = isLast ? days.length - dayIndex : daysPerSubject;
            for (let j = 0; j < count && dayIndex < days.length; j++) {
                result.push({ date: days[dayIndex], subject: sub.name.trim() });
                dayIndex++;
            }
        });
        setSchedule(result);
    }, [subjects, examDate, weekdaysOnly]);

    const addSubject = () => {
        setSubjects([...subjects, { id: Date.now(), name: '' }]);
    };

    const removeSubject = (id) => {
        if (subjects.length > 1) {
            setSubjects(subjects.filter((s) => s.id !== id));
        }
    };

    const updateSubject = (id, name) => {
        setSubjects(subjects.map((s) => (s.id === id ? { ...s, name } : s)));
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <SeoHead
                title="Study Planner Generator for Degree & PG Students (2026)"
                description="Free study planner: enter subjects and exam date, get a daily study schedule. For BCA, BSc, BCom, MCA, university students."
            />
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Study Planner</h1>
            <p className="text-slate-600 mb-8">
                For BCA, BSc, BCom, BTech, MCA, and university students: enter your subjects and exam date to get a day-by-day study schedule.
            </p>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 mb-8">
                <h2 className="text-lg font-semibold text-slate-900 mb-4">Subjects and exam date</h2>
                <div className="space-y-3 mb-4">
                    {subjects.map((s) => (
                        <div key={s.id} className="flex gap-2 items-center">
                            <input
                                type="text"
                                placeholder="Subject name"
                                value={s.name}
                                onChange={(e) => updateSubject(s.id, e.target.value)}
                                className="flex-1 rounded-lg border border-slate-300 px-3 py-2 focus:ring-2 focus:ring-slate-900 focus:border-slate-900"
                            />
                            <button
                                type="button"
                                onClick={() => removeSubject(s.id)}
                                className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                </div>
                <button
                    type="button"
                    onClick={addSubject}
                    className="rounded-lg border border-slate-300 border-dashed px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
                >
                    + Add subject
                </button>
                <div className="mt-6 flex flex-wrap gap-4 items-center">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Exam date</label>
                        <input
                            type="date"
                            min={today}
                            value={examDate}
                            onChange={(e) => setExamDate(e.target.value)}
                            className="rounded-lg border border-slate-300 px-3 py-2 focus:ring-2 focus:ring-slate-900 focus:border-slate-900"
                        />
                    </div>
                    <label className="flex items-center gap-2 mt-6">
                        <input
                            type="checkbox"
                            checked={weekdaysOnly}
                            onChange={(e) => setWeekdaysOnly(e.target.checked)}
                            className="rounded border-slate-300 text-slate-900 focus:ring-slate-900"
                        />
                        <span className="text-sm text-slate-700">Weekdays only</span>
                    </label>
                </div>
            </div>

            {schedule.length > 0 && (
                <div className="bg-slate-900 text-white rounded-xl p-6 mb-8">
                    <h2 className="text-lg font-semibold mb-4">Your study schedule</h2>
                    <ul className="space-y-2 max-h-[400px] overflow-y-auto">
                        {schedule.map((row, i) => (
                            <li key={i} className="flex justify-between items-center py-2 border-b border-slate-700 last:border-0">
                                <span className="text-slate-300 text-sm">{formatDate(row.date)}</span>
                                <span className="font-medium">{row.subject}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <FaqSection faqs={STUDY_PLANNER_FAQ} />
            <section className="mt-12 pt-8 border-t border-slate-200">
                <h2 className="text-lg font-semibold text-slate-900 mb-3">Related tools</h2>
                <ul className="flex flex-wrap gap-3">
                    {[
                        { path: '/tools/exam-countdown', label: 'Exam Countdown' },
                        { path: '/tools/cgpa', label: 'CGPA Calculator' },
                        { path: '/tools/attendance', label: 'Attendance Calculator' },
                        { path: '/tools/internal-marks', label: 'Internal Marks Calculator' },
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
