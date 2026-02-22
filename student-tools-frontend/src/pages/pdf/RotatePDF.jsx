import { useState, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import FileUploader from '../../components/pdf/FileUploader';
import PageThumbnail from '../../components/pdf/PageThumbnail';
import ActionButtons from '../../components/pdf/ActionButtons';
import { rotatePages, getPageCount, formatFileSize } from '../../utils/pdfUtils';
import SeoHead from '../../components/SeoHead';
import FaqSection from '../../components/FaqSection';

const ROTATE_FAQ = [
    { q: 'How does Rotate Pages work?', a: 'Upload a PDF and click the rotate buttons on each page. You can rotate 90, 180, or 270 degrees. Download when done.' },
];

export default function RotatePDF() {
    const [file, setFile] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    const [rotations, setRotations] = useState({});
    const [processing, setProcessing] = useState(false);
    const [error, setError] = useState(null);

    const handleDrop = useCallback((acceptedFiles) => {
        const f = acceptedFiles[0];
        if (!f) return;
        setFile(f);
        setRotations({});
        setError(null);
    }, []);

    useEffect(() => {
        if (file) {
            file.arrayBuffer().then((buf) => getPageCount(buf).then(setPageCount)).catch(() => setPageCount(0));
        } else {
            setPageCount(0);
        }
    }, [file]);

    const addRotation = (pageIdx, degrees) => {
        setRotations((prev) => {
            const curr = (prev[pageIdx] || 0) + degrees;
            const norm = ((curr % 360) + 360) % 360;
            if (norm === 0) {
                const next = { ...prev };
                delete next[pageIdx];
                return next;
            }
            return { ...prev, [pageIdx]: norm };
        });
    };

    const getDisplayRotation = (pageIdx) => rotations[pageIdx] || 0;

    const handleDownload = async () => {
        if (!file) return;
        setProcessing(true);
        setError(null);
        try {
            const buf = await file.arrayBuffer();
            if (Object.keys(rotations).length === 0) {
                setError('No rotations applied. Rotate at least one page.');
                setProcessing(false);
                return;
            }
            const blob = await rotatePages(buf, rotations);
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = file.name.replace(/\.pdf$/i, '_rotated.pdf');
            a.click();
            URL.revokeObjectURL(url);
        } catch (err) {
            setError(err?.message || 'Failed to rotate PDF.');
        } finally {
            setProcessing(false);
        }
    };

    const handleReset = () => {
        setFile(null);
        setPageCount(0);
        setRotations({});
        setError(null);
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <SeoHead title="Rotate PDF Pages Online – Free & No Signup" description="Rotate PDF pages 90, 180, or 270 degrees. Free, browser-based." />
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Rotate PDF Pages</h1>
            <p className="text-slate-600 mb-8">Upload a PDF and rotate pages 90, 180, or 270 degrees. Preview before download.</p>

            {!file && <FileUploader onDrop={handleDrop} multiple={false} />}

            {file && (
                <>
                    <p className="text-sm text-slate-600 mb-4">{file.name} · {formatFileSize(file.size)} · {pageCount} pages</p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-6">
                        {Array.from({ length: pageCount }, (_, i) => (
                            <div key={i} className="flex flex-col items-center">
                                <PageThumbnail file={file} pageNumber={i + 1} rotation={getDisplayRotation(i)} />
                                <div className="flex gap-1 mt-2">
                                    <button type="button" onClick={() => addRotation(i, 90)} className="rounded border border-slate-300 px-2 py-1 text-xs font-medium text-slate-700 hover:bg-slate-100">90°</button>
                                    <button type="button" onClick={() => addRotation(i, 180)} className="rounded border border-slate-300 px-2 py-1 text-xs font-medium text-slate-700 hover:bg-slate-100">180°</button>
                                    <button type="button" onClick={() => addRotation(i, 270)} className="rounded border border-slate-300 px-2 py-1 text-xs font-medium text-slate-700 hover:bg-slate-100">270°</button>
                                </div>
                            </div>
                        ))}
                    </div>
                    {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
                    <ActionButtons onReset={handleReset} onDownload={handleDownload} downloadDisabled={processing || Object.keys(rotations).length === 0} downloadLabel={processing ? 'Processing...' : 'Download PDF'} />
                </>
            )}

            <FaqSection faqs={ROTATE_FAQ} />
            <section className="mt-12 pt-8 border-t border-slate-200">
                <h2 className="text-lg font-semibold text-slate-900 mb-3">More PDF tools</h2>
                <ul className="flex flex-wrap gap-3">
                    {['/tools/pdf/merge', '/tools/pdf/delete', '/tools/pdf/reorder', '/tools/pdf/extract'].map((path) => (
                        <li key={path}><Link to={path} className="text-blue-600 hover:underline font-medium">{path.split('/').pop()}</Link></li>
                    ))}
                </ul>
            </section>
        </div>
    );
}
