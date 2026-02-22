import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Welcome from './components/Welcome';
import { ToastProvider } from './components/ui/Toast';

const CGPACalculator = lazy(() => import('./pages/CGPACalculator'));
const AttendanceCalculator = lazy(() => import('./pages/AttendanceCalculator'));
const StudyPlanner = lazy(() => import('./pages/StudyPlanner'));
const NotesMaker = lazy(() => import('./pages/NotesMaker'));
const PDFTools = lazy(() => import('./pages/PDFTools'));
const MergePDF = lazy(() => import('./pages/pdf/MergePDF'));
const DeletePDF = lazy(() => import('./pages/pdf/DeletePDF'));
const ReorderPDF = lazy(() => import('./pages/pdf/ReorderPDF'));
const ExtractPDF = lazy(() => import('./pages/pdf/ExtractPDF'));
const RotatePDF = lazy(() => import('./pages/pdf/RotatePDF'));
const InternalMarksCalculator = lazy(() => import('./pages/InternalMarksCalculator'));
const ExamCountdown = lazy(() => import('./pages/ExamCountdown'));
const About = lazy(() => import('./pages/About'));
const Privacy = lazy(() => import('./pages/Privacy'));
const Contact = lazy(() => import('./pages/Contact'));
const Admin = lazy(() => import('./pages/Admin'));

function PageFallback() {
    return (
        <div className="flex items-center justify-center min-h-[200px]">
            <p className="text-slate-500">Loading...</p>
        </div>
    );
}

function App() {
    return (
        <ToastProvider>
        <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Welcome />} />
                    <Route path="tools/cgpa" element={<Suspense fallback={<PageFallback />}><CGPACalculator /></Suspense>} />
                    <Route path="tools/attendance" element={<Suspense fallback={<PageFallback />}><AttendanceCalculator /></Suspense>} />
                    <Route path="tools/internal-marks" element={<Suspense fallback={<PageFallback />}><InternalMarksCalculator /></Suspense>} />
                    <Route path="tools/planner" element={<Suspense fallback={<PageFallback />}><StudyPlanner /></Suspense>} />
                    <Route path="tools/exam-countdown" element={<Suspense fallback={<PageFallback />}><ExamCountdown /></Suspense>} />
                    <Route path="tools/notes" element={<Suspense fallback={<PageFallback />}><NotesMaker /></Suspense>} />
                                        <Route path="tools/pdf" element={<Suspense fallback={<PageFallback />}><PDFTools /></Suspense>} />
                    <Route path="tools/pdf/merge" element={<Suspense fallback={<PageFallback />}><MergePDF /></Suspense>} />
                    <Route path="tools/pdf/delete" element={<Suspense fallback={<PageFallback />}><DeletePDF /></Suspense>} />
                    <Route path="tools/pdf/reorder" element={<Suspense fallback={<PageFallback />}><ReorderPDF /></Suspense>} />
                    <Route path="tools/pdf/extract" element={<Suspense fallback={<PageFallback />}><ExtractPDF /></Suspense>} />
                    <Route path="tools/pdf/rotate" element={<Suspense fallback={<PageFallback />}><RotatePDF /></Suspense>} />
                    <Route path="about" element={<Suspense fallback={<PageFallback />}><About /></Suspense>} />
                    <Route path="privacy" element={<Suspense fallback={<PageFallback />}><Privacy /></Suspense>} />
                    <Route path="contact" element={<Suspense fallback={<PageFallback />}><Contact /></Suspense>} />
                    <Route path="admin" element={<Suspense fallback={<PageFallback />}><Admin /></Suspense>} />
                </Route>
            </Routes>
        </Router>
        </ToastProvider>
    );
}

export default App;
