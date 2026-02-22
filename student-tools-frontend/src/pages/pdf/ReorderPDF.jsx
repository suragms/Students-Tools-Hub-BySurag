import { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { arrayMove, SortableContext, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import FileUploader from '../../components/pdf/FileUploader';
import PageThumbnail from '../../components/pdf/PageThumbnail';
import ActionButtons from '../../components/pdf/ActionButtons';
import { reorderPages, getPageCount, formatFileSize } from '../../utils/pdfUtils';
import SeoHead from '../../components/SeoHead';
import FaqSection from '../../components/FaqSection';

const REORDER_FAQ = [
    { q: 'How does Reorder Pages work?', a: 'Upload a PDF and drag the page thumbnails to reorder. Download the new PDF with pages in your chosen order.' },
];

function SortablePage({ id, file, pageNumber }) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
    const style = { transform: CSS.Transform.toString(transform), transition };
    return (
        <div ref={setNodeRef} style={style} className="flex flex-col items-center">
            <div className="cursor-grab touch-none p-1 text-slate-400 hover:text-slate-600" {...attributes} {...listeners}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" /></svg>
            </div>
            <PageThumbnail file={file} pageNumber={pageNumber} />
        </div>
    );
}

export default function ReorderPDF() {
    const [file, setFile] = useState(null);
    const [order, setOrder] = useState([]);
    const [processing, setProcessing] = useState(false);
    const [error, setError] = useState(null);

    const handleDrop = useCallback((acceptedFiles) => {
        const f = acceptedFiles[0];
        if (!f) return;
        setFile(f);
        setError(null);
        f.arrayBuffer().then((buf) => getPageCount(buf)).then((count) => {
            setOrder([...Array(count).keys()]);
        }).catch(() => setOrder([]));
    }, []);

    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (over && active.id !== over.id) {
            setOrder((prev) => {
                const oldIdx = prev.indexOf(active.id);
                const newIdx = prev.indexOf(over.id);
                if (oldIdx === -1 || newIdx === -1) return prev;
                return arrayMove(prev, oldIdx, newIdx);
            });
        }
    };

    const handleDownload = async () => {
        if (!file || order.length === 0) return;
        setProcessing(true);
        setError(null);
        try {
            const buf = await file.arrayBuffer();
            const blob = await reorderPages(buf, order);
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = file.name.replace(/\.pdf$/i, '_reordered.pdf');
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
        setOrder([]);
        setError(null);
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <SeoHead title="Reorder PDF Pages Online – Free & No Signup" description="Drag and drop to reorder PDF pages. Free, browser-based." />
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Reorder PDF Pages</h1>
            <p className="text-slate-600 mb-8">Upload a PDF and drag the pages to reorder. Download with your new order.</p>

            {!file && <FileUploader onDrop={handleDrop} multiple={false} />}

            {file && (
                <>
                    <p className="text-sm text-slate-600 mb-4">{file.name} · {formatFileSize(file.size)} · {order.length} pages</p>
                    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                        <SortableContext items={order}>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-6">
                                {order.map((pageIdx, i) => (
                                    <SortablePage key={pageIdx} id={pageIdx} file={file} pageNumber={pageIdx + 1} />
                                ))}
                            </div>
                        </SortableContext>
                    </DndContext>
                    {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
                    <ActionButtons onReset={handleReset} onDownload={handleDownload} downloadDisabled={processing} downloadLabel={processing ? 'Processing...' : 'Download PDF'} />
                </>
            )}

            <FaqSection faqs={REORDER_FAQ} />
            <section className="mt-12 pt-8 border-t border-slate-200">
                <h2 className="text-lg font-semibold text-slate-900 mb-3">More PDF tools</h2>
                <ul className="flex flex-wrap gap-3">
                    {['/tools/pdf/merge', '/tools/pdf/delete', '/tools/pdf/extract', '/tools/pdf/rotate'].map((path) => (
                        <li key={path}><Link to={path} className="text-blue-600 hover:underline font-medium">{path.split('/').pop()}</Link></li>
                    ))}
                </ul>
            </section>
        </div>
    );
}
