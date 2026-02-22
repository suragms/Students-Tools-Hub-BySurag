import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GRADING_SCALE, SCALE_PRESETS, calculateSGPA, calculateCumulativeCGPA, percentageFromCGPA } from '../utils/gradeUtils';
import SeoHead from '../components/SeoHead';
import FaqSection from '../components/FaqSection';

const CGPA_FAQ = [
    { q: 'How is CGPA calculated?', a: 'CGPA is the weighted average of grade points: (sum of grade × credits for each subject) / total credits. SGPA is for one semester; CGPA combines current SGPA with previous semesters using credit-weighted average.' },
    { q: 'What is the passing percentage?', a: 'Many universities consider 40% or 35% as passing. Percentage from CGPA is often computed as CGPA × 9.5 for 10-point scale. Check your university rules.' },
    { q: 'What grade scale does this use?', a: 'We support 10-point (O, A+, A, B+, …) and 4-point (A, B, C, D, F). Choose your university pattern from the dropdown. Percentage conversion uses 9.5× for 10-point and 25× for 4-point.' },
];

const CGPACalculator = () => {
    const [subjects, setSubjects] = useState([
        { id: 1, name: '', credits: '', grade: 'O' },
        { id: 2, name: '', credits: '', grade: 'O' },
        { id: 3, name: '', credits: '', grade: 'O' },
        { id: 4, name: '', credits: '', grade: 'O' },
    ]);

    const [prevCGPA, setPrevCGPA] = useState('');
    const [prevCredits, setPrevCredits] = useState('');
    const [scaleKey, setScaleKey] = useState('10point');

    const [results, setResults] = useState({
        sgpa: 0,
        cgpa: 0,
        percentage: 0,
        totalCredits: 0
    });

    const addSubject = () => {
        const defaultGrade = Object.keys(currentScale)[0] || 'O';
        setSubjects([...subjects, { id: Date.now(), name: '', credits: '', grade: defaultGrade }]);
    };

    const removeSubject = (id) => {
        if (subjects.length > 1) {
            setSubjects(subjects.filter((sub) => sub.id !== id));
        }
    };

    const handleSubjectChange = (id, field, value) => {
        setSubjects(subjects.map(sub =>
            sub.id === id ? { ...sub, [field]: value } : sub
        ));
    };

    const preset = SCALE_PRESETS[scaleKey] || SCALE_PRESETS['10point'];
    const currentScale = preset.scale;

    useEffect(() => {
        const scale = (SCALE_PRESETS[scaleKey] || SCALE_PRESETS['10point']).scale;
        setSubjects((prev) =>
            prev.map((s) => ({
                ...s,
                grade: scale[s.grade] !== undefined ? s.grade : Object.keys(scale)[0],
            }))
        );
    }, [scaleKey]);

    useEffect(() => {
        calculateResults();
    }, [subjects, prevCGPA, prevCredits, scaleKey]);

    const calculateResults = () => {
        const validSubjects = subjects.filter(s => s.credits && s.grade);
        const calculatedSGPA = calculateSGPA(validSubjects, currentScale);
        const validCredits = validSubjects.reduce((sum, s) => sum + (parseFloat(s.credits) || 0), 0);
        let finalCGPA = calculatedSGPA;
        if (prevCGPA && prevCredits) {
            finalCGPA = calculateCumulativeCGPA(calculatedSGPA, validCredits, prevCGPA, prevCredits);
        }
        const percentage = percentageFromCGPA(finalCGPA, preset.percentFactor);
        setResults({
            sgpa: calculatedSGPA,
            cgpa: finalCGPA,
            percentage: percentage,
            totalCredits: validCredits
        });
    };

    const defaultGrade = Object.keys(currentScale)[0] || 'O';
    const resetCalculator = () => {
        setSubjects([
            { id: 1, name: '', credits: '', grade: defaultGrade },
            { id: 2, name: '', credits: '', grade: defaultGrade },
            { id: 3, name: '', credits: '', grade: defaultGrade },
            { id: 4, name: '', credits: '', grade: defaultGrade },
        ]);
        setPrevCGPA('');
        setPrevCredits('');
        setResults({ sgpa: 0, cgpa: 0, percentage: 0, totalCredits: 0 });
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <SeoHead
                title="CGPA Calculator for BCA, BSc, BCom & MCA Students (2026 Updated)"
                description="Free CGPA calculator: semester SGPA, credit-based calculation, percentage conversion. For BCA, BSc, BCom, BTech, MCA. 10-point and 4-point scales."
            />
            <h1 className="text-3xl font-bold text-slate-900 mb-2">CGPA Calculator</h1>
            <p className="text-slate-600 mb-6">
                For BCA, BSc, BCom, BTech, MCA, and university students: calculate semester SGPA and overall CGPA with credit-based grades. Choose your university grade scale below.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Calculator Input Section */}
                <div className="lg:col-span-2 space-y-6">

                    <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100">
                        <div className="px-6 py-4 bg-blue-50 border-b border-blue-100 flex flex-wrap justify-between items-center gap-2">
                            <h3 className="text-lg font-semibold text-blue-800">Current Semester Subjects</h3>
                            <select
                                value={scaleKey}
                                onChange={(e) => setScaleKey(e.target.value)}
                                className="rounded-lg border border-blue-200 px-3 py-1.5 text-sm text-blue-800 bg-white"
                            >
                                {Object.entries(SCALE_PRESETS).map(([key, p]) => (
                                    <option key={key} value={key}>{p.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="p-6 space-y-4">
                            {subjects.map((subject, index) => (
                                <div key={subject.id} className="flex flex-col sm:flex-row gap-3 items-end sm:items-center animate-fadeIn">
                                    <div className="flex-grow w-full sm:w-auto">
                                        <label className="block text-xs font-medium text-gray-500 mb-1 sm:hidden">Subject Name (Optional)</label>
                                        <input
                                            type="text"
                                            placeholder={`Subject ${index + 1}`}
                                            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-all p-2.5 bg-gray-50 focus:bg-white"
                                            value={subject.name}
                                            onChange={(e) => handleSubjectChange(subject.id, 'name', e.target.value)}
                                        />
                                    </div>

                                    <div className="w-full sm:w-24">
                                        <label className="block text-xs font-medium text-gray-500 mb-1 sm:hidden">Credits</label>
                                        <input
                                            type="number"
                                            placeholder="Credits"
                                            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-all p-2.5 bg-gray-50 focus:bg-white text-center"
                                            value={subject.credits}
                                            onChange={(e) => handleSubjectChange(subject.id, 'credits', e.target.value)}
                                            min="1"
                                        />
                                    </div>

                                    <div className="w-full sm:w-32">
                                        <label className="block text-xs font-medium text-gray-500 mb-1 sm:hidden">Grade</label>
                                        <select
                                            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-all p-2.5 bg-gray-50 focus:bg-white"
                                            value={currentScale[subject.grade] !== undefined ? subject.grade : defaultGrade}
                                            onChange={(e) => handleSubjectChange(subject.id, 'grade', e.target.value)}
                                        >
                                            {Object.keys(currentScale).map(grade => (
                                                <option key={grade} value={grade}>{grade}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <button
                                        onClick={() => removeSubject(subject.id)}
                                        className="text-red-400 hover:text-red-600 transition p-2 w-full sm:w-auto flex justify-center"
                                        title="Remove Subject"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                </div>
                            ))}

                            <button
                                onClick={addSubject}
                                className="mt-2 w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-white border-2 border-dashed border-blue-300 rounded-lg text-blue-600 hover:bg-blue-50 hover:border-blue-500 transition-all font-medium"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                                </svg>
                                Add Subject
                            </button>
                        </div>
                    </div>

                    <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100">
                        <div className="px-6 py-4 bg-purple-50 border-b border-purple-100">
                            <h3 className="text-lg font-semibold text-purple-800">Previous Semesters (Optional)</h3>
                        </div>
                        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Previous CGPA</label>
                                <input
                                    type="number"
                                    placeholder="e.g. 8.5"
                                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 p-2.5"
                                    value={prevCGPA}
                                    onChange={(e) => setPrevCGPA(e.target.value)}
                                    step="0.01"
                                    min="0"
                                    max="10"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Total Previous Credits</label>
                                <input
                                    type="number"
                                    placeholder="e.g. 80"
                                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 p-2.5"
                                    value={prevCredits}
                                    onChange={(e) => setPrevCredits(e.target.value)}
                                    min="0"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <button
                            onClick={resetCalculator}
                            className="text-gray-500 hover:text-red-500 font-medium text-sm flex items-center gap-1 transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                            Reset Calculator
                        </button>
                    </div>
                </div>

                {/* Results Section */}
                <div className="lg:col-span-1">
                    <div className="bg-white shadow-2xl rounded-2xl overflow-hidden sticky top-24 border border-gray-100">
                        <div className="px-6 py-6 bg-gradient-to-br from-blue-600 to-blue-800 text-white text-center">
                            <h2 className="text-2xl font-bold">Your Results</h2>
                            <p className="text-blue-100 opacity-80 text-sm mt-1">Real-time Grade Analysis</p>
                        </div>

                        <div className="p-6 space-y-6">
                            <div className="text-center p-4 bg-blue-50 rounded-xl border border-blue-100">
                                <span className="block text-gray-500 text-sm uppercase tracking-wider font-semibold mb-1">SGPA (Current Sem)</span>
                                <span className="text-5xl font-black text-blue-600 tracking-tighter">{results.sgpa}</span>
                                <span className="block text-xs text-blue-400 mt-1 font-medium">Credits: {results.totalCredits}</span>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="text-center p-4 bg-purple-50 rounded-xl border border-purple-100">
                                    <span className="block text-gray-500 text-xs uppercase tracking-wider font-semibold mb-1">Overall CGPA</span>
                                    <span className="text-3xl font-bold text-purple-600">{results.cgpa}</span>
                                </div>

                                <div className="text-center p-4 bg-green-50 rounded-xl border border-green-100">
                                    <span className="block text-gray-500 text-xs uppercase tracking-wider font-semibold mb-1">Percentage</span>
                                    <span className="text-3xl font-bold text-green-600">{results.percentage}%</span>
                                </div>
                            </div>

                            <div className="bg-gray-50 p-4 rounded-lg text-xs text-gray-500 border border-gray-200">
                                <p className="mb-1"><strong>Formula Used:</strong></p>
                                <p>• Percentage = CGPA × {preset.percentFactor}</p>
                                <p>• Scale: {preset.name}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <FaqSection faqs={CGPA_FAQ} />
            <section className="mt-12 pt-8 border-t border-slate-200">
                <h2 className="text-lg font-semibold text-slate-900 mb-3">Related tools</h2>
                <ul className="flex flex-wrap gap-3">
                    {[
                        { path: '/tools/attendance', label: 'Attendance Calculator' },
                        { path: '/tools/internal-marks', label: 'Internal Marks Calculator' },
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

export default CGPACalculator;
