import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { calculateAttendancePercentage, calculateBunkOrAttend, calculateInternals } from '../utils/attendanceUtils';
import SeoHead from '../components/SeoHead';
import FaqSection from '../components/FaqSection';

const ATTENDANCE_FAQ = [
    { q: 'How many classes can I bunk to stay at 75%?', a: 'Enter your total classes and attended classes, and set target to 75%. The calculator tells you how many more you must attend or how many you can safely miss.' },
    { q: 'Why 75% attendance?', a: 'Many universities require 75% attendance to appear for exams. Check your college rules; some use 70% or 80%. You can set any target percentage in the calculator.' },
    { q: 'What are internal marks?', a: 'Internal assessment usually includes tests, assignments, seminars, and attendance. Use our Internal Marks Calculator for weighted university formats.' },
];

const AttendanceCalculator = () => {
    // Attendance State
    const [totalClasses, setTotalClasses] = useState('');
    const [attendedClasses, setAttendedClasses] = useState('');
    const [targetPercentage, setTargetPercentage] = useState(75);
    const [attendanceResult, setAttendanceResult] = useState(null);

    // Internals State
    const [tests, setTests] = useState([{ id: 1, obtained: '', max: 20 }]);
    const [assignments, setAssignments] = useState([{ id: 1, obtained: '', max: 10 }]);
    const [seminars, setSeminars] = useState([{ id: 1, obtained: '', max: 10 }]);
    const [attendanceMarks, setAttendanceMarks] = useState(0);
    const [internalsResult, setInternalsResult] = useState({ testAvg: 0, assignments: 0, seminars: 0, attendance: 0, total: 0 });

    // --- Attendance Logic ---
    useEffect(() => {
        if (totalClasses && attendedClasses) {
            const current = calculateAttendancePercentage(totalClasses, attendedClasses);
            const prediction = calculateBunkOrAttend(totalClasses, attendedClasses, targetPercentage);
            setAttendanceResult({ current, ...prediction });

            // Auto-calc attendance marks (Simple logic: >90% = 5, >85% = 4, >80% = 3, >75% = 2)
            // This is a common pattern, can be edited by user
            let bonus = 0;
            if (current >= 95) bonus = 5;
            else if (current >= 90) bonus = 4;
            else if (current >= 85) bonus = 3;
            else if (current >= 80) bonus = 2;
            else if (current >= 75) bonus = 1;
            setAttendanceMarks(bonus);
        } else {
            setAttendanceResult(null);
            setAttendanceMarks(0);
        }
    }, [totalClasses, attendedClasses, targetPercentage]);

    // --- Internals Logic ---
    useEffect(() => {
        const res = calculateInternals(tests, assignments, seminars, attendanceMarks);
        setInternalsResult(res);
    }, [tests, assignments, seminars, attendanceMarks]);

    const addField = (setter, list) => {
        setter([...list, { id: Date.now(), obtained: '', max: list[0]?.max || 10 }]);
    };

    const removeField = (setter, list, id) => {
        if (list.length > 1) setter(list.filter(item => item.id !== id));
    };

    const updateField = (setter, list, id, field, value) => {
        setter(list.map(item => item.id === id ? { ...item, [field]: value } : item));
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <SeoHead
                title="Attendance Calculator for Degree & PG Students (2026)"
                description="Free attendance calculator: current %, classes to reach 75%, how many you can bunk. For BCA, BSc, BCom, MCA. Internal marks calculator included."
            />
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Attendance Calculator</h1>
            <p className="text-slate-600 mb-6">
                For BCA, BSc, BCom, BTech, MCA, and university students: track attendance and see how many classes you need to reach 75% (or your target). Internal marks section included; for weighted formats use our <Link to="/tools/internal-marks" className="text-blue-600 hover:underline font-medium">Internal Marks Calculator</Link>.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* --- Left Column: Attendance Calculator --- */}
                <div className="space-y-6">
                    <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100">
                        <div className="px-6 py-4 bg-blue-50 border-b border-blue-100">
                            <h2 className="text-xl font-bold text-blue-800 flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Attendance Tracker
                            </h2>
                        </div>

                        <div className="p-6 space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Total Classes</label>
                                    <input
                                        type="number"
                                        className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3 bg-gray-50"
                                        placeholder="e.g. 50"
                                        value={totalClasses}
                                        onChange={(e) => setTotalClasses(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Attended</label>
                                    <input
                                        type="number"
                                        className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3 bg-gray-50"
                                        placeholder="e.g. 40"
                                        value={attendedClasses}
                                        onChange={(e) => setAttendedClasses(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Target Percentage (%)</label>
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                                    value={targetPercentage}
                                    onChange={(e) => setTargetPercentage(e.target.value)}
                                />
                                <div className="flex justify-between text-xs text-gray-500 mt-1">
                                    <span>0%</span>
                                    <span className="font-bold text-blue-600">{targetPercentage}%</span>
                                    <span>100%</span>
                                </div>
                            </div>

                            {attendanceResult && (
                                <div className={`rounded-xl p-6 text-center text-white transition-all transform animate-fadeIn ${attendanceResult.status === 'SAFE' ? 'bg-gradient-to-br from-green-500 to-green-600' : 'bg-gradient-to-br from-red-500 to-red-600'}`}>
                                    <h3 className="text-4xl font-extrabold mb-1">{attendanceResult.current}%</h3>
                                    <p className="text-sm opacity-90 font-medium uppercase tracking-wide mb-4">Current Attendance</p>

                                    <div className="bg-white/20 rounded-lg p-3 backdrop-blur-sm">
                                        <p className="text-lg font-semibold">{attendanceResult.message}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* --- Right Column: Internals Calculator --- */}
                <div className="space-y-6">
                    <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100">
                        <div className="px-6 py-4 bg-purple-50 border-b border-purple-100">
                            <h2 className="text-xl font-bold text-purple-800 flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                Internals Calculator
                            </h2>
                        </div>

                        <div className="p-6 space-y-6 max-h-[600px] overflow-y-auto custom-scrollbar">

                            {/* Tests Section */}
                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <label className="text-sm font-semibold text-gray-700">Internal Tests</label>
                                    <button onClick={() => addField(setTests, tests)} className="text-xs text-purple-600 font-medium hover:underline">+ Add Test</button>
                                </div>
                                {tests.map((test, index) => (
                                    <div key={test.id} className="flex gap-2">
                                        <input
                                            type="number"
                                            placeholder={`Test ${index + 1}`}
                                            className="w-full rounded-md border-gray-300 shadow-sm text-sm p-2"
                                            value={test.obtained}
                                            onChange={(e) => updateField(setTests, tests, test.id, 'obtained', e.target.value)}
                                        />
                                        <button onClick={() => removeField(setTests, tests, test.id)} className="text-red-400 hover:text-red-600">×</button>
                                    </div>
                                ))}
                            </div>

                            {/* Assignments Section */}
                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <label className="text-sm font-semibold text-gray-700">Assignments</label>
                                    <button onClick={() => addField(setAssignments, assignments)} className="text-xs text-purple-600 font-medium hover:underline">+ Add Assignment</button>
                                </div>
                                {assignments.map((asm, index) => (
                                    <div key={asm.id} className="flex gap-2">
                                        <input
                                            type="number"
                                            placeholder={`Assignment ${index + 1}`}
                                            className="w-full rounded-md border-gray-300 shadow-sm text-sm p-2"
                                            value={asm.obtained}
                                            onChange={(e) => updateField(setAssignments, assignments, asm.id, 'obtained', e.target.value)}
                                        />
                                        <button onClick={() => removeField(setAssignments, assignments, asm.id)} className="text-red-400 hover:text-red-600">×</button>
                                    </div>
                                ))}
                            </div>

                            {/* Seminars Section */}
                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <label className="text-sm font-semibold text-gray-700">Seminars</label>
                                    <button onClick={() => addField(setSeminars, seminars)} className="text-xs text-purple-600 font-medium hover:underline">+ Add Seminar</button>
                                </div>
                                {seminars.map((sem, index) => (
                                    <div key={sem.id} className="flex gap-2">
                                        <input
                                            type="number"
                                            placeholder={`Seminar ${index + 1}`}
                                            className="w-full rounded-md border-gray-300 shadow-sm text-sm p-2"
                                            value={sem.obtained}
                                            onChange={(e) => updateField(setSeminars, seminars, sem.id, 'obtained', e.target.value)}
                                        />
                                        <button onClick={() => removeField(setSeminars, seminars, sem.id)} className="text-red-400 hover:text-red-600">×</button>
                                    </div>
                                ))}
                            </div>

                            {/* Attendance Marks */}
                            <div>
                                <div className="flex justify-between items-center mb-1">
                                    <label className="text-sm font-semibold text-gray-700">Attendance Bonus</label>
                                    <span className="text-xs text-gray-500">(Auto-calculated: {attendanceResult ? `${attendanceResult.current}%` : '0%'})</span>
                                </div>
                                <input
                                    type="number"
                                    className="w-full rounded-md border-gray-300 shadow-sm text-sm p-2"
                                    value={attendanceMarks}
                                    onChange={(e) => setAttendanceMarks(e.target.value)}
                                />
                            </div>

                            {/* Internals Result */}
                            <div className="pt-4 border-t border-gray-100">
                                <div className="flex justify-between items-center">
                                    <span className="font-bold text-gray-700">Total Internals</span>
                                    <span className="text-2xl font-black text-purple-700">{internalsResult.total}</span>
                                </div>
                                <p className="text-xs text-gray-400 mt-1 text-right">Test Avg + Assign + Sem + Attd</p>
                            </div>

                        </div>
                    </div>
                </div>

            </div>

            <FaqSection faqs={ATTENDANCE_FAQ} />
            <section className="mt-12 pt-8 border-t border-slate-200">
                <h2 className="text-lg font-semibold text-slate-900 mb-3">Related tools</h2>
                <ul className="flex flex-wrap gap-3">
                    {[
                        { path: '/tools/internal-marks', label: 'Internal Marks Calculator' },
                        { path: '/tools/cgpa', label: 'CGPA Calculator' },
                        { path: '/tools/planner', label: 'Study Planner' },
                        { path: '/tools/exam-countdown', label: 'Exam Countdown' },
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
};

export default AttendanceCalculator;
