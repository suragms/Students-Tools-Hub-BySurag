import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import FileUploader from '../../components/pdf/FileUploader';
import PageThumbnail from '../../components/pdf/PageThumbnail';
import ActionButtons from '../../components/pdf/ActionButtons';
import { deletePages, getPageCount, formatFileSize } from '../../utils/pdfUtils';
import SeoHead from '../../components/SeoHead';
import FaqSection from '../../components/FaqSection';

const DELETE_FAQ = [
    { q: 'How does Delete Pages work?', a: 'Upload a PDF, select the pages you want to remove, then download. The new PDF will have only the pages you kept.' },
];

export default function DeletePDF() {
    const [file, setFile] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    const [toDelete, setToDelete] = useState(new Set());
    const [processing, setProcessing] = useState(false);
    const [error, setError] = useState(null);

    const handleDrop = useCallback((acceptedFiles) => {
        const f = acceptedFiles[0];
        if (!f) return;
        setFile(f);
        setToDelete(new Set());
        setError(null);
    }, []);

    useEffect(() => {
        if (file) {
            file.arrayBuffer().then((buf) => getPageCount(buf).then(setPageCount)).catch(() => setPageCount(0));
        } else {
            setPageCount(0);
        }
    }, [file]);

    const togglePage = (i, selected) => {
        setToDelete((prev) => {
            const next = new Set(prev);
            if (selected) next.add(i);
            else next.delete(i);
            return next;
        });
    };

    const selectAll = () => setToDelete(new Set([...Array(pageCount).keys()]));
    const deselectAll = () => setToDelete(new Set());

    const handleDownload = async () => {
        if (!file || toDelete.size === 0) return;
        setProcessing(true);
        setError(null);
        try {
            const buf = await file.arrayBuffer();
            const blob = await deletePages(buf, [...toDelete]);
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = file.name.replace(/\.pdf$/i, '_edited.pdf');
            a.click();
            URL.revokeObjectURL(url);
        } catch (err) {
            setError(err?.message || 'Failed to process PDF.');
        } finally {
            setProcessing(false);
        }
    };

    const handleReset = () => {
        setFile(null);
        setPageCount(0);
        setToDelete(new Set());
        setError(null);
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <SeoHead title="Delete PDF Pages Online – Free & No Signup" description="Remove specific pages from a PDF. Free, browser-based. No upload to server." />
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Delete PDF Pages</h1>
            <p className="text-slate-600 mb-8">Upload a PDF and select the pages you want to remove. Download the new file without those pages.</p>

            {!file && <FileUploader onDrop={handleDrop} multiple={false} />}

            {file && (
                <>
                    <div className="flex items-center justify-between mb-4">
                        <p className="text-sm text-slate-600">{file.name} · {formatFileSize(file.size)} · {pageCount} pages</p>
                        <div className="flex gap-2">
                            <button type="button" onClick={selectAll} className="text-sm text-blue-600 hover:underline">Select all to delete</button>
                            <button type="button" onClick={deselectAll} className="text-sm text-blue-600 hover:underline">Deselect all</button>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-6">
                        {Array.from({ length: pageCount }, (_, i) => (
                            <PageThumbnail key={i} file={file} pageNumber={i + 1} selected={toDelete.has(i)} onSelect={(v) => togglePage(i, v)} selectable />
                        ))}
                    </div>
                    <p className="text-sm text-slate-600 mb-4">Selected {toDelete.size} page(s) will be deleted. Remaining pages will be kept.</p>
                    {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
                    <ActionButtons onReset={handleReset} onDownload={handleDownload} downloadDisabled={processing || toDelete.size === 0} downloadLabel={processing ? 'Processing...' : 'Download PDF'} />
                </>
            )}

            <FaqSection faqs={DELETE_FAQ} />
            <section className="mt-12 pt-8 border-t border-slate-200">
                <h2 className="text-lg font-semibold text-slate-900 mb-3">More PDF tools</h2>
                <ul className="flex flex-wrap gap-3">
                    {['/tools/pdf/merge', '/tools/pdf/reorder', '/tools/pdf/extract', '/tools/pdf/rotate'].map((path) => (
                        <li key={path}><Link to={path} className="text-blue-600 hover:underline font-medium">{path.split('/').pop()}</Link></li>
                    ))}
                </ul>
            </section>
        </div>
    );
}
