import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SeoHead from '../components/SeoHead';
import FaqSection from '../components/FaqSection';

const STORAGE_KEY = 'examCountdownDate';

function getDefaultDate() {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            const d = new Date(stored);
            if (!isNaN(d.getTime())) return stored.slice(0, 10);
        }
    } catch (_) {}
    const d = new Date();
    d.setDate(d.getDate() + 30);
    return d.toISOString().slice(0, 10);
}

function getTimeLeft(targetDate) {
    const now = new Date().getTime();
    const target = new Date(targetDate).setHours(0, 0, 0, 0);
    const diff = target - now;
    if (diff <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
    }
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    return { days, hours, minutes, seconds, isPast: false };
}

const EXAM_COUNTDOWN_FAQ = [
    { q: 'How does the exam countdown work?', a: 'Enter your exam date and we show a live countdown in days, hours, minutes, and seconds. The countdown updates every second. Your last selected date is saved in this browser so you can return and see it again.' },
    { q: 'Can I use this for multiple exams?', a: 'You can change the date anytime. For multiple exams, open the tool in different tabs or bookmark the page and update the date when you switch focus.' },
    { q: 'Is the countdown accurate?', a: 'Yes. It uses your device clock and updates every second. It counts down to the start of the selected date (midnight).' },
];

export default function ExamCountdown() {
    const [date, setDate] = useState(getDefaultDate());
    const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(getDefaultDate()));

    useEffect(() => {
        const id = setInterval(() => {
            setTimeLeft(getTimeLeft(date));
        }, 1000);
        return () => clearInterval(id);
    }, [date]);

    useEffect(() => {
        try {
            if (date) localStorage.setItem(STORAGE_KEY, date);
        } catch (_) {}
    }, [date]);

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <SeoHead
                title="Exam Countdown Timer for Degree & PG Students (2026)"
                description="Free exam countdown timer. Enter your exam date and see days, hours, minutes, and seconds until the big day."
            />
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Exam Countdown Timer</h1>
            <p className="text-slate-600 mb-8">
                For BCA, BSc, BCom, BTech, MCA, and university students: set your exam date and track the countdown in real time.
            </p>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 mb-8">
                <label className="block text-sm font-medium text-slate-700 mb-2">Exam date</label>
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="rounded-lg border border-slate-300 px-4 py-2 text-lg focus:ring-2 focus:ring-slate-900 focus:border-slate-900"
                />
            </div>

            <div className="bg-slate-900 text-white rounded-xl p-8 mb-8">
                <h2 className="text-lg font-semibold mb-6 text-center">Time until exam</h2>
                {timeLeft.isPast ? (
                    <p className="text-2xl text-center">The selected date has passed. Pick a future date above.</p>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                        <div>
                            <p className="text-4xl font-bold">{String(timeLeft.days).padStart(2, '0')}</p>
                            <p className="text-slate-400 text-sm">Days</p>
                        </div>
                        <div>
                            <p className="text-4xl font-bold">{String(timeLeft.hours).padStart(2, '0')}</p>
                            <p className="text-slate-400 text-sm">Hours</p>
                        </div>
                        <div>
                            <p className="text-4xl font-bold">{String(timeLeft.minutes).padStart(2, '0')}</p>
                            <p className="text-slate-400 text-sm">Minutes</p>
                        </div>
                        <div>
                            <p className="text-4xl font-bold">{String(timeLeft.seconds).padStart(2, '0')}</p>
                            <p className="text-slate-400 text-sm">Seconds</p>
                        </div>
                    </div>
                )}
            </div>

            <FaqSection faqs={EXAM_COUNTDOWN_FAQ} />
            <section className="mt-12 pt-8 border-t border-slate-200">
                <h2 className="text-lg font-semibold text-slate-900 mb-3">Related tools</h2>
                <ul className="flex flex-wrap gap-3">
                    {['/tools/planner', '/tools/cgpa', '/tools/attendance', '/tools/internal-marks'].map((path) => (
                        <li key={path}>
                            <Link to={path} className="text-blue-600 hover:underline font-medium">
                                {path === '/tools/planner' ? 'Study Planner' : path === '/tools/cgpa' ? 'CGPA Calculator' : path === '/tools/attendance' ? 'Attendance Calculator' : 'Internal Marks Calculator'}
                            </Link>
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );
}
